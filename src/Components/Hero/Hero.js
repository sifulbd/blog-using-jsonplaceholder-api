import React from "react";
import {
    Container,
    Form,
    Row,
    Col,
    InputGroup,
    FormControl,
    Jumbotron,
    Button,
} from "react-bootstrap";

const Hero = () => {
    return (
        <Jumbotron>
            <Container>
                <Row>
                    <Col md={8} className="center">
                        <Form>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Search Post" />
                                <InputGroup.Append>
                                    <Button variant="success">Search </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Hero;
