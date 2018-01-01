import React from 'react'
import { Router, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import DashboardPage from '../components/DashboardPage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

/**
 * Create history available from outside of the 'Routed' components
 * Thus, we need to change <BrowserRouter> into <Router>, which allows to pass an history
 *
 * @doc https://reacttraining.com/react-router/web/api/Router
 *
 * "The most common use-case for using the low-level <Router>
 *  is to synchronize a custom history with a state management lib like Redux or Mobx"
 */
export const history = createHistory()

const AppRouter = () => (
	/**
	 * <Switch> goes through all defined routes one at a time, and stops when finds a matching one.
	 * So, by not providing any 'path' prop, we can create a 404 route:
	 * Switch will display this component when no other route matches
	 */
	<Router history={history}>
		<div> {/* BrowserRouter Expects single child */}
			<Switch>
				<PublicRoute path="/" component={LoginPage} exact={true} /> {/* 'exact' required because the '/' matches all the routes... */}
				<PrivateRoute path="/dashboard" component={DashboardPage} />
				<PrivateRoute component={NotFoundPage} /> {/* path is optional */}
			</Switch>
		</div>
	</Router>
)

export default AppRouter
