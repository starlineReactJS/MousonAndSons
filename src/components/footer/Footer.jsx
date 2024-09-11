import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { androidUrl, footerData, iosUrl } from '../../config';
import '../footer/footer.css';
import logo1 from '../../images/logo1.png';
import logo2 from '../../images/logo2.png';
import sl from '../../images/sl.png';
export default function Footer() {
  const clientData = useSelector((state) => state.clientDetails);



  // Client Data Redux 
  const clientdata = useSelector((state) => state.clientDetails);
  // console.log(clientdata);
  return (
    // <footer>
    //     <div className="mrq-cover">
    //         <marquee>{clientData?.[0]?.marqueeBottom}</marquee>
    //     </div>
    //     <div className="footer-cover">
    //         <div className="container">
    //             <div className="col-md-6">
    //                 <div className="booking-nc">
    //                     <span style={{ display: "block", marginBottom: "10px", color: "#602459" }}>BOOKING NUMBER  </span>
    //                     <span className="sidemar">{clientData?.[0]?.number1}</span> |<span className="sidemar">{clientData?.[0]?.number2}</span>
    //                 </div>
    //             </div>
    //             <div className="col-md-6">
    //                 <div className="inf-cover">
    //                     <div className="f-t" style={{ display: "block", marginBottom: "10px" }}>
    //                         <h3>AVAILABLE ON</h3>
    //                     </div>
    //                     <div className="available">
    //                         <ul>
    //                             <li><a onClick={() => window.open(androidUrl, "_blank")}><img src={android} alt="" /></a></li>
    //                             <li><a href={iosUrl}><img src={ios} alt="" className="sidemar" /></a></li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="copyright">
    //         <div className="container">

    //             <div className="fb">
    //                 <div className="col-md-4 col-sm-4 col-xs-12 text-center">
    //                     <p align="center">{footerData?.copyright}</p>
    //                 </div>
    //                 <div className="col-md-4 col-sm-4 col-xs-12 text-center">

    //                 </div>
    //                 <div className="col-md-4 col-sm-4 col-xs-12 text-center">
    //                     <p className="f-left sl">Powered By <a href={footerData?.companyLink} target="_blank">{footerData?.companyName}</a>
    //                         <a href={footerData?.companyLink} target="_blank"><img className='footer_image' src={footerData?.logo} /></a>
    //                     </p>
    //                 </div>
    //             </div>
    //             <p></p>
    //         </div>
    //     </div>
    // </footer>


    // <footer>
    //   <div className="footer-cover">
    //       <div className="cover-copyright">
    //         <div className="container">
    //           <div className="row">
    //             <div className="col-md-12 ">
    //               <div className="cover-copyright-tittle">
    //                 <h6>{footerData?.copyright}</h6>
    //               </div>
    //               <p className="footer-company-name text-right">
    //                 <a href={footerData?.companyLink} target='_blank'>{footerData?.companyName}</a>  
    //                 <a href={footerData?.companyLink} target='_blank'><img className='footer_image' src={footerData?.logo} /></a>
    //                 </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    // </footer>


    <footer id="dk-footer" className="dk-footer">
      <div className="header-top-marquee">
        <marquee className="marquee2">{clientData[0]?.Marquee2}</marquee>
      </div>
      <div className="appavailable">
        <div className="container">
          <div className="row ft-second">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="main app">

                <a href="#" target="_blank" >
                  <img src={logo1} alt="image" />
                </a>
                <a href="#" target="_blank" >
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
