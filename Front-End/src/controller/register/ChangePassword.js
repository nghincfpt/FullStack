import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import Header from "./common/Header";

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const accessToken = localStorage.getItem("accessToken");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const changePassword = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var raw = JSON.stringify({
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/changePassword", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.removeItem("accessToken");
        toast.success("Đổi mật khẩu thành công!");
        navigate("/login");
      })
      .catch((error) => {
        if (error == "Error: 401") {
          localStorage.removeItem("accessToken");
          navigate("/login");
          toast.error("Hết phiên đăng nhập!");
        }
        toast.error(error);
      });
  };

  const exit = () => {
    navigate("/");
  };

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    }
  }, []);

  return (
    <main>
      <div>
        <Header />
      </div>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70 text-center">
                  <h2>Đổi mật khẩu</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="whole-wrap"
        style={{
          backgroundImage: "url('assets/img/gallery/about-shape.png')",
          backgroundSize: "cover",
        }}
      >
        <div
          className="container box_1170"
          style={{
            width: "50%",
            border: "2px solid brown",
            margin: "20px auto",
          }}
        >
          <div className="section-top-border" style={{ height: "60vh" }}>
            <div
              className="row"
              style={{ display: "flex", height: "100%", alignItems: "center" }}
            >
              <div className="col-lg-12 col-md-12">
                <form action="#">
                  <div className="mt-10">
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Mật khẩu cũ"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Mật khẩu cũ";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                      style={{ border: "1px solid #e5e6e9" }}
                    />
                  </div>{" "}
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
                      style={{ border: "1px solid #e5e6e9" }}
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
                      style={{ border: "1px solid #e5e6e9" }}
                    />
                  </div>{" "}
                  <div className="mt-10" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div className="col-6">
                        <button
                          style={{ width: "100%" }}
                          type="submit"
                          className="button boxed-btn namnb6_1"
                          onClick={exit}
                        >
                          {" "}
                          Hủy{" "}
                        </button>{" "}
                      </div>
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
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}

export default ChangePassword;
