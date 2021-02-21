import React, { useContext } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {loggedUserContext} from './../../App';


const Header = () => {
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/">
                        <Navbar.Brand href="#home">JourNal</Navbar.Brand>
                    </Link>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/"> Home </Nav.Link>
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                    </Nav>
                    <Form inline>
                         
                        <Link to={currentUser ? `/users/${currentUser.id}` : `/login`}>
                            <Button 
                                variant="dark" 
                                className="ml-2">{currentUser ? currentUser.name : 'Login'}
                            </Button>
                        </Link>
                        <Link to="/post/create"><Button className="ml-2" variant="info">Add New Post</Button></Link>
                    </Form>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;