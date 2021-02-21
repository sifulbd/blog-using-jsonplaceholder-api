import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import { Form, Card, Container, Spinner, Button, Media} from 'react-bootstrap';
import {ucFirst, threeWords} from '../Common/utils.js';
import blogImg from "./../../images/blog.jpeg";
import {loggedUserContext} from './../../App';

const PostDetails = () => {
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    let { id } = useParams();
    const [fullpost, setFullPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const postId = parseInt(id);
    const history = useHistory();
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    const userUrl = `https://jsonplaceholder.typicode.com/users`;
    const [postComment, setPostComment] = useState({
        name: currentUser.name,
        comment: ''
    });
    useEffect(() => {
        fetch(postUrl)
        .then((response) => response.json())
        .then((data) => {setFullPosts(data)});
    }, [postUrl]);

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {setComments(data)});
    }, [url]);

    useEffect(() => {
        fetch(userUrl)
        .then((response) => response.json())
        .then((data) => {setUsers(data)});
    }, [fullpost, userUrl]);

    const postAuthor  = users.find(us => us.id === fullpost.userId);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostComment((prevContnet) => {
          return {
            ...prevContnet,
            [name]: value
          };
        });
        console.log(postComment);
    }
    const handleCommentPostClick = () => {
        if(currentUser.name) {
            alert('Wah! Please post a nice comment!!')
        }else {
            history.push({
                pathname: `/login`
            })    
        }
    }
    return (
        <Container>
            {fullpost.title && postAuthor && comments? 
                <Card className ='post-card'>
                    <Card.Body>
                        <h2>{ucFirst(fullpost.title)}</h2>
                        <p>By <Link to={`/users/${postAuthor ? postAuthor.id : '#'}`}>
                                <b>{postAuthor && postAuthor.name}</b>
                            </Link>
                        </p>
                        <img src={blogImg} alt="" className="img-fluid mb-5"/>
                        <Card.Text>{ucFirst(fullpost.body)}</Card.Text>
                        <hr/>
                        <h5>Comments</h5>
                        <br></br>
                        {comments.length > 0 ? comments.map((comment, idx) => 
                            <Media className="jnMedia" key={idx}>
                                <Media.Body>
                                    <h6>{ucFirst(threeWords(comment.name))}</h6>
                                    <p>{comment.email}</p>
                                    <p>{comment.body}</p>
                                </Media.Body>
                            </Media>
                            )
                            : <p>No comment found</p>
                        }

                        <h5>{currentUser.name ? 'Leave a Comment' : `Login to post a comment`}</h5>
                        {currentUser.name &&
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" 
                                        rows={4} 
                                        className="mb-4" 
                                        name='comment'
                                        id='comment'
                                        value={postComment.comment ? postComment.comment : ''}
                                        onChange={handleChange}
                                        placeholder='Enter Your Comment'
                                    />
                                    <Button variant="outline-info" onClick={handleCommentPostClick}>Comment</Button>
                                </Form.Group>
                            </Form>
                        }
                    </Card.Body>
                </Card>
                :
                <Spinner animation="border" role="status">å
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
        </Container>
    );
};

export default PostDetails;