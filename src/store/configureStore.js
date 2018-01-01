import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import authReducer from '../reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/**
 * A thunk is a function that wraps an expression to delay its evaluation.
 */
export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	)

	return store
}

