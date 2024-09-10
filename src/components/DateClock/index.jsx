import React, { memo, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import IndiaFlag from "../../images/india.png";

const DateClock = () => {

    const [dateTime, setDateTime] = useState("");
    const dateTimeIntervalRef = useRef("");

    const getDateTime = () => {
        let date = moment().format('ddd DD/MM/YYYY hh:mm:ss A');
        setDateTime(date);
    }

    useEffect(() => {
        dateTimeIntervalRef.current = setInterval(getDateTime, 1000);
        return () => {
            clearInterval(dateTimeIntervalRef.current);
        };
    }, [])

    return (
        <div className="ri-cv">
            <div className="btn-group btn-block">
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="time-cover">
                            <img src={IndiaFlag} title="Indian Time" alt="Indian Time" className="" /> <span id="date_time">{dateTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(DateClock)
