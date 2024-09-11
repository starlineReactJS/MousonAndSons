import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Socket from '../Socket';
import Footer from '../components/footer/Footer';
import UpdatePopup from '../components/update popup/UpdatePopup';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const BaseLayout = () => {
    let popupData = useSelector((state) => state.popup);

    const eventListener = () => {
        if (!localStorage.getItem('otrDetails')) {
            window.location.reload();
            // adminsocket.disconnect();
        }
        if (!localStorage.getItem('loginDetails')) {
            window.location.reload();
            // adminsocket.disconnect();
        }
    };
    useEffect(() => {
        window.addEventListener('storage', eventListener);
        return () => {
            window.removeEventListener('storage', eventListener);
            // adminsocket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <ToastContainer />
            <Header />
            {popupData && Object.keys(popupData).length > 0 && (<UpdatePopup />)}
            <Outlet />
            <Socket />
            <Footer />
        </>
    );
};

export default BaseLayout;
