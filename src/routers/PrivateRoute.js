import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import AppHeader from '../components/AppHeader'

/**
 * Wrapper component around <Route> to add conditional logic to the app routing
 *
 * When logged in, display private component
 * Otherwise, redirect to login page
 */
export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest // all the rest (remaining) props excluding isAuthenticated and component
}) => (
	<Route {...rest} component={(props) => (
		(isAuthenticated) ? (
			<div>
				<AppHeader />
				<Component {...props} />
			</div>
		) : (
			<Redirect to="/" />
		)
	)} />
)

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid // from configureStore.js
})

export default connect(mapStateToProps)(PrivateRoute)