import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { useSelector } from "react-redux";
import pako from "pako";
// import { customHeight, usePrevious, usePreviousReference } from "../../utils";
// import { Skeleton } from "../../components/Skeleton";
import Jewelleryimage from '../../images/1.png'
import "../jewellery/jewellery.css";
const Jewellery = () => {
  return (
        <div className="Jewellery-Cover">
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" href="">
                            <img  src={Jewelleryimage} alt="" />
                          </a>
                        </div>
                      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
                        <div className="modal-dialog modal-xl">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">
                           
                              </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close" />
                                <svg className="crosssvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z" /></svg>
                              
                            </div>
                            <div className="modal-body">
                              <div className="jewellery-image-pop-cover">
                                <img src={Jewelleryimage} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                 <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <img src={Jewelleryimage} alt="" />
                        </div>
                    </div>
                </div>
                 <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <img src={Jewelleryimage} alt="" />
                        </div>
                    </div>
                </div>
                 <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <img src={Jewelleryimage} alt="" />
                        </div>
                    </div>
                </div>
                 <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <img src={Jewelleryimage} alt="" />
                        </div>
                    </div>
                </div>

                 <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <img src={Jewelleryimage} alt="" />
                        </div>
                    </div>
                </div>
                 <div className="col-md-3">
                    <div className="jewellery-product-cover">
                        <div className="jewellery-image">
                          <img src={Jewelleryimage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
          </div>
 
        </div>


      


  )
}

export default Jewellery
