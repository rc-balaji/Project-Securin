// Pagination.js
import React from 'react';

function Pagination({ totalCount, startIndex, count, onPageChange }) {
  const totalPages = Math.ceil(totalCount / count);

  const handlePreviousPage = () => {
    onPageChange(startIndex - count);
  };

  const handleNextPage = () => {
    onPageChange(startIndex + count);
  };

  return (
    <div>
      <button onClick={handlePreviousPage} disabled={startIndex === 0}>Previous</button>
      <span>Page {Math.ceil(startIndex / count) + 1} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={startIndex + count >= totalCount}>Next</button>
    </div>
  );
}

export default Pagination;
