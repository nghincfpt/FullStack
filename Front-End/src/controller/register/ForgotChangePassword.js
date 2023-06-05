import React, { useState, useEffect } from "react";
import LeftSideNamNB from "../register/common/LeftSideNamNB";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotChangePassword() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const changePassword = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/forgot-changePassword", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        toast.success("Đổi mật khẩu thành công!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Đổi mật khẩu thất bại!");
      });
  };

  useEffect(() => {
    if (email == null) {
      navigate("/login");
    }
  }, []);
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
                  Đổi mật khẩu{" "}
                </h3>{" "}
                <form action="#">
                  <div className="mt-10">
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Mật khẩu mới"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Mật khẩu mới";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Nhập lại mật khẩu mới"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Nhập lại mật khẩu mới";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <button
                          style={{ width: "100%" }}
                          type="button"
                          className="button boxed-btn namnb6_2"
                          onClick={changePassword}
                        >
                          {" "}
                          Đổi mật khẩu{" "}
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

export default ForgotChangePassword;
