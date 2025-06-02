import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { androidUrl, footerData, iosUrl } from '../../config';
import '../footer/footer.css';
import logo1 from '../../images/android.png';
import logo2 from '../../images/ios.png';
import sl from '../../images/sl.png';
export default function Footer() {
  const clientData = useSelector((state) => state.clientDetails);

  return (
    <footer id="dk-footer" className="dk-footer">
      <div className="header-top-marquee">
        <marquee className="marquee2">{clientData[0]?.Marquee2}</marquee>
      </div>
      <div className="appavailable">
        <div className="container">
          <div className="row ft-second">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="main app">

                <a href="https://play.google.com/store/apps/details?id=com.mousonandsons" target="_blank" >
                  <img src={logo1} alt="image" />
                </a>
                <a href="https://apps.apple.com/us/app/%E0%A4%AE-%E0%A4%B8-%E0%A4%A3-%E0%A4%8F-%E0%A4%A1-%E0%A4%B8-%E0%A4%B8/id6680188043" target="_blank" >
                  <img src={logo2} alt="image" />
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12"></div>
          </div>
        </div>
      </div>
      <div className="cover-copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="cover-copyright-tittle">
                <h6>{footerData?.copyright}</h6>
              </div>
              <div className="footer-company-name text-right">
                <p className="f-left sl">
                  Powered By
                  <a href={footerData?.companyLink} target="_blank">{footerData?.companyName}</a>
                  <a href={footerData?.companyLink} target='_blank'><img src={footerData?.logo} /></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>


  );
}
