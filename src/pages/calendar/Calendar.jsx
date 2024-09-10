import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '../../components/Skeleton';
import { customHeight } from '../../utils';

export default function Calendar() {

    let calendarRef = useRef(null);
    const [oneTimeRender, setOneTimeRender] = useState(null);
    let heightObj = {
        calendar: "600px",
    };

    useEffect(() => {
        setOneTimeRender("rendered");
    }, [])

    let isLoading = Skeleton({ dependency: { calendar: !!calendarRef.current?.src ? [calendarRef.current?.src] : [] } });

    return (
        <div className="main-cover">
            <div className="container">
                <div className={`${!(!!isLoading?.calendar) ? "eco_calendar skeleton" : ""}`} style={{ height: !(!!isLoading?.calendar) ? customHeight(heightObj?.calendar) : "" }}>
                    <iframe ref={calendarRef} style={{ margin: "30px 0px", display: !(!!isLoading?.calendar) ? "none" : "block" }} scrolling="no" allowtransparency="true" frameBorder="0" width="100%" height="600px" src="https://www.mql5.com/en/economic-calendar/widget?mode=1&amp;utm_source=www.pritamspot.com"></iframe>
                    <div id=""></div>
                </div>
            </div>
        </div>
    )
}
