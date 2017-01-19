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
				<ul>
					<li>
						<Link to="/nav1">
		                  <span className="nav-text">nav 1</span>
		                </Link>
					</li>
					<li>
						<Link to="/nav2">
		                  <span className="nav-text">nav 2</span>
		                </Link>
					</li>
					<li>
						<Link to="/nav2">
		                  <span className="nav-text">nav 3</span>
		                </Link>
					</li>
					<li>
						<Link to="/LogoGather">
		                  <span className="nav-text">LogoGather</span>
		                </Link>
					</li>
					<li>
						<Link to="/CollectionsPage">
		                  <span className="nav-text">CollectionsPage</span>
		                </Link>
					</li>
				</ul>
				<div>{this.props.children}</div>
			</div>
		)
	}
}

Home.propTypes = {
	children: PropTypes.object.isRequired,
}