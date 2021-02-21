import React, { useContext, useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import {loggedUserContext} from './../../App';

const CreatePost = () => {
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    const [createPost, setCreatePost] = useState({
        title: '',
        body: '',
        userId: currentUser.id
    });
    const handleIChange = (e) => {
        const { name, value } = e.target;
        setCreatePost((prevContnet) => {
          return {
            ...prevContnet,
            [name]: value
          };
        });
    };
    const handleSubmit = () => {
        console.log(createPost);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(createPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
        setCreatePost({title: '', body: ''});
    }
    return (
        <Container>
            <Card className="createPost-card">
                <Card.Title>Create a new post</Card.Title>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={createPost.title}
                            onChange={handleIChange}
                            placeholder="Enter Post title"
                        />
                        <Form.Control as="textarea" 
                            id="body"
                            name="body"
                            value={createPost.body}
                            onChange={handleIChange}
                            placeholder="Post Body"
                            rows={4} 
                            className="mb-4"
                        />
                        <Button variant="info" onClick={handleSubmit}>Submit Post</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default CreatePost;