import React from 'react'
import './TryLogs.css'
import logImg from '../../images/logs.jpg'

const TryLogs = () => {
  return (
    <>
        <div className="trylogsCover">
            <div className="left">
                <img  src={logImg} alt="" />
            </div>
            <div className="right">
                <div className="">Try Logs</div>
                <div className="buttonCover">
                    <button>Try Logs</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default TryLogs