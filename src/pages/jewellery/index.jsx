import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { useSelector } from "react-redux";
import pako from "pako";
// import { customHeight, usePrevious, usePreviousReference } from "../../utils";
// import { Skeleton } from "../../components/Skeleton";
import Jewelleryimage from '../../images/1.png';
import "../jewellery/jewellery.css";
import { Toast, usePrevious } from "../../utils";
import { SocketContext } from "../../App";
import { Skeleton } from "../../components/Skeleton";
import { useSelector } from "react-redux";
import { jewelleryDetails } from "../../Api";
const Jewellery = () => {

  let toast = Toast();
  let socketContext = useContext(SocketContext);
  const [maindata, setMainData] = useState(null);
  const previousMainProduct = usePrevious(!!maindata ? maindata : []);
  const clientdetails = useSelector((state) => state.clientDetails);
  const clientData = !!clientdetails?.length ? clientdetails : [];

  const [jewelleryData, setJewelleryData] = useState([]);
  console.log("🚀 ~ Jewellery ~ jewelleryData:", jewelleryData);
  const [coinImage, setCoinImage] = useState("");

  let heightObj = {
    mainProduct: "300px",
    referenceProductData: "200px",
  };

  let isLoading = Skeleton({
    dependency: {
      maindata: maindata
    },
  });

  const getJewellery = async () => {
    let tempJewelleryDetails = await jewelleryDetails();
    if (!!tempJewelleryDetails?.d) {
      try {
        let data = JSON.parse(tempJewelleryDetails?.d);
        if (data?.length > 1) {
          setJewelleryData([...data]);
        } else {

        }
        console.log("🚀 ~ getJewellery ~ tempJewelleryDetails:", data);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    getJewellery();
    socketContext.on('message', function (data) {
      try {
        if (!!data) {
          setMainData([...data]);
        } else {
          setMainData([]);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      socketContext.off("message");
    };
  }, []);

  const backgroundColorClass = (current, previous) => {
    if (current > previous) {
      return "h";
    } else if (current < previous) {
      return "l";
    } else {
      return "e";
    }
  };

  let Ratedisplay = "none";
  let available = "none ";
  let isbuy;
  let issell;
  let ishigh;
  let islow;

  for (let data of clientData) {
    // console.log("maindata: ", maindata);
    if (!!maindata && data?.RateDisplay === true && maindata?.length > 0) {
      Ratedisplay = 'block';
      available = 'none';
      if (data?.BuyRate === true) {
        isbuy = '';
      } else {
        isbuy = 'none';
      }
      if (data?.SellRate === true) {
        issell = '';
      } else {
        issell = 'none';
      }
      if (data?.HighRate === true) {
        ishigh = '';
      } else {
        ishigh = 'none';
      }
      if (data?.LowRate === true) {
        islow = '';
      } else {
        islow = 'none';
      }
    } else if ((!!maindata && maindata?.length < 1) || !data?.RateDisplay) {
      Ratedisplay = 'none';
      available = 'block';
    }
  }

  const renderMainProduct = useMemo(() => {
    if (!previousMainProduct) return null;

    if (!!maindata) {
      return maindata?.map((item, index) => {
        if ((item?.Source.toLowerCase() === "gold" || item?.Source.toLowerCase() === "silver") && item?.SymbolType === "6") {
          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousMainProduct[index]?.Ask
          );
          const bgBid = backgroundColorClass(
            item?.Bid,
            previousMainProduct[index]?.Bid
          );
          return (
            <div className="mprate" key={`maindata_${item?.Symbol}`}>
              <table>
                <tbody>
                  <tr className="ligh-white">
                    <td className="mtw1 mprobor_l">
                      <div
                        className={`main-product-cover ${(isbuy !== "none" || issell !== "none") &&
                          "border_right"
                          }`}
                      >
                        <h3>{item?.Symbol}</h3>
                      </div>
                    </td>
                    <td
                      className="mtw2 mprobor_l"
                      style={{
                        display:
                          (isbuy === "none" && islow === "none") ? "none" : "",
                      }}
                    >
                      <div className="mn-rate-cover">
                        <span
                          className={`bgm ${bgBid}`}
                          style={{ display: isbuy }}
                        >
                          {item?.Bid}
                        </span>
                        <span
                          className="bgs hl color-l"
                          style={{ display: islow }}
                        >
                          L : {item?.Low}
                        </span>
                      </div>
                    </td>
                    {/* <td className="mtw2 mprobor_l">
                      <span className="margin-tp e">{item?.diff}</span>
                    </td> */}
                    <td
                      className="mtw2 mprobor_l"
                      style={{
                        display:
                          (issell === "none" && ishigh === "none") ? "none" : "",
                      }}
                    >
                      <div className="mn-rate-cover">
                        <span
                          className={`bgm ${bgAsk}`}
                          style={{ display: issell }}
                        >
                          {item?.Ask}
                        </span>
                        <span
                          className="bgs hl color-g "
                          style={{ display: ishigh }}
                        >
                          H : {item?.High}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      });
    }
  }, [maindata]);

  return (
    <div className="Jewellery-Cover">
      <div className="container-fluid">
        <div className="row">
          {/* <div className="col-md-3"> */}
          {/* <div className="jewellery-product-cover"> */}
          {/* <div className="jewellery-image">
                <a href={null} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <img src={Jewelleryimage} alt="" />
                </a>
              </div> */}
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">

                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  <svg className="crosssvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z" /></svg>

                </div>
                <div className="modal-body">
                  <div className="jewellery-image-pop-cover">
                    <img src={coinImage} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
          {
            !!jewelleryData && jewelleryData?.length > 0 ? jewelleryData?.map((item, index) => {
              return (
                <div className="col-md-3" key={`jewelleryData_${item?.imageID}`} data-bs-toggle="modal" data-bs-target="#exampleModal"
                  onClick={() => setCoinImage(!!item?.imageBig ? `${item?.imageBig}?${Math.random()}` : "")}
                >
                  <div className="jewellery-product-cover">
                    <div className="jewellery-image">
                      <img src={`${item?.imageSmall}?${Math.random()}`} alt="" />
                    </div>
                  </div>
                </div>
              );
            })
              : <h1>No images available</h1>
          }
          {/* <div className="col-md-3">
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
          </div> */}
        </div>
      </div>

    </div>





  );
};

export default Jewellery;
