import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
	type: 'LOGIN',
	uid
})

export const startLogin = () => {
	return () => {
		// When dispatched, this action displays the Google login popup
		return firebase.auth().signInWithPopup(googleAuthProvider)
	}
}

export const logout = () => ({
	type: 'LOGOUT'
})

export const startLogout = () => {
	return () => {
		return firebase.auth().signOut()
	}
}

