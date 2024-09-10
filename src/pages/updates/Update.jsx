import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Title from '../../components/Title'
import Input from '../../components/Input'
import { updatesDetails } from '../../Api';
import { Skeleton } from '../../components/Skeleton';
import { customHeight } from '../../utils';

export default function Update() {
    const [updateContent, setUpdateContent] = useState([]);
    const [updateMessage, setUpdateMessage] = useState([]);
    const today = new Date().toLocaleDateString("en-GB");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [noData, setNoData] = useState(false);

    let heightObj = {
        updateContent: "300px",
    };

    const handleClick = useCallback(async () => {
        const updateData = await updatesDetails(startDate, endDate);
        if (!!updateData?.data) {
            const updateRes = updateData?.data;
            if (updateRes?.length === 0 || !(!!updateRes)) {
                setNoData(true);
            }
            setUpdateContent(updateRes?.reverse());
        } else {
            setNoData(true);
            setUpdateContent([]);
        }
        setUpdateMessage(updateData);
    }
    );

    let isLoading = Skeleton({ dependency: { updateContent: updateContent } });

    useEffect(() => {
        if (!!noData) {
            isLoading = {updateContent: "dataLoaded",};
        }
    }, [noData])

    useEffect(() => {
        handleClick();
    }, []);

    const renderUpdates = useMemo(() => {
        if (!!noData && (!(!!updateContent) || updateContent?.length === 0)) {
            return (<h1 className='text-center' style={{ color: 'rgb(163, 163, 163)', fontWeight: '600' ,width:'100%',float:'left'}}>No Updates Found</h1>);
        }
        return updateContent?.map((data, index) => {
            let dateTime = data.modifiedDate.split('T');
            let date = dateTime?.[0];
            const [year, month, day] = date.split('-');
            const formattedDate = `${day} ${new Date(date).toLocaleString('default', { month: 'long' })} ${year}`;
            let time = dateTime?.[1].split('.');
            if (updateMessage.message !== "Data not available.") {
                return (
                    <div className="update-cover" key={index}>
                        <div className='up-cover' >
                            <div className='update-date-cover'>
                                <h2>
                                    {formattedDate}
                                    <p className='update-time'>Time:  {time?.[0]}</p>
                                </h2>
                            </div>
                            <div className='update-title'>
                                <h4 className=''>
                                    {data.title}
                                </h4>
                                <p>{data.description === null ? 'NA' : data.description}</p>

                            </div>
                        </div>
                    </div>
                )
            }
        });
    }, [updateContent]);

    return (
        <div className="main-cover">
            <div className="container">

                <div className="col-md-12">
                    <div className="header">
                        <div className="title-wth title-name">
                            UPDATES
                            <div className="mn-title-border">

                                <div className="date-picker">
                                    <input id="txtStartDate" type="date" className="hasDatepicker"
                                        defaultValue={startDate.split("/").reverse().join("-")}
                                        onChange={(e) =>
                                            setStartDate(e.target.value.split("-").reverse().join("/"))}
                                    />
                                    <input id="txtEndDate" type="date" className="hasDatepicker"
                                        defaultValue={endDate.split("/").reverse().join("-")}
                                        onChange={(e) =>
                                            setEndDate(e.target.value.split("-").reverse().join("/"))}
                                    />
                                    <input type="button" id="SearchNewsDateWise" style={{ cursor: "pointer" }} value="Search"
                                        onClick={() => handleClick()}
                                        onMouseDown={(e) => setNoData(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`updateContent ${(!(!!isLoading?.updateContent) && !(!!noData)) ? "skeleton" : ""}`} id="divNews" style={{ height: (!(!!isLoading?.updateContent) && !(!!noData)) ? customHeight(heightObj?.updateContent) : "" }}>
                    <div style={{ display: (!(!!isLoading?.updateContent) && !(!!noData)) ? "none" : "block" }}>
                        {renderUpdates}
                    </div>
                </div>
            </div>
        </div >
    )
}
