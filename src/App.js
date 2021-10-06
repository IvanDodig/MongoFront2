/** @format */

import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Comments from './Pages/Comments/Comments';
import Genres from './Pages/Genres/Genres';
import Movies from './Pages/Movies/Movies';
import Photos from './Pages/Photos/Photos';
import Reservations from './Pages/Reservations/Reservations';
import Users from './Pages/Users/Users';

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar bg='dark' variant='dark'>
					<Container>
						<Navbar.Brand>Movies store</Navbar.Brand>
						<Nav>
							<Link className='nav-link' to='/'>
								Filmovi
							</Link>
							<Link className='nav-link' to='/users'>
								Korisnici
							</Link>
							<Link className='nav-link' to='/reservations'>
								Rezervacije
							</Link>
							<Link className='nav-link' to='/comments'>
								Komentari
							</Link>
							<Link className='nav-link' to='/genres'>
								Žanrovi
							</Link>
							<Link className='nav-link' to='/photos'>
								Slike
							</Link>
						</Nav>
					</Container>
				</Navbar>
				<div className='content'>
					<Switch>
						<Route exact path='/'>
							<Movies />
						</Route>
						<Route exact path='/users'>
							<Users />
						</Route>
						<Route exact path='/reservations'>
							<Reservations />
						</Route>
						<Route exact path='/comments'>
							<Comments />
						</Route>
						<Route exact path='/genres'>
							<Genres />
						</Route>
						<Route exact path='/photos'>
							<Photos />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
