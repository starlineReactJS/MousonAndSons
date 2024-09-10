import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import pako from "pako";
import { customHeight, usePrevious, usePreviousReference } from "../../utils";
// import DateClock from "../../components/DateClock";
import { Skeleton } from "../../components/Skeleton";
import "../liverate/liverate.css";
import { SocketContext } from "../../App";

export default function Liverate() {
  let socketContext = useContext(SocketContext);
  const [maindata, setMainData] = useState(null);
  // console.log("🚀 ~ Liverate ~ maindata:", maindata);
  const [referenceProductData, setReferenceProductData] = useState([]);
  // console.log('clientdetails');
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

    socketContext.on('mainProducts', function (data) {
      try {
        if (!!data) {
          var strLiveRates = pako.inflate(data, { to: 'string' });
          var mainproducts = JSON.parse(strLiveRates);
          if (!!mainproducts) {
            // dispatch(setMainProduct(mainproducts));
            setMainData([...mainproducts]);
          } else {
            setMainData([]);
          }
        } else {
          setMainData([]);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socketContext.on('referanceProducts', function (data) {
      try {
        if (!!data) {
          var referance = pako.inflate(data, { to: 'string' });
          var referanceproducts = JSON.parse(referance);
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

    return () => {
      socketContext.off("mainProducts");
      socketContext.off("referanceProducts");
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
    if (!!maindata && data?.isRate === true && maindata?.length > 0) {
      Ratedisplay = 'block';
      available = 'none';
      if (data?.isBuy === true) {
        isbuy = '';
      } else {
        isbuy = 'none';
      }
      if (data?.isSell === true) {
        issell = '';
      } else {
        issell = 'none';
      }
      if (data?.isHigh === true) {
        ishigh = '';
      } else {
        ishigh = 'none';
      }
      if (data?.isLow === true) {
        islow = '';
      } else {
        islow = 'none';
      }
    } else if ((!!maindata && maindata?.length < 1) || !data?.isRate) {
      Ratedisplay = 'none';
      available = 'block';
    }
  }
  // Main product
  useEffect(() => {
    // console.log("header :", headerDisplay);
  }, [headerDisplay]);
  const renderMainProduct = useMemo(() => {
    if (!previousMainProduct) return null;

    if (!!maindata) {
      let checked1 = false;
      let checked2 = false;
      return maindata?.map((item, index) => {


        if ((item?.src === "gold" || item?.src === "silver")) {
          // console.log("productType: ", productType, item);
          const bgAsk = backgroundColorClass(
            item?.ask,
            previousMainProduct[index]?.ask
          );
          const bgBid = backgroundColorClass(
            item?.bid,
            previousMainProduct[index]?.bid
          );
          console.log(item)
          return (
            <div className="mprate" key={index}>
              <table>
                <tbody>
                  <tr className="ligh-white">
                    <td className="mtw1 mprobor_l">
                      <div
                        className={`main-product-cover ${(isbuy !== "none" || issell !== "none") &&
                          "border_right"
                          }`}
                      >
                        <h3>{item?.name}</h3>
                      </div>
                    </td>
                    <td
                      className="mtw2 mprobor_l"
                      style={{
                        display:
                          isbuy == "none" && islow == "none" ? "none" : "",
                      }}
                    >
                      <div className="mn-rate-cover">
                        <span
                          className={`bgm ${bgBid}`}
                          style={{ display: isbuy }}
                        >
                          {item?.bid}
                        </span>
                        <span
                          className="bgs hl color-l"
                          style={{ display: islow }}
                        >
                          L : {item?.low}
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
                          issell == "none" && ishigh == "none" ? "none" : "",
                      }}
                    >
                      <div className="mn-rate-cover">
                        <span
                          className={`bgm ${bgAsk}`}
                          style={{ display: issell }}
                        >
                          {item?.ask}
                        </span>
                        <span
                          className="bgs hl color-g "
                          style={{ display: ishigh }}
                        >
                          H : {item?.high}
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

  //Future product
  const renderFutureProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;

    if (!!referenceProductData) {
      return referenceProductData?.map((item, index) => {
        // const referenceItem = referenceData[index];
        if (item?.symbol === "gold" || item?.symbol === "silver") {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.source === item?.symbol)
            : null;
          if (!(!!referenceItem)) {
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
            referenceItem?.source === "gold" ||
            referenceItem?.source === "silver"
          ) {
            Symbol_Name = referenceItem?.name;
          }

          return (
            <div className="col-md-6 col-sm-12 fwidth-new" key={index}>
              <div
                className="spot-rate-cover"
                key={Symbol_Name}
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
            ? referenceData?.find((val) => val?.source === item?.symbol)
            : null;
          if (!(!!referenceItem)) {
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
            referenceItem?.source === "goldnext" ||
            referenceItem?.source === "silvernext"
          ) {
            Symbol_Name = referenceItem?.name;
          }

          return (
            <div className="col-md-6 col-sm-12 fwidth-new" key={index}>
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
          );}
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
            ? referenceData?.find((val) => val?.source === item?.symbol)
            : null;
          if (!(!!referenceItem)) {
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
            referenceItem?.source === "XAUUSD" ||
            referenceItem?.source === "XAGUSD" ||
            referenceItem?.source === "INRSpot"
          ) {
            Symbol_Name = referenceItem?.name;
          }

          return (
            <div className="col-md-4 col-sm-12" key={index}>
              <div
                className="spot-rate-cover"
                key={Symbol_Name}
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
      })}
  }, [referenceProductData]);

  const handleAdBanner = () => {
    setAdBannerDisplay("none");
  };

  // useEffect(() => {
  //   if (productType === 1) {
  //     if (!(maindata?.map(item => item?.pt).includes(1))) {
  //       setHeaderDisplay("none");
  //     } else {
  //       setHeaderDisplay("block");
  //     }
  //   }
  //   else {
  //     if (!(maindata?.map(item => item?.pt).includes(2))) {
  //       setHeaderDisplay("none");

  //     } else {
  //       setHeaderDisplay("block");

  //     }
  //   }

  // }, [maindata]);

  // console.log("header display", headerDisplay, productType);
  return (
    <div className="gold-spot-cover main-cover">
      <div className="">
        <div className="marquee-cover">
          <div className="">
            {!!clientData?.[0]?.bannerWeb && (
              <div className="add-banner" style={{ display: adBannerDisplay }}>
                <div className="cross">
                  <span className="close btn" onClick={handleAdBanner}>
                    x
                  </span>
                </div>
                <img
                  id="advetiseImg"
                  src={clientData?.[0]?.bannerWeb}
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
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h1
                    className="text-center whitecl"
                    style={{ display: available }}
                  >
                    Live Rate currently not available.
                  </h1>
                  <div
                    className={`${!(!!isLoading?.maindata) ? "skeleton" : ""} `}
                    style={{
                      display: Ratedisplay,
                      height: !(!!isLoading?.maindata)
                        ? customHeight(heightObj?.mainProduct)
                        : "",
                    }}
                  >
                    <div
                      className=" p-l-r"
                      style={{
                        display: !(!!isLoading?.maindata) ? "none" : "block",
                      }}
                    >
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
                                  style={{
                                    display: isbuy === "none" && islow === "none" ? "none" : "",
                                  }}
                                >
                                  <span style={{ display: isbuy }}>BUY</span>
                                </td>
                                {/* <td className="mtw2 mprobor_l">
                                  <span>T-CHANGE</span>
                                </td> */}
                                <td
                                  className="mtw2 mprobor_l"
                                  style={{
                                    display:
                                      issell == "none" && ishigh == "none"
                                        ? "none"
                                        : "",
                                  }}
                                >
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
                <p className="">{clientData[0]?.number1}</p>
                <p>&nbsp; | &nbsp; </p>
                <p className="">{clientData[0]?.number2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
