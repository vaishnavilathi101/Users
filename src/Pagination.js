import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


function Pagination({ data, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  const handleUserDetails = (user_id) => {
    navigate(`/${user_id}`);
  }
  return (
    <tbody>
      {getPaginatedData().map((item, idx) => (
        <tr key={item.id}>
          <td onClick={() => handleUserDetails(item.id)} className="style-cursor">{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.age}</td>
          <td>{item.email}</td>
          <td><a href={item.web} target="_blank">{item.web}</a></td>
        </tr>
      ))}
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          {"<"}
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === 50 ? 'disabled' : ''}`}
        >
          {">"}
        </button>
      </div>
    </tbody>
  );
}
export default Pagination;