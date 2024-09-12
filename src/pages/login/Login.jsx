import React, { useState } from 'react';
import './login.css';
import logo from '../../images/logo.png';
// import { post } from '../../Api Methods';
import { clientId, prjName } from '../../config';
import { Toast } from '../../utils';

export default function Login() {
    let toast = Toast();

    const loginObj = {
        name: "",
        password: "",
    };
    const [loginData, setloginData] = useState(loginObj);
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

    let loginFetch = localStorage.getItem('loginDetails');
    // eslint-disable-next-line no-unused-vars
    loginFetch = JSON.parse(loginFetch);

    const validateFn = (value) => {
        let regex = /^\d{10}$/;
        return regex.test(value);
    };

    const loginFn = async () => {
        if (!disableSubmitBtn) {
            setDisableSubmitBtn(true);
            var Mac = parseInt(Math.random() * 1000000);
            let Obj = {};
            Obj = {
                loginid: Number(loginData?.name),
                Password: loginData?.password,
                ClientId: clientId,
                Firmname: prjName,
                Mac: Mac,
            };

            fetch(`https://starlinebullion.co.in/webService/Terminal.asmx/GetLoginDetailsNew`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
                }),

                body: "{'Obj':'" + JSON.stringify(Obj) + "'}",
            })
                .then(response => response.json())
                .then(responseJson => {
                    let parsedResponse = JSON.parse(responseJson?.d);
                    if (Number(parsedResponse?.ReturnCode) === 200) {
                        window.location.href = "/";
                        localStorage.setItem('loginDetails', JSON.stringify(Obj));
                        clearFields();
                        toast.success(`${parsedResponse?.ReturnMsg}`);
                    } else {
                        toast.error(`${parsedResponse?.ReturnMsg}`);
                    }
                    setDisableSubmitBtn(false);
                }).catch(err => {
                    toast.error(`${err}`);
                    setDisableSubmitBtn(false);
                });
        }
    };

    const handleSubmit = async (e) => {
        if (e !== true) {
            e.preventDefault();
        }
        if (loginData?.name === "") {
            toast.error("Enter Name");
            return;
        } else if (loginData?.password === "") {
            toast.error("Enter Password");
            return;
        }
        await loginFn();
    };

    const clearFields = () => {
        setloginData(loginObj);
    };

    const onChangeFn = (field, value) => {
        let temploginData = { ...loginData };
        temploginData[field] = value;
        setloginData(temploginData);
    };

    return (
        <div id="hdr" >
            <div className="" >
                <div className="bg-clr">
                    <div className="text-center lshide logincvr" >
                        <img style={{ width: '150px' }} src={logo} alt='Logo' />
                    </div>
                    <div className="col-md-12">
                        <div className="registrationfont">LOGIN</div>
                    </div>
                    <div className="login-maon-cover">
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="Id" required name="name" id="txtloginName" fdprocessedid="eny25"
                                        value={loginData?.name}
                                        onChange={(e) => onChangeFn("name", e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit(true);
                                            }
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="Password" required name="usernamesignup" id="txtloginfirmName" fdprocessedid="cmou9c"
                                        value={loginData?.password}
                                        onChange={(e) => onChangeFn("password", e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit(true);
                                            }
                                        }}
                                    />
                                </p>
                            </div>
                            {/* <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" maxLength={10} placeholder="Mobile Number" required name="usernamesignup" id="txtloginmobNumber" fdprocessedid="3j8sz"
                                        value={loginData?.mobile}
                                        onChange={(e) => {
                                            const restrictDot = e.target.value.replace(/\D/g, '');
                                            onChangeFn("mobile", restrictDot);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                </p>
                            </div> */}
                            {/* <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="City" required name="usernamesignup" id="txtloginCity" fdprocessedid="1g9khb"
                                        value={loginData?.city}
                                        onChange={(e) => onChangeFn("city", e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                </p>
                            </div> */}
                            <div className="signin button text-center">
                                <button type="submit" className="btn_fill1" fdprocessedid="t5pvks"
                                    disabled={disableSubmitBtn}
                                    style={{ backgroundColor: disableSubmitBtn ? "gray" : "", cursor: disableSubmitBtn ? "not-allowed" : "" }}
                                >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
