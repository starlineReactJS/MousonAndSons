import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import pako from "pako";
import { customHeight, usePrevious, usePreviousReference } from "../../utils";
// import DateClock from "../../components/DateClock";
import { Skeleton } from "../../components/Skeleton";
import "../liverate/liverate.css";
import { SocketContext } from "../../App";
import Login from "../login/Login";

export default function Liverate() {
  let loginFetch = localStorage.getItem('loginDetails');
  loginFetch = JSON.parse(loginFetch);
  let socketContext = useContext(SocketContext);
  const [maindata, setMainData] = useState(null);
  const [referenceProductData, setReferenceProductData] = useState([]);
  const clientdetails = useSelector((state) => state.clientDetails);
  const clientData = !!clientdetails?.length ? clientdetails : [];
  // const maindata = useSelector((state) => state.mainProduct);
  const previousMainProduct = usePrevious(!!maindata ? maindata : []);
  const referenceData = useSelector((state) => state.referanceDetails);
  // const referenceProductData = useSelector((state) => state.referanceProduct);
  const previousReferenceProductData = usePreviousReference(
    !!referenceProductData ? referenceProductData : []
  );
  const [adBannerDisplay, setAdBannerDisplay] = useState("block");
  let displayFutureRef = useRef({});
  let displayNextRef = useRef({});
  let displaySpot = useRef({});
  let heightObj = {
    mainProduct: "300px",
    referenceProductData: "200px",
  };

  const [headerDisplay, setHeaderDisplay] = useState('none');

  let isLoading = Skeleton({
    dependency: {
      maindata: maindata,
      referenceProductData: referenceProductData,
    },
  });

  useEffect(() => {
    if (!(!!loginFetch)) {
      window.location.reload();
      console.log("if");
    } else {
      console.log("else");
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

      socketContext.on('Liverate', function (data) {
        try {
          if (!!data) {
            let referanceproducts = [];
            for (let i = 0; i < data?.length; i++) {
              let element = data[i];
              element = JSON.parse(element);
              referanceproducts.push(element);
            }
            if (!!referanceproducts) {
              setReferenceProductData([...referanceproducts]);
            } else {
              setReferenceProductData([]);
            }
          } else {
            setReferenceProductData([]);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }

    return () => {
      socketContext.off("message");
      socketContext.off("Liverate");
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
  // Main product
  const renderMainProduct = useMemo(() => {
    if (!previousMainProduct) return null;

    if (!!maindata) {
      let checked = false;
      return maindata?.map((item, index) => {
        if ((item?.Source.toLowerCase() === "gold" || item?.Source.toLowerCase() === "silver") && item?.SymbolType === "5") {
          checked = true;
          setHeaderDisplay("block");
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
        } else if (!checked) {
          setHeaderDisplay("none");
        }
      });
    }
  }, [maindata]);

  //Future product
  const renderFutureProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;

    if (!!referenceProductData) {
      return referenceProductData?.map((item, index) => {
        // const referenceItem = referenceData[index];
        if (item?.symbol === "gold" || item?.symbol === "silver") {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.Source === item?.symbol)
            : null;
          if (!(!!referenceItem) || !referenceItem?.IsDisplay) {
            displayFutureRef.current[item?.symbol] = false;
            return false;
          } else {
            displayFutureRef.current[item?.symbol] = true;
          }

          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousReferenceProductData[index]?.Ask
          );

          const bgBid = backgroundColorClass(
            item?.Bid,
            previousReferenceProductData[index]?.Bid
          );

          let Symbol_Name;

          if (
            referenceItem?.Source === "gold" ||
            referenceItem?.Source === "silver"
          ) {
            Symbol_Name = referenceItem?.Symbol_Name;
          }

          return (
            <div className="col-md-6 col-sm-12 fwidth-new" key={`future_${Symbol_Name}`}>
              <div
                className="spot-rate-cover"
                style={{ display: !!referenceItem ? "block" : "none" }}
              >
                <div className="spot-title">
                  <div className="title">
                    <h5>{Symbol_Name}</h5>
                  </div>
                  <div className="Spot-rate-section">
                    <h6>BID</h6>
                    <h4 className="rate">
                      <span className={`${bgBid}`}>{item?.Bid}</span>
                    </h4>
                  </div>
                  <div className="Spot-rate-section">
                    <h6>ASK</h6>
                    <h4 className="rate">
                      <span className={`${bgAsk}`}>{item?.Ask}</span>
                    </h4>
                  </div>
                  <div className="spot-high-low">
                    <div className="w-50">
                      <p className="color-g">
                        <span>H : {item?.High}</span>
                      </p>
                    </div>
                    <div className="w-50">
                      <p className="color-l">
                        <span>L : {item?.Low}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }, [referenceProductData]);

  // Next Product
  const renderNextProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;

    if (!!referenceProductData) {
      return referenceProductData?.map((item, index) => {
        // const referenceItem =  referenceData[index];

        if (item?.symbol === "goldnext" || item?.symbol === "silvernext") {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.Source === item?.symbol)
            : null;
          if (!(!!referenceItem) || !referenceItem?.IsDisplay) {
            displayNextRef.current[item?.symbol] = false;
            return false;
          } else {
            displayNextRef.current[item?.symbol] = true;
          }
          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousReferenceProductData[index]?.Ask
          );
          const bgBid = backgroundColorClass(
            item?.Bid,
            previousReferenceProductData[index]?.Bid
          );

          let Symbol_Name;

          if (
            referenceItem?.Source === "goldnext" ||
            referenceItem?.Source === "silvernext"
          ) {
            Symbol_Name = referenceItem?.Symbol_Name;
          }

          return (
            <div className="col-md-6 col-sm-12 fwidth-new" key={`next_${Symbol_Name}`}>
              <div
                className="spot-rate-cover"
                key={`${Symbol_Name}_${index}`}
                style={{ display: !!referenceItem ? "block" : "none" }}
              >
                <div className="spot-title">
                  <div className="title">
                    <h5>{Symbol_Name}</h5>
                  </div>
                  <div className="Spot-rate-section">
                    <h6>BID</h6>
                    <h4 className="rate">
                      <span className={`${bgBid}`}>{item?.Bid}</span>
                    </h4>
                  </div>
                  <div className="Spot-rate-section">
                    <h6>ASK</h6>
                    <h4 className="rate">
                      <span className={`${bgAsk}`}>{item?.Ask}</span>
                    </h4>
                  </div>
                  <div className="spot-high-low">
                    <div className="w-50">
                      <p className="color-g">
                        <span>H : {item?.High}</span>
                      </p>
                    </div>
                    <div className="w-50">
                      <p className="color-l">
                        <span>L : {item?.Low}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }, [referenceProductData]);

  //Spot product
  const renderSpotProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;

    if (!!referenceProductData) {
      return referenceProductData?.map((item, index) => {
        // const referenceItem = !!referenceData ? referenceData[index] : []
        if (
          item?.symbol === "XAUUSD" ||
          item?.symbol === "XAGUSD" ||
          item?.symbol === "INRSpot"
        ) {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.Source === item?.symbol)
            : null;
          if (!(!!referenceItem) || !referenceItem?.IsDisplay) {
            displaySpot.current[item?.symbol] = false;
            return false;
          } else {
            displaySpot.current[item?.symbol] = true;
          }
          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousReferenceProductData[index]?.Ask
          );
          const bgBid = backgroundColorClass(
            item?.Bid,
            previousReferenceProductData[index]?.Bid
          );

          let Symbol_Name;

          if (
            referenceItem?.Source === "XAUUSD" ||
            referenceItem?.Source === "XAGUSD" ||
            referenceItem?.Source === "INRSpot"
          ) {
            Symbol_Name = referenceItem?.Symbol_Name;
          }

          return (
            <div className="col-md-4 col-sm-12" key={`spot_${Symbol_Name}`}>
              <div
                className="spot-rate-cover"
                style={{ display: !!referenceItem ? "block" : "none" }}
              >
                <div className="spot-title">
                  <div className="title">
                    <h5>{Symbol_Name}</h5>
                  </div>
                  <div className="Spot-rate-section">
                    {/* <h6>ASK</h6> */}
                    <h4 className="rate">
                      <span className={`${bgAsk}`}>{item?.Ask}</span>
                    </h4>
                  </div>
                  <div className="spot-high-low">
                    <div className="w-50">
                      <p className="color-g">
                        <span>H : {item?.High}</span>
                      </p>
                    </div>
                    <div className="w-50">
                      <p className="color-l">
                        <span>L : {item?.Low}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }, [referenceProductData]);

  const handleAdBanner = () => {
    setAdBannerDisplay("none");
  };

  return (
    <div className="gold-spot-cover main-cover">
      <div className="">
        <div className="marquee-cover">
          <div className="">
            {!!clientData?.[0]?.BannerWeb && (
              <div className="add-banner" style={{ display: adBannerDisplay }}>
                <div className="cross">
                  <span className="close btn" onClick={handleAdBanner}>
                    x
                  </span>
                </div>
                <img
                  id="advetiseImg"
                  src={clientData?.[0]?.BannerWeb}
                  alt="AD banner"
                />
              </div>
            )}
          </div>
        </div>
        <div className="spot-cover">
          <div className="container">
            <div className="">
              <div
                className="spot"
                style={{
                  display: !Object.values(displaySpot.current).includes(true)
                    ? "none"
                    : "",
                }}
              >
                <div className="spot-cover">
                  <div className="spot-content ">
                    <div
                      className={`${!(!!isLoading?.referenceProductData) ? "skeleton" : "row"}`}
                      style={{
                        height: !(!!isLoading?.referenceProductData)
                          ? customHeight(heightObj?.referenceProductData)
                          : "",
                      }}
                    >
                      {!!isLoading?.referenceProductData && renderSpotProduct}
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
                  <h1 className="text-center whitecl" style={{ display: (available === "block" || headerDisplay === "none") ? "block" : "none" }}>
                    Live Rate currently not available.
                  </h1>
                  <div className={`${!(!!isLoading?.maindata) ? "skeleton" : ""} `} style={{ display: Ratedisplay, height: !(!!isLoading?.maindata) ? customHeight(heightObj?.mainProduct) : "", }}>
                    <div className=" p-l-r" style={{ display: !(!!isLoading?.maindata) ? "none" : "block", }}>
                      <div className="main-product">
                        <div id="divHeader" className="divHeader" style={{ display: headerDisplay }}>
                          <table className="table">
                            <tbody>
                              <tr className="product-title-color">
                                <td className="mtw1 mprobor_l">
                                  <span>PRODUCT</span>
                                </td>
                                <td
                                  className="mtw2 mprobor_l"
                                  style={{ display: isbuy === "none" && islow === "none" ? "none" : "", }}>
                                  <span style={{ display: isbuy }}>BUY</span>
                                </td>
                                {/* <td className="mtw2 mprobor_l">
                                  <span>T-CHANGE</span>
                                </td> */}
                                <td
                                  className="mtw2 mprobor_l"
                                  style={{ display: issell == "none" && ishigh == "none" ? "none" : "", }}>
                                  <span style={{ display: issell }}>SELL</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="divProduct">
                          {!!isLoading?.maindata && renderMainProduct}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div
                className="future-cover"
                style={{
                  display: !Object.values(displayFutureRef.current).includes(
                    true
                  )
                    ? "none"
                    : "",
                }}
              >
                <div className="future">
                  <div className="spot-cover">
                    <div className="spot-content">
                      <div
                        className={`${!(!!isLoading?.referenceProductData)
                          ? "skeleton"
                          : "row"
                          }`}
                        style={{
                          height: !(!!isLoading?.referenceProductData)
                            ? customHeight(heightObj?.referenceProductData)
                            : "",
                        }}
                      >
                        {!!isLoading?.referenceProductData &&
                          renderFutureProduct}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="future-cover"
                style={{
                  display: !Object.values(displayNextRef.current).includes(true)
                    ? "none"
                    : "",
                }}
              >
                <div className="future">
                  <div className="spot-cover">
                    <div className="spot-content ">
                      <div
                        className={`${!(!!isLoading?.referenceProductData)
                          ? "skeleton"
                          : "row"
                          }`}
                        style={{
                          height: !(!!isLoading?.referenceProductData)
                            ? customHeight(heightObj?.referenceProductData)
                            : "",
                        }}
                      >
                        {!!isLoading?.referenceProductData && renderNextProduct}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bookingcvr botm">
        <div className="container">
          <div className="">
            <div className="">
              <div className="main">
                <h4>
                  <i className="fa fa-phone" /> BOOKING NUMBER
                </h4>
                <p className="">{clientData[0]?.BookingNo1}</p>
                {!!clientData[0]?.BookingNo2 &&
                  <>
                    <p>&nbsp; | &nbsp; </p>
                    <p className="">{clientData[0]?.BookingNo2}</p>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
