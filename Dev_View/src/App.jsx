// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import CVETracker from './components/CVETracker';
import CSEDetails from './components/CSEDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/cses/list" element={<CVETracker />} />
          <Route path="/" element={<Navigate to="/cses/list" />} />
          <Route path="/cves/:id" element={<CSEDetails />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
