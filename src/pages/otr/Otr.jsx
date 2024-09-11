import React, { useEffect, useState } from 'react';
import './otr.css';
import logo from '../../images/logo.png';
import { OTRDetails } from '../../Api';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../utils';
import { prjName } from '../../config';

export default function Otr({ isLoginDone }) {
    let toast = Toast();
    let navigate = useNavigate();

    const otrObj = {
        name: "",
        firmname: "",
        mobile: "",
        city: "",
    };
    const [otrData, setOtrData] = useState(otrObj);

    let otrFetch = localStorage.getItem('otrDetails');
    otrFetch = JSON.parse(otrFetch);

    const validateFn = (value) => {
        let regex = /^\d{10}$/;
        return regex.test(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFn(otrData?.mobile)) {
            alert("Enter appropriate Number");
            return;
        }
        let dataObj = {
            "user": prjName,
            "name": otrData?.name,
            "firmname": otrData?.firmname,
            "mobile": otrData?.mobile,
            "city": otrData?.city
        };
        const otrDetails = await OTRDetails(dataObj);
        let { code, message } = otrDetails;
        if (code === 200) {
            window.location.href = "/";
            delete dataObj.user;
            localStorage.setItem('otrDetails', JSON.stringify(dataObj));
            clearFields();
        } else {
            toast.error(message);
        }
    };

    const clearFields = () => {
        setOtrData(otrObj);
    };

    const onChangeFn = (field, value) => {
        let tempOtrData = { ...otrData };
        tempOtrData[field] = value;
        setOtrData(tempOtrData);
    };

    return (
        <div id="hdr" >
            <div className="" >
                <div className="bg-clr">
                    <div className="text-center lshide otrcvr" > <img style={{ width: '230px' }} src={logo} /></div>
                    <div className="col-md-12">
                        <div className="registrationfont">ONE <span>TIME</span> REGISTRATION</div>
                    </div>

                    <div className="otr-maon-cover">
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="Name" required name="name" id="txtotrName" fdprocessedid="eny25"
                                        value={otrData?.name}
                                        onChange={(e) => onChangeFn("name", e.target.value)} />
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="Firm Name" required name="usernamesignup" id="txtotrfirmName" fdprocessedid="cmou9c"
                                        value={otrData?.firmname}
                                        onChange={(e) => onChangeFn("firmname", e.target.value)} />
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" maxLength={10} placeholder="Mobile Number" required name="usernamesignup" id="txtotrmobNumber" fdprocessedid="3j8sz"
                                        value={otrData?.mobile}
                                        onChange={(e) => {
                                            const restrictDot = e.target.value.replace(/\D/g, '');
                                            onChangeFn("mobile", restrictDot);
                                        }} />
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="City" required name="usernamesignup" id="txtotrCity" fdprocessedid="1g9khb"
                                        value={otrData?.city}
                                        onChange={(e) => onChangeFn("city", e.target.value)} />
                                </p>
                            </div>
                            <div className="signin button text-center">
                                <button type="submit" className="btn_fill1" fdprocessedid="t5pvks">Register</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    );
}
