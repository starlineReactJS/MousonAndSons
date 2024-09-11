import React, { useEffect, useMemo, useState } from 'react';
import './pop.css';
import notificationLogo from '../../assets/notification-bell.png';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../../redux/reducers';
import { prjName } from '../../config';

export default function UpdatePopup() {
    const [modalClose, setModalClose] = useState(true);
    let popupData = useSelector((state) => state.popup);
    const popupDetail = !!popupData ? popupData : null;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!!popupData) {
            setModalClose(true);
        }
    }, [popupData]);

    const handlePopup = () => {
        setModalClose(false);
        dispatch(setPopup(null));
    };

    const renderpopUp = useMemo(() => {
        if (!!popupData && popupDetail?.user === prjName && (!!popupDetail?.user) && modalClose) {
            return (
                <div className="popUp" data-bs-toggle="Popup" >
                    <div className='popup'>
                        <div className='container'>
                            <div className='popupCover'>
                                <img src={notificationLogo} alt='' />
                                <div className='popupContent'>
                                    <h4>
                                        {popupData?.Title}
                                    </h4>
                                    <p>
                                        {popupData?.Shortdesc}

                                    </p>
                                    <div className="notification-okbtn">
                                        <span type="button" className="btn" data-bs-dismiss="Popup" aria-label="Close" onClick={handlePopup}>OK</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    return (
        <div>{renderpopUp}</div>
    );
}
