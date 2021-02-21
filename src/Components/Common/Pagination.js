import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({userPerPage, totalUser, paginate}) => {
    const pageNumbers = [];
    for(let number =1; number <= Math.ceil(totalUser / userPerPage); number++) {
        pageNumbers.push(number);
    }

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>
        );
    }

    return (
        <nav>
            <ul className="pagination">
            {
             pageNumbers.map((number, idxp) => 
                <li key={idxp} className="page-item">
                    <a onClick={()=> paginate(number)} href="#!" className='page-link'>{number}</a>
                </li>
             )   
            }
            </ul>
        </nav>
    );
};

export default Pagination;