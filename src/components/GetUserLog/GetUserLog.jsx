import React, { useEffect, useState } from 'react';
import data from '../../MOCK_DATA.json';
import './GetUserLog.css';

const GetUserLog = () => {
  const [logs, setLogs] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showFullContent, setShowFullContent] = useState({});

  useEffect(() => {
    setLogs(data);
  }, []);

  const search = () => {
    if (!searchField || !searchValue) {
      setLogs([]); // Clear the logs when no search is performed
      return;
    }

    const results = data.filter((log) => {
      const fieldValue = log[searchField];
      return fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
    });

    setLogs(results);
  };

  useEffect(() => {
    search();
  }, [searchField, searchValue]);

  const toggleShowFullContent = (field) => {
    setShowFullContent((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toggleShowLessContent = (field) => {
    setShowFullContent((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return (
    <>
    <div className="cover">
      <h1 className='heading'>Get User Log</h1>
      <div className='searchFileda'>
        <select className='select' value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="">Select a field to search</option>
          {Object.keys(data[0]).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <input className='select'
          type="text"
          placeholder={`Search by ${searchField}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {logs.length > 0 && ( // Only render the table if there are search results
        <div className="data">
          <table className="log-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((field) => (
                  <th className={'th'+field} key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ width: '100%' }}>
            {logs.map((log) => (
                <tr className="log" key={log.log_id}>
                  {Object.keys(data[0]).map((field) => (
                    <td key={field} className={field}>
                      {log[field].length > 20 ? (
                        <div>
                          {showFullContent[field] ? (
                            <>
                              {log[field]}{' '}
                              <button onClick={() => toggleShowLessContent(field)}>Show less</button>
                            </>
                          ) : (
                            <>
                              {log[field].slice(0, 20)}{' '}
                              <button onClick={() => toggleShowFullContent(field)}>Show more</button>
                            </>
                          )}
                        </div>
                      ) : (
                        log[field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
      </div>
    </>
  );
};

export default GetUserLog;
