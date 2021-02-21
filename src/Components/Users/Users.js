import React, { useEffect, useState } from 'react';
import {Jumbotron, Col, InputGroup, FormControl, Row, Table, Form, Container, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Pagination from '../Common/Pagination';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(3);
   
    const userUrl = `https://jsonplaceholder.typicode.com/users`;
    useEffect(() => {
        fetch(userUrl)
        .then((response) => response.json())
        .then((data) => {setUsers(data)});
    }, [userUrl]);


    //get User
    const indexofLastUser = currentPage * userPerPage;
    const indexofFirstUser = indexofLastUser - userPerPage;
    const currentUser = users.slice(indexofFirstUser, indexofLastUser);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //filter search 
    const searchUser = (tr) => {
        return tr.filter(tr => 
            tr.name.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1 ||
            tr.email.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1 ||
            tr.website.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1 
        )
    };    

    const handleUserSerach = (e) => {
        const newsearchValue = e.target.value;
        setUserSearch(newsearchValue);
    }

    const handlePaginationUser = (e) => {
        console.log(e.target.value)
        setUserPerPage(e.target.value)
    }

    return (
        <>
            <Jumbotron >
                <Container>
                    <Row>
                        <Col md={8} className="center">
                            <Form>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Search User"
                                        onChange={handleUserSerach}
                                        value={userSearch ?  userSearch : ''}
                                        name="userSearch"
                                        id="userSearch"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="success">Search </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container>
            <h3 className="text-center mb-10">All Users</h3>
                <Table striped hover size="sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th> 
                        <th>Website</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="user-tbale-body">
                        {currentUser.length ? searchUser(currentUser).map((user, idx3) => 
                            <tr key={idx3}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.website}</td>
                                <td><Link to={`/users/${user.id}`}>View Details</Link></td>
                            </tr>
                        ) : 'No user found'}
                    </tbody>
                </Table>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Form.Group controlId="paginationperpage">
                                <Form.Label>User Per Page</Form.Label>
                                <Form.Control style={{width: '100px', marginLeft: '10px'}} as="select" onChange={handlePaginationUser} custom>
                                    <option>3</option>
                                    <option>5</option>
                                    <option>10</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>                                 
                    </Col>

                    <Col md={6} className='d-flex justify-content-end'>
                        <Pagination userPerPage={userPerPage} totalUser={users.length} paginate={paginate}></Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Users;