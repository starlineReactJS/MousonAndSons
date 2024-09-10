import React from 'react'

const Kyc = () => {
    return (
        <>
        <section className="kyc drive-cars-section">
        <center>

          <span
            id="lblmsg"
            style={{ color: "green", textAlign: "center", display: "none" }}
          />
        </center>
        <div className="container">
          <div>
            <p
              align="right"
              style={{ color: "#ff0000", fontFamily: "Comic Sans MS, Cursive" }}
            >

              Fields in * are mandatory 
            </p>
          </div>
          <div className="pad_bottom" id="frmkyc">
            <div className="title-field">Company Details</div>
            <fieldset className="scheduler-border">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Company Name:</label>
                    <input
                      name="txtCompany1"
                      type="text"
                      id="txtCompany1"
                      className="form-control"
                      placeholder="Company Name"
                    /> 
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Address:</label>
                    <textarea
                      name="txtAddress"
                      rows={2}
                      cols={20}
                      id="txtAddress"
                      className="form-control"
                      placeholder="Company Address"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="clearfix" />
            <legend className="title-field"> Proprietor/Partners</legend>
            <fieldset className="scheduler-border">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Name1<span style={{ color: "red" }}>*</span>:
                    </label>
                    <input
                      name="txtName1"
                      type="text"
                      id="txtName1"
                      className="form-control"
                      placeholder="Enter Name"
                    /> 
                    <span
                      id="RequiredFieldValidator1"
                      autopostback="false"
                      style={{ color: "Red", fontFamily: "Calibri", display: "none" }}
                    >
                      Name Required
                    </span> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Mobile1<span style={{ color: "red" }}>*</span>:
                    </label>
                    <input
                      name="txtMobile1"
                      type="text"
                      id="txtMobile1"
                      className="form-control"
                      placeholder="Enter Mobile"
                    /> 
                    <span
                      id="RequiredFieldValidator2"
                      autopostback="false"
                      style={{ color: "Red", fontFamily: "Calibri", display: "none" }}
                    >
                      Mobile Required
                    </span> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name2:</label>
                    <input
                      name="txtName2"
                      type="text"
                      id="txtName2"
                      className="form-control"
                      placeholder="Enter Name"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Mobile2:</label>
                    <input
                      name="txtMobile2"
                      type="text"
                      id="txtMobile2"
                      className="form-control"
                      placeholder="Enter Mobile"
                    /> 
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="clearfix" />
            <legend className="title-field"> Phone No</legend>
            <fieldset className="scheduler-border">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Office1:</label>
                    <input
                      name="txtOffice1"
                      type="text"
                      id="txtOffice1"
                      className="form-control"
                      placeholder="Enter Office Number"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Office2:</label>
                    <input
                      name="txtOffice2"
                      type="text"
                      id="txtOffice2"
                      className="form-control"
                      placeholder="Enter Office Number"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Residence:</label>
                    <input
                      name="txtResidence"
                      type="text"
                      id="txtResidence"
                      className="form-control"
                      placeholder="Enter Residence"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email:</label>
                    <input
                      name="txtEmail"
                      type="text"
                      id="txtEmail"
                      className="form-control"
                      placeholder="Enter Email"
                    /> 
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="clearfix" />
            <legend className="title-field"> Bank Details</legend>
            <fieldset className="scheduler-border">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name:</label>
                    <input
                      name="txtBankName"
                      type="text"
                      id="txtBankName"
                      className="form-control"
                      placeholder="Enter Name"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Branch:</label>
                    <input
                      name="txtBranch"
                      type="text"
                      id="txtBranch"
                      className="form-control"
                      placeholder="Enter Branch"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Account Number:</label>
                    <input
                      name="txtAccountNumber"
                      type="text"
                      id="txtAccountNumber"
                      className="form-control"
                      placeholder="Enter Account Number"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">IFSC Code:</label>
                    <input
                      name="txtIFSCCode"
                      type="text"
                      id="txtIFSCCode"
                      className="form-control"
                      placeholder="Enter IFSC Code"
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">GST No:</label>
                    <input
                      name="txtGSTNo"
                      type="text"
                      id="txtGSTNo"
                      className="form-control"
                      placeholder="Enter GST No."
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">PAN No:</label>
                    <input
                      name="txtPANNo"
                      type="text"
                      id="txtPANNo"
                      className="form-control"
                      placeholder="Enter PAN No."
                    /> 
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Reference:</label>
                    <input
                      name="txtReference"
                      type="text"
                      id="txtReference"
                      className="form-control"
                      placeholder="Enter Reference"
                    /> 
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="clearfix" />
            <legend className="title-field"> Documents Required</legend>
            <fieldset className="scheduler-border">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    1 Address Proof Scan Copy:
                  </label>
                  <input type="file" name="fuAddress" id="fuAddress" /> 
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">2. Pan No Scan Copy:</label>
                  <input type="file" name="fuPANNo" id="fuPANNo" /> 
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">3. GST No Scan Copy:</label>
                  <input type="file" name="fuGSTNo" id="fuGSTNo" /> 
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    4. Partnership Deed Copy:
                  </label>
                  <input type="file" name="fuPartnership" id="fuPartnership" /> 
                </div>
              </div>
            </fieldset>
            <div className="clearfix" />
            <div
              id="msgForSubmit"
              className="alert alert-success alert-autocloseable-success"
              style={{ display: "none" }}
            />
            <div
              style={{
                display: "block",
                textAlign: "center",
                float: "left",
                width: "100%"
              }}
            >
              <input
                type="submit"
                name="btnKycRegister"
                defaultValue="SUBMIT"
                onclick='javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("btnKycRegister", "", true, "", "", false, false))'
                id="btnKycRegister"
                className="kyc-btn pull-right"
              />
            </div>
          </div>
        </div>
      </section>
      
        </>
    )
}

export default Kyc
