import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import axios from "axios";

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
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem("accessToken");
  
  useEffect(( )=>{
  const pages = (selectedGenre) => {
    axios.get(`http://artpro.world:8080/api/v1/boards?page=${currentPage}&size=8&sort=string&category=ARTIST&orderCriteria=likeCount&genre=${selectedGenre}`, {
    headers:{
      "Authorization": `Bearer ${token}`,
    }
  })
  .then((res) => {
    const totalPages = res.data.totalPages;
    console.log(totalPages);
    setTotalPages(totalPages);
    })
  }
  void pages();
  }, []);

  const handlePageClick = ({ selected }) => {
    onPageChange({ selected });
  };

  const PageCountChange = ({ }) => {
    setTotalPages(totalPages);
  };

  return (
    <StyledPaging
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPages}
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
