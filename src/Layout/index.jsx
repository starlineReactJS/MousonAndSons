import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Socket from '../Socket';
import Footer from '../components/footer/Footer';
import UpdatePopup from '../components/update popup/UpdatePopup';
import { useSelector } from 'react-redux';

const BaseLayout = () => {
    let popupData = useSelector((state) => state.popup);
    return (
        <>
            <Header />
            {popupData && Object.keys(popupData).length > 0 && (<UpdatePopup />)}
            <Outlet />
            <Socket />
            <Footer />
        </>
    );
};

export default BaseLayout;
