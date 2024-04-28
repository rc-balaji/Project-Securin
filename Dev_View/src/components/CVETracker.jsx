// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Pagination from './Pagination';

function CVETractor() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [count, setCount] = useState(10); // Default count value

  const url = 'http://localhost:5000/cves';

  useEffect(() => {
    fetchData();
    fetchTotalCount(); // Fetch total count when component mounts
  }, [startIndex, count]); // Fetch data when startIndex or count changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/list?startIndex=${startIndex}&count=${count}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const totalCountResponse = await axios.get(`${url}/total-records`);
      setTotalCount(totalCountResponse.data.total);
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  const handlePagination = (newStartIndex) => {
    setStartIndex(newStartIndex);
  };

  const handleCountChange = (event) => {
    setCount(parseInt(event.target.value)); // Convert selected value to integer
    setStartIndex(0); // Reset startIndex when count changes
  };

  return (
    <div>
      <h1>CVE Tracker</h1>
      <div>
        Total Count: {totalCount}
        <select value={count} onChange={handleCountChange}>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <Table data={data} />
      <Pagination totalCount={totalCount} startIndex={startIndex} count={count} onPageChange={handlePagination} />
    </div>
  );
}

export default CVETractor;
