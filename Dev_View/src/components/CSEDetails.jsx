// CSEDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CSEDetails.css';

function Description({ description }) {
  return <li>{description.value}</li>;
}

function CVSSMetric({ metric }) {
  return (
    <li>
      <strong>Severity:</strong> {metric.baseSeverity}<br />
      <strong>Score:</strong> {metric.cvssData.baseScore}<br />
      <strong>Vector String:</strong> {metric.cvssData.vectorString}<br />
      <table>
        <thead>
          <tr>
            <th>Access Vector</th>
            <th>Access Complexity</th>
            <th>Authentication</th>
            <th>Confidentiality Impact</th>
            <th>Integrity Impact</th>
            <th>Availability Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{metric.cvssData.accessVector}</td>
            <td>{metric.cvssData.accessComplexity}</td>
            <td>{metric.cvssData.authentication}</td>
            <td>{metric.cvssData.confidentialityImpact}</td>
            <td>{metric.cvssData.integrityImpact}</td>
            <td>{metric.cvssData.availabilityImpact}</td>
          </tr>
        </tbody>
      </table>
      <h3>Scores:</h3>
      <strong>Exploitability Score: </strong> {metric.exploitabilityScore}<br />
      <strong>Impact Score: </strong> {metric.impactScore}
    </li>
  );
}

function CPE({ cpe }) {
  return (
    <tr>
      <td>{cpe.criteria}</td>
      <td>{cpe.matchCriteriaId}</td>
      <td>{cpe.vulnerable ? 'Yes' : 'No'}</td>
    </tr>
  );
}

function CSEDetails({ onClose }) {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cves/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [id]);

  return (
    <div className="cse-details-content">
      <div className="cse-details-header">
        <h2>Complete Data</h2>
      </div>
      <div className="cse-details-body">
        <div className="data-container">
          <h3>{data && data.id}</h3>

          <div className="section">
            <h3>Descriptions</h3>
            <ul>
              {data && data.descriptions.map((desc, index) => (
                <Description key={index} description={desc} />
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>CVSS V2 Metrics</h3>
            <ul>
              {data && data.metrics.cvssMetricV2.map((metric, index) => (
                <CVSSMetric key={index} metric={metric} />
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>CPE</h3>
            <table>
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Match Criteria ID</th>
                  <th>Vulnerable</th>
                </tr>
              </thead>
              <tbody>
                {data && data.configurations.map((config, index) =>
                  config.nodes.map((node, nodeIndex) =>
                    node.cpeMatch.map((cpe, cpeIndex) => (
                      <CPE key={cpeIndex} cpe={cpe} />
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="cse-details-footer">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CSEDetails;
