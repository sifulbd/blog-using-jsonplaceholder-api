import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Container , Button} from 'react-bootstrap';
import {ucFirst} from '../Common/utils.js'
import {Link} from "react-router-dom";
  
const Posts = () => {
    const[posts, setPosts] = useState({});
    const[visiblePosts, setVisiblePosts] = useState(10);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            setPosts(data)
        });
    }, []);

    const handleLoadMoreClick = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 4)
    }
    return (
        <Container>
            <h3 className="text-center mb-10">Recent Posts</h3>
            <hr></hr>
            <Row>
                { posts.length > 0 ?  
                    posts.slice(0, visiblePosts).map(
                        (post, index) => 
                        <Col md={4} key={index}>
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
                                </Card.Body>
                            </Card>
                        </Col>
                    ) 
                :  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                }
            </Row>
            <Row>
            { posts.length > 0 ?  
                <div className="text-center center jmtb30">
                    <Button variant="outline-dark" type="button" onClick={handleLoadMoreClick}>
                        Load More
                    </Button>
                </div>
                : ''
            }
            </Row>
        </Container>
    );
};

export default Posts;