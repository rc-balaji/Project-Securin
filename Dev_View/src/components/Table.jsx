// Table.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Table({ data }) {
  const [popupData, setPopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleRowClick = async (id, event) => {
    try {
      const response = await axios.get(`http://localhost:5000/cves/${id}`);
      setPopupData(response.data);

      // Calculate position relative to the clicked row
      const rect = event.target.getBoundingClientRect();
      setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    } catch (error) {
      console.error('Error fetching complete data:', error);
    }
  };

  const handleClosePopup = () => {
    setPopupData(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Source Identifier</th>
            <th>Published</th>
            <th>Last Modified</th>
            <th>Vulnerability Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} onClick={(event) => handleRowClick(item.id, event)}>
              <td><Link to={`/cves/${item.id}`}>{item.id}</Link></td>
              <td>{item.sourceIdentifier}</td>
              <td>{item.published}</td>
              <td>{item.lastModified}</td>
              <td>{item.vulnStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
