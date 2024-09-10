import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
// import './css/bootstrap-theme.min.css';
// import './css/bootstrap.min.css';
// import './css/bootstrap-theme.css';
import './css/bootstrap.css';
import './css/font-awesome.min.css';
import BaseLayout from "./Layout";
import About from "./pages/about/About";
import Liverate from "./pages/liverate/Liverate";
import Update from "./pages/updates/Update";
import Bank from "./pages/bank/Bank";
import Calendar from "./pages/calendar/Calendar";
import Feedback from "./pages/feedback/Feedback";
import NotFoundPage from "./pages/NotFoundPage";
// import kyc from "./pages/Kyc/Kyc";
import Otr from "./pages/otr/Otr";
import './css/Responsive.css';
import './css/style.css';
import '../src/pages/otr/otr.css';
import { adminsocketurl, hasCalculator, hasCoin, hasKyc, hasOtr, prjName } from "./config";
import Jewellery from "./pages/jewellery";
// import Kyc from "./pages/Kyc/Kyc";

let SocketContext = createContext();

function App() {
  const adminsocket = io(adminsocketurl, {});
  adminsocket.on('connect', function () {
    adminsocket.emit('client', prjName);
  });

  //////////////////////////Don't delete OTR code commented below///////////////////////////////

  const [isLoginSubmit, setIsLoginSubmit] = useState(false);

  let otrFetch = localStorage.getItem('otrDetails');
  otrFetch = JSON.parse(otrFetch);

  const onCallSubmit = (data) => {
    if (!!data) {
      setIsLoginSubmit(true);
    }
  };

  return (
    <SocketContext.Provider value={adminsocket}>
      <BrowserRouter>
        {
          (!!hasOtr && !(!!otrFetch) && !(!!isLoginSubmit)) ?
            <Otr isLoginDone={(data) => onCallSubmit(data)} />
            :
            <Routes>
              <Route path="/" element={<BaseLayout />}>
                <Route path="/" element={<Liverate />} />
                <Route path="/about" element={<About />} />
                <Route path="/jewellery" element={<Jewellery />} />
                <Route path="/update" element={<Update />} />
                <Route path="/bankDetail" element={<Bank />} />
                {/* {!!hasCalculator &&
                    <Route path="/calculator" element={<Calculator />} />
                  } */}
                {/* {!!hasKyc &&
                    <Route path="/kyc" element={<Kyc />} />
                  } */}
                {/* {!!hasCoin &&
                    <Route path="/coin" element={<Coin />} />
                  } */}
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/feedback" element={<Feedback />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        }
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export { SocketContext };
export default App;
