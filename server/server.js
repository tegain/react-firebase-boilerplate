/**
 * Use Express to create server
 * Define `app` as the returned value from calling `express()`
 */
const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000 // Heroku sets this port dynamically

/**
 * Configure server, add middlewares (something that runs for each request)
 */
app.use(express.static(publicPath))

/**
 * Equivalent to webpack dev-server `historyApiFallback` option:
 * Redirects all routes to index.html in order to avoir 'cannot GET <Route>' error
 */
app.get('*', (request, response) => {
	response.sendFile(path.join(publicPath, 'index.html'))
})

/**
 * When typing `node server/server.js`,
 * Start server on port defined above
 */
app.listen(port, () => {
	console.log('Server is up!')
})