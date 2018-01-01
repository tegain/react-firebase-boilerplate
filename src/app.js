import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import { firebase } from './firebase/firebase'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

/**
 *  Provides the store to all the components
 *  Must be used in order to use connect() in hierarchy components
 */
const app = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

/**
 * Only render the app if it's not already rendered
 * @type {boolean}
 */
let hasRendered = false
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(app, document.getElementById('root'))
		hasRendered = true
	}
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'))

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid))
		renderApp()
		if (history.location.pathname === '/') {
			history.push('/dashboard')
		}
	} else {
		store.dispatch(logout())
		renderApp()
		history.push('/')
	}
})
