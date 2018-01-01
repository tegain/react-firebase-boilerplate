import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from "../actions/auth";

export const AppHeader = ({ startLogout }) => (
	<header className="header">
		<div className="header__container container">
			<h1 className="header__title">
				<Link to="/dashboard" className="header__link">
					React Firebase boilerplate
					<span>/dashboard</span>
				</Link>
			</h1>
			<button className="header__logout button button--transparent" onClick={startLogout}>Logout</button>
		</div>
	</header>
)

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})


export default connect(undefined, mapDispatchToProps)(AppHeader)