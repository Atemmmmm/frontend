import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const StyledPaging = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  margin-top: 350px;
  margin-left: 500px;
  position: fixed;

  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style-type: none;
    color: white;
  }

  li {
    margin: 0 5px;
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
      background-color: #7777;
    }
  }

  .selected {
    background-color: #007bff;
    color: black;
    border-color: #007bff;
  }
`;

const Paging = ({ onPageChange, currentPage }) => {

  const pageCount = 10; 

  const handlePageClick = ({ selected }) => {
    onPageChange({ selected });
  };

  return (
    <StyledPaging
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={currentPage}
    />
  );
};

export default Paging;
