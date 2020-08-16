import React from 'react';
import {
    BrowserRouter, HashRouter, Switch, Route, Redirect
} from 'react-router-dom';
import Home from './home/components/home';
import Story from './story/components/story';
import Header from './header/components/header';
import BookMark from './bookmarks/components/bookmarks';

const Router = (props) => {
	return (
		<div>
			<Header {...props}/>
			<BrowserRouter>
				<HashRouter>
					<Switch>
						<Route exact path="/" component={Home} {...props}></Route>
						<Route path="/home" component={Home} {...props}></Route>
						<Route path="/feed/:feed/story/:id" component={Story}></Route>
						<Route path="/bookmarks" component={BookMark} {...props}></Route>
						<Redirect from="/*" to="/home" />
					</Switch>
				</HashRouter>
			</BrowserRouter>
		</div>
	);
}

export default Router;
