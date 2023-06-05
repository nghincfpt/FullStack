import React, { useState } from "react";
import LeftSideNamNB from "./common/LeftSideNamNB";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ConfirmOtp() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "otp") {
      setOtp(value);
    }
  };

  const sendOtp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      otp: otp,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/confirmOtp", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        navigate("/forgot-changePassword", { state: { email } });
      })
      .catch((error) => {
        toast.error("Mã OTP không chính xác!");
      });
  };

  return (
    <main
      style={{
        backgroundImage: "url('assets/img/hero/h1_hero.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="whole-wrap">
        <div className="container box_1170">
          <div className="section-top-border" style={{ height: "100vh" }}>
            <div
              className="row"
              style={{ display: "flex", height: "100%", alignItems: "center" }}
            >
              <div className="col-lg-7 col-md-7">
                <h3 className="mb-30" style={{ color: "#d19f68" }}>
                  {" "}
                  Xác nhận OTP{" "}
                </h3>{" "}
                <h5 className="mb-30" style={{ color: "#d19f68" }}>
                  {" "}
                  Mã OTP đã được gửi về địa chỉ email {email}. Kiểm tra Hộp thư
                  đến ngay!{" "}
                </h5>{" "}
                <form action="#">
                  <div className="mt-10">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Mã OTP"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Mã OTP";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div className="col-6"></div>{" "}
                      <div className="col-6">
                        <button
                          style={{ width: "100%" }}
                          type="button"
                          className="button boxed-btn namnb6_2"
                          onClick={sendOtp}
                        >
                          {" "}
                          Tiếp tục{" "}
                        </button>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </form>{" "}
              </div>{" "}
              <LeftSideNamNB />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}

export default ConfirmOtp;
