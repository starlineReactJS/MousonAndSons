import slLogo from "./images/sl.png";

export const DMNNMSTTG = {
    DMNNM: 'starlinebullion',
    DMN: 'co.in',
    ENDPNT: '/WebService/WebService.asmx/',
    SKTPRT: '10001',
};

export const apiUrl = `https://${DMNNMSTTG.DMNNM}.${DMNNMSTTG.DMN}${DMNNMSTTG.ENDPNT}`;
export const adminsocketurl = `https://${DMNNMSTTG.DMNNM}.${DMNNMSTTG.DMN}:${DMNNMSTTG.SKTPRT}`;
export const prjName = "mousonandsons";
export const clientId = 8;
export const footerData = {
    copyright: "©2024 Mousun And Sons. All Rights Reserved.",
    companyName: "Starline Solutions Pvt Ltd.",
    logo: slLogo,
    companyLink: "http://www.starlinetechno.net/",
};
export const androidUrl = "#";
export const iosUrl = "#";
export const economicCalendar = "https://www.mql5.com/en/economic-calendar/widget?mode=1&amp;";
export const hasCalculator = false;
export const hasKyc = false;
export const hasOtr = false;
export const hasLogin = true;
export const hasCoin = false;
