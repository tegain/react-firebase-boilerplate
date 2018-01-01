const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Read the right .env file depending on the NODE_ENV
if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({ path: '.env.development' })
}

// Use '--env' param used in package.json script
module.exports = (env) => {
	const isProduction = env === 'production'
	// Set CSS output file name, which will go inside the 'output' folder defined below
	const CSSExtract = new ExtractTextPlugin('styles.css')

	return {
		// Add babel-polyfill before the actual app entry
		entry: ['babel-polyfill', './src/app.js'],
		output: {
			path: path.join(__dirname, 'public', 'dist'),
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.s?css$/,
					// use allows to provide array of loaders
					// Use CSSExtract plugin here
					use: CSSExtract.extract({
						use: [
							// Define loaders as array to pass options (sourceMap, here)
							{
								loader: 'css-loader',
								options: {
									sourceMap: true
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						]
					})
				}
			]
		},
		// Define plugins
		plugins: [
			CSSExtract,
			// Create new constants, availables into the app
			new webpack.DefinePlugin({
				'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
				'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
			})
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true, // prevents 'Cannot get /route' (redirects all 'cannot get...' to index.html when loading the page and fetching the server route)
			publicPath: '/dist/'
		}
	}
}