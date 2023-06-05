import React, { useState } from "react";
import LeftSideNamNB from "../register/common/LeftSideNamNB";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
// import { toast } from "react-toastify";

// import { useCookies } from "react-cookie";

function Login() {
  const navigate = useNavigate();
  // const [cookies, setCookie] = useCookies(["accessToken"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const register = () => {
    navigate("/register");
  };

  const forgotPassword = () => {
    navigate("/forgotPassword");
  };

  const exitLogin = () => {
    navigate("/");
  };

  const login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/auth/login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.setItem("accessToken", result.accessToken);
        // setCookie("accessToken", result.accessToken, {
        //   path: "/",
        //   maxAge: 3600,
        //   httpOnly: true,
        // });
        // alert(cookies.accessToken);
        const role = jwt_decode(result.accessToken);
        if (role.roles === "[ROLE_CUSTOMER]") {
          navigate("/main");
        }
        if (role.roles === "[ROLE_ADMIN]") {
          navigate("/chart");
        }
        if (role.roles === "[ROLE_RECEPTIONIST]") {
          navigate("/booking-management");
        }
        if (role.roles === "[ROLE_EMPLOYEE]") {
          navigate("/main");
        }
      })
      .catch((error) => {
        // toast.error("Tên đăng nhập hoặc mật khẩu không đúng!", {
        //   position: "top-center",
        //   autoClose: 1200,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
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
              <div className="col-lg-7 col-md-7" style={{ marginTop: "90px" }}>
                <h3 className="mb-30" style={{ color: "#d19f68" }}>
                  {" "}
                  Đăng nhập{" "}
                </h3>{" "}
                <form action="#">
                  <div className="mt-10">
                    <input
                      type="text"
                      name="username"
                      placeholder="Tên đăng nhập"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Tên đăng nhập";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10">
                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Mật khẩu";
                      }}
                      required
                      className="single-input-namnb6"
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="button-group-area mt-10">
                    <button
                      type="button"
                      onClick={forgotPassword}
                      className="genric-btn link-border circle namnb6"
                    >
                      {" "}
                      Quên mật khẩu{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="mt-10" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div className="col-6">
                        <button
                          style={{ width: "100%" }}
                          type="button"
                          className="button boxed-btn namnb6_1"
                          onClick={exitLogin}
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
                          onClick={login}
                        >
                          {" "}
                          Đăng nhập{" "}
                        </button>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </form>{" "}
                <div
                  className="button-group-area mt-10"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span
                    style={{
                      fontSize: ".8em",
                      color: "#d19f68",
                      fontWeight: "500",
                      paddingTop: "22px",
                      paddingRight: "10px",
                    }}
                  >
                    {" "}
                    Bạn chưa có tài khoản ?{" "}
                  </span>{" "}
                  <button
                    type="button"
                    onClick={register}
                    className="genric-btn link-border circle namnb6"
                  >
                    Đăng ký ngay{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <LeftSideNamNB />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}

export default Login;
