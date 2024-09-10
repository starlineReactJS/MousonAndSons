import React, { useState } from 'react'
import './menu.css'
import Page from './Page'
import Marquee from '../marquee/Marquee'
import { useSelector } from 'react-redux'

export default function Menu() {
    const clientdata = useSelector((state) => state.clientDetails)
    const [activeTab, setActiveTab] = useState('');

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className='menu'>
                <div className='container'>
                    <div className='menuCover'>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className='toggleBtn'>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                    <span className="navbar-toggler-icon"></span>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <Page className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} path="/about" pageName="About Us" onClick={() => handleActiveTab('about')} />
                                    <Page className={`nav-link ${activeTab === 'liverate' ? 'active' : ''}`} path="/" pageName="Live Rate" onClick={() => handleActiveTab('liverate')} />
                                    <Page className={`nav-link ${activeTab === 'update' ? 'active' : ''}`} path="/update" pageName="Updates" onClick={() => handleActiveTab('update')} />
                                    <Page className={`nav-link ${activeTab === 'Kyc' ? 'active' : ''}`} path="/update" pageName="Updates" onClick={() => handleActiveTab('Kyc')} />
                                    <Page className={`nav-link ${activeTab === 'bank' ? 'active' : ''}`} path="/bankDetail" pageName="Bank Detail" onClick={() => handleActiveTab('bank')} />
                                    <Page className={`nav-link ${activeTab === 'calendar' ? 'active' : ''}`} path="/calendar" pageName="Economic Calendar" onClick={() => handleActiveTab('calendar')} />
                                    <Page className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`} path="/feedback" pageName="Contact Us" onClick={() => handleActiveTab('feedback')} />
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {clientdata?.map((data, index) => (
                <Marquee classname="marquee11 marquee1" detail={data?.marqueeTop} key={data.user} />
            ))}
        </>
    )
}
