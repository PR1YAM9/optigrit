import React, { useState } from 'react';
import data from '../../MOCK_DATA.json';
import './GetUserLog.css';

const GetUserLog = () => {
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showFullContent, setShowFullContent] = useState({});
  const [visibleFields, setVisibleFields] = useState(Object.keys(data[0]));
  const [logs, setLogs] = useState(null);

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

  const handleFieldVisibilityChange = (field) => {
    if (visibleFields.includes(field)) {
      setVisibleFields(visibleFields.filter((f) => f !== field));
    } else {
      setVisibleFields([...visibleFields, field]);
    }
  };

  const handleDataSubmit = () => {
    if (!searchField || !searchValue) {
      setLogs([]);
      return;
    }

    const results = data.filter((log) => {
      const fieldValue = log[searchField];
      return fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
    });

    setLogs(results);
  };
  

  return (
    <div className="cover">
    <div className="topCover">
      <h1 className="heading">Get User Log</h1>
      <div className="searchFileda">
        <select
          className="select"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="">Select a field to search</option>
          {Object.keys(data[0]).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <input
          className="select"
          type="text"
          placeholder={`Search by ${searchField}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      </div>
      <div className="section2">
        <h2 className="VF">Visible Fields</h2>
        <div className="field-selector">
          {Object.keys(data[0]).map((field) => (
            <button
              key={field}
              className={
                visibleFields.includes(field) ? 'button-74' : 'not_selected'
              }
              onClick={() => handleFieldVisibilityChange(field)}
            >
              {field}
            </button>
          ))}
        </div>
      <button className="submit-button" onClick={handleDataSubmit}>
        GET LOGS
      </button>
      </div>
      {logs && logs.length > 0 && (
        <div className="data">
          <table className="log-table">
            <thead>
              <tr>
                {visibleFields.map((field) => (
                  <th className={`th${field}`} key={field}>
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr className="log" key={log.log_id}>
                  {visibleFields.map((field) => (
                    <td key={field} className={field}>
                      {log[field].length > 20 ? (
                        <div>
                          {showFullContent[field] ? (
                            <>
                              {log[field]}{' '}
                              <button className='show'
                                onClick={() => toggleShowLessContent(field)}
                              >
                                Show less
                              </button>
                            </>
                          ) : (
                            <>
                              {log[field].slice(0, 20)}{' '}
                              <button className='show'
                                onClick={() => toggleShowFullContent(field)}
                              >
                                Show more
                              </button>
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
  );
};

export default GetUserLog;
