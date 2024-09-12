import React from 'react';
import logo from "../../images/logo.png";
import logo2 from "../../images/logo2.png";
import Menu from '../menu/Menu';
import { useSelector } from 'react-redux';
import '../../components/header/header.css';
import { Link, useLocation } from 'react-router-dom';
export default function Header() {

  const clientData = useSelector((state) => state.clientDetails);
  let location = useLocation().pathname;
  let currentPathName = location?.length > 1 ? location?.split('/')[1] : location?.split('/')[0];


  // Client Data Redux 
  const clientdata = useSelector((state) => state.clientDetails);
  // console.log(clientdata);
  return (




    // <div>
    //   <div id="notificationDiv"> 
    //   </div>
    //   <div className="mn-cvr" style={{ display: 'none' }}>
    //     <div className="bg-clr">
    //       <div className="text-center lshide"> <img style={{ width: '150px' }} src={logo} /></div>
    //       <div className="col-md-12">
    //         <div className="registrationfont">ONE <span>TIME</span> REGISTRATION</div>
    //       </div>
    //       <div className="otr-maon-cover">
    //         <div className="col-md-6 col-sm-6 col-xs-12">
    //           <p>
    //             <input type="text" placeholder="Name" required name="usernamesignup" id="txtotrName" fdprocessedid="eny25" />
    //           </p>
    //         </div>
    //         <div className="col-md-6 col-sm-6 col-xs-12">
    //           <p>
    //             <input type="text" placeholder="Firm Name" required name="usernamesignup" id="txtotrfirmName" fdprocessedid="cmou9c" />
    //           </p>
    //         </div>
    //         <div className="col-md-6 col-sm-6 col-xs-12">
    //           <p>
    //             <input type="text" placeholder="Mobile Number" required name="usernamesignup" id="txtotrmobNumber" fdprocessedid="3j8sz" />
    //           </p>
    //         </div>
    //         <div className="col-md-6 col-sm-6 col-xs-12">
    //           <p>
    //             <input type="text" placeholder="City" required name="usernamesignup" id="txtotrCity" fdprocessedid="1g9khb" />
    //           </p>
    //         </div>
    //         <div className="signin button text-center">
    //           <button type="submit" className="btn_fill1" fdprocessedid="t5pvks">Register</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mrq-cover">
    //     <marquee>{clientData?.[0]?.marqueeTop}</marquee>
    //   </div>
    //   <div className="menu-cover">
    //     <nav className="navbar navbar-default navbar-expand-sm">
    //       <div className="container">
    //         <button data-bs-toggle="collapse" data-bs-target="#bs-example-navbar-collapse-1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //           <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <a className="brand" href="#"><img src={logo} alt="" /></a>
    //         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    //           <ul className="nav navbar-nav navbar-right">
    //             <li className={`pgabout ${currentPathName === "about" ? "active" : ""}`}><Link className={`nav-link`} to="/about">About</Link></li>
    //             <li className={`pgliverate ${(currentPathName === "") ? "active" : ""}`}><Link className={`nav-link`} to="/">Live Rate</Link></li>
    //             <li className={`pgupdate ${currentPathName === "update" ? "active" : ""}`}><Link className={`nav-link`} to="/update">Update</Link></li>
    //             <li className={`pgbankdetail ${currentPathName === "bankDetail" ? "active" : ""}`}><Link className={`nav-link`} to="/bankDetail">Bank Detail</Link></li>
    //             <li className={`pgecocalender ${currentPathName === "calendar" ? "active" : ""}`}><Link className={`nav-link`} to="/calendar">Economic Calendar</Link></li>
    //             <li className={`pgcontact ${currentPathName === "feedback" ? "active" : ""}`}><Link className={`nav-link`} to="/feedback">Contact Us</Link></li>
    //           </ul>
    //         </div>
    //       </div>
    //     </nav>
    //   </div>
    // </div>

    <>
      <div className="mn-cvr" style={{ display: 'none' }}>
        <div className="bg-clr">
          <div className="text-center lshide"> <img style={{ width: '150px' }} src={logo} /></div>
          <div className="col-md-12">
            <div className="registrationfont">ONE <span>TIME</span> REGISTRATION</div>
          </div>
          <div className="otr-maon-cover">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <p>
                <input type="text" placeholder="Name" required name="usernamesignup" id="txtotrName" fdprocessedid="eny25" />
              </p>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <p>
                <input type="text" placeholder="Firm Name" required name="usernamesignup" id="txtotrfirmName" fdprocessedid="cmou9c" />
              </p>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <p>
                <input type="text" placeholder="Mobile Number" required name="usernamesignup" id="txtotrmobNumber" fdprocessedid="3j8sz" />
              </p>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <p>
                <input type="text" placeholder="City" required name="usernamesignup" id="txtotrCity" fdprocessedid="1g9khb" />
              </p>
            </div>
            <div className="signin button text-center">
              <button type="submit" className="btn_fill1" fdprocessedid="t5pvks">Register</button>
            </div>
          </div>
        </div>
      </div>
      <header>
        <section className="header-cover">
          <div className="header-top-cover">
            <div className="whitecvr">
              <div className="first-top">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="main">
                        <h4>
                          <i className="fa fa-envelope" />
                          E-Mail Address :
                        </h4>
                        <p><a href="#">{clientData[0]?.Email1}</a></p>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6" style={{ textAlign: "right" }}>
                      <div className="main">
                        <h4>
                          <i className="fa fa-whatsapp" />
                          Whatsapp Number :
                        </h4>
                        <p><a href="#">{clientData[0]?.whatsapp_no1}</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="logo-cvr">
                  <a className="navbar-brand" href="#"><img src={currentPathName === "jewellery" ? logo2 : logo} /></a>
                </div>

                <div className="menu-cover">
                  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button data-bs-toggle="collapse" data-bs-target="#bs-example-navbar-collapse-1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="navbar-nav">
                        <li className={`nav-item pgabout ${currentPathName === "about" ? "active" : ""}`}><Link className={`nav-link`} to="/about">About</Link></li>
                        <li className={`nav-item pgliverate ${(currentPathName === "liverate") ? "active" : ""}`}><Link className={`nav-link`} to="/liverate">Live Rate</Link></li>
                        <li className={`nav-item pgjewellery ${(currentPathName === "") ? "active" : ""}`}><Link className={`nav-link`} to="/">Jewellery</Link></li>
                        <li className={`nav-item pgupdate ${currentPathName === "update" ? "active" : ""}`}><Link className={`nav-link`} to="/update">Update</Link></li>
                        <li className={`nav-item pgbankdetail ${currentPathName === "bankDetail" ? "active" : ""}`}><Link className={`nav-link`} to="/bankDetail">Bank Detail</Link></li>
                        <li className={`nav-item pgecocalender ${currentPathName === "calendar" ? "active" : ""}`}><Link className={`nav-link`} to="/calendar">Economic Calendar</Link></li>
                        <li className={`nav-item pgcontact ${currentPathName === "feedback" ? "active" : ""}`}><Link className={`nav-link`} to="/feedback">Contact Us</Link></li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="header-top-marquee">
                <div className="">
                  <marquee direction="left">{clientData?.[0]?.Marquee}</marquee>
                </div>
              </div>

            </div>
          </div>
        </section>
      </header>
    </>
  );
}
