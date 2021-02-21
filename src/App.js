import { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import {Helmet} from "react-helmet";
import Posts from './Components/Posts/Posts';
import { BrowserRouter as Router, Switch,  Route } from "react-router-dom";
import PostDetails from './Components/Posts/PostDetails';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import CreatePost from './Components/Posts/CreatePost';
import UpdatePost from './Components/Posts/UpdatePost';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/Route/PrivateRoute';
export const loggedUserContext = createContext();

function App() { 
	const [currentUser, setCurrentUser] = useState('');   
	return (
		<loggedUserContext.Provider value={[currentUser, setCurrentUser]}>
			<Router>
				<Helmet> 
					<title>Journal</title>
				</Helmet>
				<Header></Header>
				<Switch>
					<Route path="/login"> 
						<Login></Login>
					</Route>

					<PrivateRoute path="/post/update/:id">
						<UpdatePost></UpdatePost>
					</PrivateRoute>

					<PrivateRoute path="/post/create">
						<CreatePost></CreatePost>
					</PrivateRoute>
					
					<Route path={`/post/:id`}> 
						<PostDetails></PostDetails>
					</Route>

					<Route path={`/users/:id`}> 
						<User></User>
					</Route>


					<Route path="/users"> 
						<Users></Users>
					</Route>

					<Route exect path="/"> 
						<Hero></Hero>
						<Posts></Posts>
					</Route>

					<Route path="*">
						<h3>404, Not found</h3>
					</Route>	
				</Switch>
			</Router>
		</loggedUserContext.Provider>
	);
}

export default App;
