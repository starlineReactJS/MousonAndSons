import React, { useCallback, useEffect, useState } from 'react';
import { bankDetails } from '../../Api';
import { Skeleton } from '../../components/Skeleton';
import { customHeight } from '../../utils';

export default function Bank() {
    const [bankContent, setBankContent] = useState([]);
    const [noData, setNoData] = useState(false);

    let heightObj = {
        bankContent: "300px",
    };

    const getBankData = useCallback(async () => {
        const bankData = await bankDetails();
        if (!!bankData?.data) {
            const bankRes = bankData?.data;
            if (bankRes?.length === 0 || !(!!bankRes)) {
                setNoData(true);
            }
            setBankContent(bankRes);
        } else {
            setNoData(true);
            setBankContent([]);
        }
    }, []);

    useEffect(() => {
        getBankData();
    }, []);

    let isLoading = Skeleton({ dependency: { bankContent: bankContent } });

    return (
        <div className="main-cover">
            <div className="container a1">
                <div className="bnk-cvr">
                    <div className="bank-cover">
                        <div className="container a1">
                            <div className="col-md-12">
                                <div className="header">
                                    <div className="title-wth title-name">BANK DETAILS</div>
                                </div>
                            </div>
                            <div className="col-md-12 a1">
                                <div className={`${(!(!!isLoading?.bankContent) && !(!!noData)) ? "skeleton" : ""}`} id="DivBankRecord" style={{ height: (!(!!isLoading?.bankContent) && !(!!noData)) ? customHeight(heightObj?.bankContent) : "" }}>
                                    <div className="row a1" style={{ display: (!(!!isLoading?.bankContent) && !(!!noData)) ? "none" : "block" }}>
                                        <div id="DivBankRecord">
                                            {(!!bankContent && bankContent?.length > 0) ?
                                                bankContent?.map((data, index) => (
                                                    <div className={`col-md-6 col-sm-6 col-xs-12 ${bankContent?.length < 2 ? "col-md-offset-3 col-sm-offset-3" : ""} mar-btm`} key={`${data.accountNumber}_${index}`}>
                                                        <div className="bnk-main-cv">
                                                            <div className='bank-img'>
                                                                <img src={data.bankLogoUrl} alt="" className='img-thumbnail' loading="lazy" />
                                                            </div>
                                                            <div className='tg-contentbox'>
                                                                <table width="100%" border="0" cellSpacing="0" cellPadding="0" className="bankd">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="ban1">BANK NAME
                                                                                <span className="b_bott">::</span>
                                                                            </td>
                                                                            <td className="ban3"> {data.bankName}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="ban1">ACCOUNT NAME
                                                                                <span className="b_bott">::</span>
                                                                            </td>
                                                                            <td className="ban3">{data.accountName} </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="ban1">ACCOUNT NUMBER
                                                                                <span className="b_bott">::</span>
                                                                            </td>
                                                                            <td className="ban3">{data.accountNumber}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="ban1">IFSC CODE
                                                                                <span className="b_bott">::</span>
                                                                            </td>
                                                                            <td className="ban3">{data.ifscCode}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="ban1">BRANCH NAME
                                                                                <span className="b_bott">::</span>
                                                                            </td>
                                                                            <td className="ban3"> {data.branchName}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                : (!!noData && (!(!!bankContent) || bankContent?.length === 0)) &&
                                                <h1 className='text-center' style={{color: "rgb(215, 154, 63)",fontWeight: "600",width: "100%",float: "left"}}>No Updates Found</h1>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-6 col-sm-6 col-xs-12 responsive-bank">
                <div><img src="../Bankimages/LVB.jpg" alt="..." className="img-thumbnail"></div>
                <div className="tg-contentbox">
                    <table width="100%" border="0" cellSpacing="0" cellpadding="0" className="bankd">
                        <tbody>
                            <tr>
                                <td className="ban1">Bank Name <span className="b_bott">::</span></td>
                                <td className="ban3"> Bank Of Baroda</td>
                            </tr>
                            <tr>
                                <td className="ban1">Account Name <span className="b_bott">::</span></td>
                                <td className="ban3"> Adinath Jewellers</td>
                            </tr>
                            <tr>
                                <td className="ban1">ACCOUNT NUMBER<span className="b_bott">::</span></td>
                                <td className="ban3">0476385000000030</td>
                            </tr>
                            <tr>
                                <td className="ban1">IFSC Code <span className="b_bott">::</span></td>
                                <td className="ban3">BARB0MANRAJ</td>
                            </tr>
                            <tr>
                                <td className="ban1">Branch Name <span className="b_bott">::</span></td>
                                <td className="ban3">Mandvi Chowk, Rajkot</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> */}
            </div>
        </div >
    )
}
