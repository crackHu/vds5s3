import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	useRouterHistory,
	browserHistory
} from 'react-router';
import {
	createHashHistory,
} from 'history';

const hashHistory = useRouterHistory(createHashHistory)({
	queryKey: false
})
const appHistory = process.env.NODE_ENV === 'production' ? useRouterHistory(createHashHistory)({
	queryKey: false
}) : browserHistory
const rootRoute = [{
	path: '/',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/Home').default)
		}, 'Home')
	}
}, {
	path: 'nav1',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/nav1').default)
		}, 'nav1')
	}
}, {
	path: 'nav2',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/nav2').default)
		}, 'nav2')
	}
}, {
	path: 'Main',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/Main').default)
		}, 'Main')
	}
}, {
	path: 'nav3',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/nav3').default)
		}, 'nav3')
	}
}]

ReactDOM.render(
	(
		<Router history={appHistory} routes={rootRoute} />
	),
	document.getElementById('root')
);