import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideNamNB from "./common/LeftSideNamNB";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);

  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  const exitForgotPassword = () => {
    navigate("/login");
  };

  const sendEmail = () => {
    setShow(true);
    var myHeaders = new Headers();

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/forgotPassword?email=${email}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        navigate("/confirm-otp", { state: { email } });
      })
      .catch((error) => {
        toast.error("Email này chưa được đăng ký!");
        setShow(false);
      });
  };

  return (
    <main
      style={{
        backgroundImage: "url('assets/img/hero/h1_hero.png')",
        backgroundSize: "cover",
      }}
    >
      {show && (
        <div id="preloader-active">
          <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
              <div className="preloader-circle"></div>
              <div className="preloader-img pere-text">
                <img src="assets/img/logo/loder.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
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
                  Quên mật khẩu{" "}
                </h3>{" "}
                <h5 className="mb-30" style={{ color: "#d19f68" }}>
                  {" "}
                  Nhập địa chỉ email mà bạn đã đăng ký tài khoản tại Youareright
                  để đổi mật khẩu!{" "}
                </h5>{" "}
                <form action="#">
                  <div className="mt-10">
                    <input
                      type="text"
                      name="email"
                      placeholder="Địa chỉ email"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Địa chỉ email";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div className="col-6">
                        <button
                          style={{ width: "100%" }}
                          type="button"
                          className="button boxed-btn namnb6_1"
                          onClick={exitForgotPassword}
                        >
                          {" "}
                          Hủy{" "}
                        </button>{" "}
                      </div>{" "}
                      <div className="col-6">
                        <button
                          style={{ width: "100%" }}
                          type="button"
                          className="button boxed-btn namnb6_2"
                          onClick={sendEmail}
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

export default ForgotPassword;
