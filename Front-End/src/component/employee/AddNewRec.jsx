import axios from "axios";
import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebase/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../common/admin/sidebar";

const initFormValue = {
  dateOfBirth: "",
  address: "",
  gender: "",
  branchId: "",
}

const isEmtyValue = (value) => {
  return !value || value.trim().length < 1;
}

function AddNewEmployee(props) {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }
  console.log(formValue)
  const ValidateForm = () => {
    const error = {};

    if (isEmtyValue(formValue.address)) {
      error["address"] = "Trường này không được trống"
    }

    if (isEmtyValue(formValue.dateOfBirth)) {
      error["dateOfBirth"] = "Trường này không được trống";
    }

    if (isEmtyValue(formValue.gender)) {
      error["gender"] = "Vui lòng chọn giới tính";
    }


    if (isEmtyValue(formValue.branchId)) {
      error["branchId"] = "Vui lòng chọn chi nhánh";
    }

    setFormError(error);

    return Object.keys(error).length === 0;
  }
  const [imageSrc, setImageSrc] = useState("./assets/img/avatar/avatar.jpg");
  const [branch, setBranch] = useState([]);
  const [people, setPeople] = useState([]);
  const [imgUpload, setImgUpload] = useState("");

  const nagative = useNavigate();
  const [name, setName] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  function onChange(data) {
    let name = people.find((item) => item.userId == data);
    setName(name.fullName);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    formData.avatar = imgUpload;
    console.log(formData);
    if (ValidateForm()) {
      axios
        .post("http://localhost:8080/api/employee/createRec", formData, {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Methods': 'POST',
            "Authorization": "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          nagative("/employee");
          toast.success("Thêm mới thành công");

        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("form invalue", formValue);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imgDataUrl = reader.result;
      const img = new Image();
      img.src = imgDataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const imgRef = ref(storage, `avatars/"myAddnew"+${v4()}`);
          uploadBytes(imgRef, blob).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              setImgUpload(url);
              setImageSrc(url); // Cập nhật đường dẫn mới
            });
          });
        }, "image/jpeg", 0.9);
      };
    };

    reader.readAsDataURL(file);
  };


  useMemo(() => {
    axios.get("http://localhost:8080/api/admin/branch", {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    }).then((resp) => {
      setBranch(resp.data.content);
      console.log(resp.data);
    });
    axios.get("http://localhost:8080/api/user/findAllRec", {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    }).then((resp) => {
      setPeople(resp.data);
      console.log(resp.data);
    });
  }, []);


  return (
    <React.Fragment>
      <main>
        {/* Hero Start */}
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>Thêm mới nhân viên</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* Services Area Start */}
        <div className='row'>
          <div className="col-lg-2" style={{ backgroundColor: "black" }}>
            <Sidebar />
          </div>
          <div className="col-lg-10">
            <section className="service-area section-padding300">
              <div className="container">
                {/* Section caption */}
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div
                      className="gallery-area"
                      style={{ paddingTop: "50px" }}
                    >
                      <div className="col-lg-12 col-md-6 col-sm-6">
                        <div className="box snake thien_snake">
                          <label for="file-input">
                            <div className="gallery-img">
                              <img
                                className="thien_avatar"
                                src={imageSrc}
                                alt="avatar"
                              />
                            </div>
                            <div className="overlay"></div>
                            <input
                              style={{ display: "none" }}
                              id="file-input"
                              type="file"
                              name="myfile"
                              multiple
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <h3 className="mb-30">Thêm mới lễ tân</h3>
                    <form onSubmit={onSubmit}>
                      <div className="mt-5" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Họ Tên</p>
                        </div>
                        <div class="col-lg-9 col-md-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="Họ tên"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Họ tên'"
                            // required
                            readOnly
                            className="single-input"
                            value={name}
                          />
                        </div>
                      </div>
                      <div className="mt-5" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Ngày sinh</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <input
                            type="date"
                            name="dateOfBirth"
                            placeholder="Ngày Sinh"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Ngày Sinh'"
                            className="single-input"
                            onChange={handleChange}
                          />
                          <p style={{ margin: "0px 5px", color: 'red', fontSize: "14px", height: "0px" }} className="error-feedback">
                            &nbsp; {formError.dateOfBirth}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Địa chỉ</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <input
                            type="text"
                            name="address"
                            placeholder="Địa chỉ"
                            onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Địa chỉ'"
                            className="single-input"
                            onChange={handleChange}
                          />
                          <p
                            style={{
                              margin: "0px 5px", color: 'red', fontSize: "14px", height: "0px"
                            }}
                            className="error-feedback"
                          >
                            &nbsp; {formError.address}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5" style={{ display: "flex" }}>

                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Giới tính</p>
                        </div>
                        <div>

                          <div
                            className="col-lg-9 col-md-4"
                            style={{ display: "flex" }}
                          >

                            <div className="col-lg-3" style={{ display: "flex" }}>
                              <div className="col-lg-3 mt-1">
                                <div className="confirm-radio">
                                  <input
                                    type="radio"
                                    id="confirm-radio"
                                    name="gender"
                                    value="Nam"
                                    checked={formValue.gender === "Nam"}
                                    onChange={handleChange}
                                  // checked
                                  />
                                  <label for="confirm-radio"></label>
                                </div>

                              </div>
                              <div className="col-lg-7">
                                <label for="html">Nam</label>
                              </div>
                            </div>
                            <div className="col-lg-3"></div>
                            <div className="col-lg-3" style={{ display: "flex" }}>
                              <div className="col-lg-3 mt-1">
                                <div className="primary-radio">
                                  <input
                                    type="radio"
                                    id="primary-radio"
                                    name="gender"
                                    value="Nữ"
                                    checked={formValue.gender === "Nữ"} // Add this line
                                    onChange={handleChange}
                                  // checked
                                  />
                                  <label for="primary-radio"></label>
                                </div>
                              </div>
                              <div class="col-lg-7">
                                <label for="html">Nữ</label>
                              </div>
                            </div>

                          </div>
                          <div >
                            <p
                              style=
                              {{
                                margin: "0px 20px", color: 'red', fontSize: "14px", height: "0px"
                              }}
                              className="error-feedback">
                              &nbsp; {formError.gender}
                            </p>
                          </div>
                        </div>

                      </div>
                      <div
                        className="input-group-icon mt-5"
                        style={{ display: "flex" }}
                      >
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Tài khoản lễ tân</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <div className="form-select" id="default-select">
                            <select
                              style={{ width: "100%", height: "90%" }}
                              defaultValue=""
                              name="userId"
                              required
                              onChange={(event) => onChange(event.target.value)}
                            >
                              <option value="" disabled>
                                Tài khoản lễ tân
                              </option>
                              {people.map((item) => (
                                <option value={item.userId} key={item.userId}>
                                  {item.account.username}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div
                        className="input-group-icon mt-5"
                        style={{ display: "flex" }}
                      >
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Chi nhánh</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          {/* <div className="icon"><i className="fa fa-globe" aria-hidden="true"></i></div> */}
                          <div className="form-select" id="default-select">
                            <select
                              style={{ width: "100%", height: "90%" }}
                              name="branchId"
                              defaultValue=""
                              onChange={handleChange}
                            >
                              <option value="" disabled>
                                Chi nhánh
                              </option>
                              {branch.map((item) => (
                                <option value={item.branchId}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <p
                            style=
                            {{
                              margin: "0px 5px", color: 'red', fontSize: "14px", height: "0px"
                            }}
                            className="error-feedback">
                            &nbsp; {formError.branchId}
                          </p>
                        </div>
                      </div>
                      <div className="mt-110" style={{ display: "flex" }}>
                        <div className="col-lg-5 ms-10">
                          <Link to="/employee">
                            <div className="button rounded-0 primary-bg w-100 btn_1 boxed-btn">
                              Trở về
                            </div>
                          </Link>
                        </div>
                        <div className="col-lg-5">
                          <button
                            className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                            type="submit"
                          >
                            Thêm mới
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* Services Area End */}
      </main>
    </React.Fragment>
  );
}

export default AddNewEmployee;
