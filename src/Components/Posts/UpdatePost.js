import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import {loggedUserContext} from './../../App';

const UpdatePost = () => {
    const {id} = useParams();
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    const [updatePostResponse, setUpdatePostResponse] = useState(false);
    const[currentPostInfo, setCurrentPostInfo] = useState({});
    const history = useHistory();

    const postId = parseInt(id);
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    useEffect(() => {
        fetch(postUrl)
        .then((response) => response.json())
        .then((data) => setCurrentPostInfo(data));
    }, [postUrl]);

    const handleIChange = (e) => {
        const { name, value } = e.target;
        setCurrentPostInfo((prevContnet) => {
          return {
            ...prevContnet,
            [name]: value
          };
        });
    };
    
    const handleSubmit = () => {
        fetch(postUrl, {
            method: 'PUT',
            body: JSON.stringify(currentPostInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(() => setUpdatePostResponse(true))
        .catch((err) => console.log(err));
        setTimeout(function(){ 
            setUpdatePostResponse(false);
            history.push({
                pathname: `/users/${currentUser.id}`
            })    
        }, 5000);
    }
    const handleUpdateCancel = () => {
        history.push({
            pathname: `/users/${currentUser.id}`
        })    
    }
    return (
        <Container>
            <Card className="createPost-card">
                {updatePostResponse && <Alert variant="success">Post Updated</Alert> }
                <Card.Title>Update post</Card.Title>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={currentPostInfo.title}
                            onChange={handleIChange}
                            placeholder="Enter Post title"
                        />
                        <Form.Control as="textarea" 
                            id="body"
                            name="body"
                            value={currentPostInfo.body}
                            onChange={handleIChange}
                            placeholder=""
                            rows={4} 
                            className="mb-4"
                        />
                        <Button variant="info" onClick={handleSubmit}>Update Post</Button>
                        <Button variant="warning" className="ml-2" onClick={handleUpdateCancel}>Cancel</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default UpdatePost;