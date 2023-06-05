import React, { useState } from "react";
import LeftSideNamNB from "./common/LeftSideNamNB";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(8, "Tên đăng nhập phải có ít nhất 8 ký tự"),
    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Xác nhận mật khẩu không khớp"
    ),
    fullname: Yup.string().required("Vui lòng nhập đầy đủ họ tên"),
    email: Yup.string()
      .required("Vui lòng nhập đầy đủ email")
      .email("Email không hợp lệ"),
    phoneNumber: Yup.string().matches(
      /^[0-9]{10,11}$/,
      "Số điện thoại phải có từ 10 đến 11 ký tự"
    ),
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    email: "",
    phoneNumber: "",
  });

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    email: "",
    phoneNumber: "",
  });

  // const setParams = (event) => {
  //   const { name, value } = event.target;
  //   if (name === "username") {
  //     setUsername(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   } else if (name === "confirmPassword") {
  //     setConfirmPassword(value);
  //   } else if (name === "fullname") {
  //     setFullname(value);
  //   } else if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "phoneNumber") {
  //     setPhoneNumber(value);
  //   }
  // };

  const setParams = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    // Clear username error when input changes
    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
    if (errors.fullname) {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
    }
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    if (errors.phoneNumber) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
    }
  };

  const register = async () => {
    try {
      // Validate form values using Yup
      await validationSchema.validate(formValues, { abortEarly: false });

      // Form is valid, continue with your logic
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        username: formValues.username,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        fullname: formValues.fullname,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:8080/register", requestOptions)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorBody) => {
              throw new Error(errorBody.error);
            });
          }
          return response.text();
        })
        .then((result) => {
          toast.success("Đăng ký tài khoản thành công!");
          // alert("Đăng ký tài khoản thành công!");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message); // Log the error message sent from the backend
        });
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((fieldError) => {
        fieldErrors[fieldError.path] = fieldError.message;
      });
      setErrors(fieldErrors);
    }
  };

  const exitRegister = () => {
    navigate("/login");
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
              <div className="col-lg-7 col-md-7" style={{ marginTop: "60px" }}>
                <h3 className="mb-30" style={{ color: "#d19f68" }}>
                  Đăng ký tài khoản
                </h3>
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
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
                        {errors.username && (
                          <p style={{ color: "red" }}>{errors.username}</p>
                        )}
                      </div>
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
                        {errors.password && (
                          <p style={{ color: "red" }}>{errors.password}</p>
                        )}
                      </div>
                      <div className="mt-10">
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Nhập lại mật khẩu"
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                          onBlur={(e) => {
                            e.target.placeholder = "Nhập lại mật khẩu";
                          }}
                          required
                          className="single-input-namnb6"
                          onChange={setParams}
                        />
                        {errors.confirmPassword && (
                          <p style={{ color: "red" }}>
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="mt-10">
                        <input
                          type="text"
                          name="fullname"
                          placeholder="Họ và tên"
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                          onBlur={(e) => {
                            e.target.placeholder = "Họ và tên";
                          }}
                          required
                          className="single-input-namnb6"
                          onChange={setParams}
                        />
                        {errors.fullname && (
                          <p style={{ color: "red" }}>{errors.fullname}</p>
                        )}
                      </div>
                      <div className="mt-10">
                        <input
                          type="email"
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
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </div>
                      <div className="mt-10">
                        <input
                          type="number"
                          name="phoneNumber"
                          placeholder="Số điện thoại"
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                          onBlur={(e) => {
                            e.target.placeholder = "Số điện thoại";
                          }}
                          required
                          className="single-input-namnb6"
                          onChange={setParams}
                        />
                        {errors.phoneNumber && (
                          <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10" style={{ marginTop: "20px" }}>
                    <div className="row">
                      <div
                        className="col-6"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          style={{ width: "70%" }}
                          type="button"
                          className="button boxed-btn namnb6_1"
                          onClick={exitRegister}
                        >
                          Hủy
                        </button>
                      </div>
                      <div
                        className="col-6"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          style={{ width: "70%" }}
                          type="button"
                          className="button boxed-btn namnb6_2"
                          onClick={register}
                        >
                          Đăng ký
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

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
                    Bạn đã có tài khoản?
                  </span>
                  <button
                    type="button"
                    onClick={exitRegister}
                    className="genric-btn link-border circle namnb6"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
              <LeftSideNamNB />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
