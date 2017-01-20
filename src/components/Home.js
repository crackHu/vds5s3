import React, {
	PropTypes
} from 'react'
import {
	Link
} from 'react-router';
require("./Home.css")

export default class Home extends React.Component {

	render() {
		return (
			<div className="starter">
				<Link to="/nav1">入口1</Link>
				<div style={{height: '1em'}} />
				<Link to="/Main">入口2</Link>
				<div style={{height: '1em'}} />
				<Link to="/nav3">入口3</Link>
			</div>
		)
	}
}