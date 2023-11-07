import React, { useState } from 'react';
import data from '../../MOCK_DATA.json';
import './GetUserLog.css';

const GetUserLog = () => {
  const [searchFields, setSearchFields] = useState(['']); // Initialize with an empty field
  const [searchValues, setSearchValues] = useState(['']); // Initialize with an empty value
  const [visibleFields, setVisibleFields] = useState(Object.keys(data[0]));
  const [logs, setLogs] = useState(null);
  const [showFullContent, setShowFullContent] = useState(data.map(() => false));

  const toggleShowFullContent = (index) => {
    setShowFullContent((prev) => {
      const updatedShowFullContent = [...prev];
      updatedShowFullContent[index] = !updatedShowFullContent[index];
      return updatedShowFullContent;
    });
  };

  const toggleShowLessContent = (index) => {
    setShowFullContent((prev) => {
      const updatedShowFullContent = [...prev];
      updatedShowFullContent[index] = false;
      return updatedShowFullContent;
    });
  };

  const handleFieldVisibilityChange = (field) => {
    if (visibleFields.includes(field)) {
      setVisibleFields(visibleFields.filter((f) => f !== field));
    } else {
      setVisibleFields([...visibleFields, field]);
    }
  };

  const handleFieldSelectionChange = () => {
    setSearchFields([...searchFields, '']);
    setSearchValues([...searchValues, '']);
  };

  const handleDataSubmit = () => {
    if (searchFields.length === 0 || searchValues.some((value) => value === '')) {
      setLogs([]);
      return;
    }

    const results = data.filter((log) => {
      return searchFields.some((field, index) => {
        const fieldValue = log[field];
        const searchValue = searchValues[index];
        return fieldValue.toString().toLowerCase().includes(searchValue.toLowerCase());
      });
    });

    setLogs(results);
  };

  return (
    <div className="cover">
      <div className="topCover">
        <h1 className="heading">Get User Log</h1>
        <div className="searchFields">
          {searchFields.map((field, index) => (
            <div className='fields' key={index}>
              <select
                className="select"
                value={field}
                onChange={(e) => {
                  const updatedFields = [...searchFields];
                  updatedFields[index] = e.target.value;
                  setSearchFields(updatedFields);
                }}
              >
                <option value="">Select a field to search</option>
                {Object.keys(data[0]).map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <input
                className="select"
                type="text"
                placeholder={`Search by ${field}...`}
                value={searchValues[index]}
                onChange={(e) => {
                  const updatedValues = [...searchValues];
                  updatedValues[index] = e.target.value;
                  setSearchValues(updatedValues);
                }}
              />
            </div>
          ))}
          <button className="submit-button" onClick={handleFieldSelectionChange}>
            + Add Field
          </button>
        <button className="submit-button" onClick={handleDataSubmit}>
          GET LOGS
        </button>
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
      </div>
      {logs && logs.length > 0 && (
        <div className="data">
          <table className="log-table">
            <thead>
              <tr>
                {visibleFields.map((field) => (
                  <th className={`th${field}`} key={field}>
                    {field.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr className="log" key={log.log_id}>
                  {visibleFields.map((field) => (
                    <td key={field} className={field}>
                      {log[field].length > 20 ? (
                        <div>
                          {showFullContent[index] ? (
                            <>
                              {log[field]}{' '}
                              <button className='show' onClick={() => toggleShowLessContent(index)}>
                                Show less
                              </button>
                            </>
                          ) : (
                            <>
                              {log[field].slice(0, 20)}{' '}
                              <button className='show' onClick={() => toggleShowFullContent(index)}>
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
