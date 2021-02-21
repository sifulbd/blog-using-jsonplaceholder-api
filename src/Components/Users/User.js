import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import { Row, Col, Card, Media, Spinner, Container , Button, Jumbotron, Alert, Toast} from 'react-bootstrap';
import {ucFirst} from '../Common/utils.js'
import person from "./../../images/person.png";
import {loggedUserContext} from './../../App';

const User = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const[posts, setPosts] = useState({});
    const history = useHistory();
    const[visiblePosts, setVisiblePosts] = useState(10);
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const userUrl = `https://jsonplaceholder.typicode.com/users`;
    useEffect(() => {
        fetch(userUrl)
        .then((response) => response.json())
        .then((data) => {setUsers(data)});
    }, [userUrl]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            const userData = data.filter(dt => dt.userId === parseInt(id));
            setPosts(userData)
        });
    }, [users, id]);
    
    const currentUserInfo = users.find(us => us.id === parseInt(id));

    const handleLoadMoreClick = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 4)
    }
    const handlePostDelete = (id) => {
        const confirmation = window.confirm(`Are you sure! You want to delete ${id}`);
        if(confirmation) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .then(() => {
                setDeleteSuccess(true);
                const newPosts = posts.filter(post => post.id !== id)
                setPosts(newPosts);
            })
            .catch((err) => console.log(err));
            setTimeout(function(){ 
                setDeleteSuccess(false);
                history.push({
                    pathname: `/users/${currentUser.id}`
                })    
            }, 5000);
        }else {            
            console.log('Somthing went Wrong!!');
        }
    }

    return (
        <Container>
            {currentUserInfo ?
            <>
                <Jumbotron> 
                    <Media className="userMedia">
                        <img
                            width={300}
                            className="mr-3"
                            src={person}
                            alt="person"
                        />
                            <Media.Body>
                                <h4> {currentUserInfo.name}</h4>
                                <span> {currentUserInfo.username}</span>
                            
                                <ul>
                                    <li><b>Email: </b> {currentUserInfo.email} </li>      
                                    <li><b>Phone: </b> {currentUserInfo.phone}</li>
                                    <li><b>Webaite: </b> {currentUserInfo.website}</li>
                                    <li><b>Company Name: </b> {currentUserInfo.company.name}</li>
                                </ul>
                                <address><b>Address: </b>
                                    {currentUserInfo.address.city}
                                    {currentUserInfo.address.suite}<br></br>
                                    {currentUserInfo.address.street}
                                    {currentUserInfo.address.zipcode}
                                </address>
                            </Media.Body>
                    </Media>
                </Jumbotron>
                <br></br>
                <Row>
                    <div className="center">
                        <h3>All posts By {currentUserInfo.name}</h3>        
                    </div>
                </Row>
                <Row>
                    <div className="center">
                        {deleteSuccess && <Alert variant="danger">Post Deleted</Alert> }
                    </div>
                    {/* {deleteSuccess && <Toast>
                        <Toast.Header>
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                    </Toast>} */}
                </Row>
                <Row>
                    { posts.length > 0 ?  
                        posts.slice(0, visiblePosts).map(
                            (post, index) => 
                            <Col md={6} key={index}>
                                <Card className ='post-card'>
                                    <Card.Body>
                                        <Card.Title>{post.title.length > 30 
                                            ? ucFirst(post.title.slice(0, 30).trim() + '...') 
                                            : ucFirst(post.title).trim()
                                        }</Card.Title>
                                        <Card.Text>{post.body.slice(0, 60)}</Card.Text>
                                        <Link to={`/post/${post.id}`}>
                                            <Button variant="outline-success">Read More</Button>
                                        </Link>
                                        {currentUser && currentUser.id === parseInt(id) ? 
                                        <>
                                            <Link to={`/post/update/${post.id}`}>
                                                <Button variant="outline-secondary" >Edit Post</Button>
                                            </Link>
                                            
                                            <Button variant="outline-danger" onClick={() => handlePostDelete(post.id)}>Delete</Button>
                                        </>
                                        : ''}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ) 
                    :  <p>No post found</p>
                    }
                </Row>
                <Row>
                { posts.length > 10 ?  
                    <div className="text-center center jmtb30">
                        <Button variant="outline-dark" type="button" onClick={handleLoadMoreClick}>
                            Load More
                        </Button>
                    </div>
                    : ''
                }
                </Row>
            </>
           : <Spinner animation="border" role="status">
                 <span className="sr-only">Loading...</span>
            </Spinner>}
           
        </Container>
    );
};

export default User;