import React, { useEffect, useState } from 'react';
import data from '../../MOCK_DATA.json';

const GetUserLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(data);
  }, []);

  const search = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = data.filter((log) => {
        return log.request_method.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setLogs(results);
    } else {
      setLogs(data);
    }
  };

  return (
    <>
      <h1>Get User Log</h1>
      <div>
        <input type="text" placeholder="Search..." onChange={search} />
      </div>
      <div className="data">
        <table>
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Timestamp</th>
              <th>Source IP</th>
              <th>Destination IP</th>
              <th>Request Method</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr className="log" key={log.log_id}>
                <td>{log.log_id}</td>
                <td>{log.timestamp}</td>
                <td>{log.source_ip}</td>
                <td>{log.destination_ip}</td>
                <td>{log.request_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetUserLog;
