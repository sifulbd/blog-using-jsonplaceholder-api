import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import {loggedUserContext} from './../../App';

const Login = () => {
    const [allUsers, setAllusers] = useState([]);
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: ''
    });
    const [currentUser, setCurrentUser] = useContext(loggedUserContext);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}};

    const userUrl = `https://jsonplaceholder.typicode.com/users`;
    useEffect(() => {
        fetch(userUrl)
        .then((response) => response.json())
        .then((data) => {setAllusers(data)})
    }, [userUrl]);


    function handleSubmit() {
        const  userId = prompt('Enter any number from 1 to 10');
        // const userEmail = 'Sincere@april.biz';
        if (allUsers) {
            const loggedUserFilter = allUsers.find(ft => ft.id === parseInt(userId));
            setCurrentUser(loggedUserFilter);
            history.replace(from);
        }
    }

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setFormInfo((prevContnet) => {
            return {
                ...prevContnet,
                [name]: value
            };     
        });
    };

    return (
        <Container>
            <br></br>
            <br></br>
            <div className="form-group col-md-8">
                <Button variant="info" className="btn-block" onClick={handleSubmit}>Click Here to Login</Button>
            </div>
            <br></br>
            <br></br>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        // value={formInfo.info}
                        onChange={handleLoginChange}
                        placeholder="email"
                    />
                    <input 
                        type='password'
                        id="password"
                        name="password"
                        // value={formInfo.password}
                        onChange={handleLoginChange}
                        placeholder="Password"
                        className="form-control"
                    /> 
                    <Button variant="info">Login</Button>
                </div>
            </form>             
        </Container>
    );
};

export default Login;