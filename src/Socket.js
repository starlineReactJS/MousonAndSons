import React, { useContext, useEffect } from 'react';
import pako from "pako";
import { useDispatch } from 'react-redux';
import { setClientData, setPopup, setReferanceData } from './redux/reducers';
import { prjName } from "./config";
import { SocketContext } from './App';

export default function Socket() {
    let socketContext = useContext(SocketContext);
    const dispatch = useDispatch();

    useEffect(() => {
        socketContext.on('connect', function () {
            socketContext.emit('client', prjName);
        });

        socketContext.on("alertDetails", function (data) {
            try {
                if (!!data) {
                    var popup = pako.inflate(data, { to: 'string' });
                    var popupData = JSON.parse(popup);
                    if (!!popupData) {
                        dispatch(setPopup(popupData));
                    } else {
                        dispatch(setPopup([]));
                    }
                } else {
                    dispatch(setPopup([]));
                }
            } catch (error) {
                console.log(error);
            }
        });

        socketContext.on('contactDetails', function (data) {
            try {
                if (!!data) {
                    var strLiveRates = pako.inflate(data, { to: 'string' });
                    var clientDetails = JSON.parse(strLiveRates);
                    if (!!clientDetails) {
                        dispatch(setClientData(clientDetails));
                    } else {
                        dispatch(setClientData([]));
                    }
                } else {
                    dispatch(setClientData([]));
                }
            } catch (error) {
                console.log(error);
            }
        });

        socketContext.on('referanceDetails', function (data) {
            try {
                if (!!data) {
                    var refereancedata = pako.inflate(data, { to: 'string' });
                    var referancedetails = JSON.parse(refereancedata);
                    if (!!referancedetails) {
                        dispatch(setReferanceData(referancedetails));
                    } else {
                        dispatch(setReferanceData([]));
                    }
                } else {
                    dispatch(setReferanceData([]));
                }
            } catch (error) {
                console.log(error);
            }
        });

    }, []);
    return (
        <div>

        </div>
    );
}
