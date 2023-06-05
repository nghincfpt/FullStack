import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { storage } from "./common/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import Header from "./common/Header";

function UpdateInfo() {
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    }
  }, []);
  const location = useLocation();
  const result = location.state?.result;
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const propertyMap = {
      fullname: setFullname,
      email: setEmail,
      phoneNumber: setPhoneNumber,
      dob: setDob,
      address: setAddress,
    };

    for (const property in propertyMap) {
      if (result && result[property]) {
        propertyMap[property](result[property]);
      }
    }
  }, [

    result && result.fullname, // Add null check for `result` and its properties
    result && result.email,
    result && result.phoneNumber,
    result && result.dob,
    result && result.address,

  ]);

  const setParams = (event) => {
    const { name, value } = event.target;
    if (name === "fullname") {
      setFullname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  const [img, setImg] = useState(null);
  const [imgUpload, setImgUpload] = useState("");

  const [inputImg, setInputImg] = useState("assets/img/logo/avatar.png");

  useEffect(() => {

    if (result && result.avatar) {
      setInputImg(result.avatar);
    }
  }, [result && result.avatar]);

  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (imgUpload !== "") {
      setAvatar(imgUpload);
    } else {
      if (result && result.avatar) {
        setAvatar(result.avatar);
      }
    }
  }, [imgUpload]);

  const [imgList, setImgList] = useState([]);

  const imgListRef = ref(storage, "avatars/");

  const uploadImg = (event) => {
    setImg(event.target.files[0]);
  };

  useEffect(() => {
    listAll(imgListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    if (img == null) {
      return;
    }
    const imgRef = ref(storage, `avatars/${email + v4()}`);
    uploadBytes(imgRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUpload(url);
      });
    });
  }, [img]);

  const exit = () => {
    navigate("/");
  };

  const updateInfo = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var raw = JSON.stringify({
      userId: result.userId,
      fullName: fullname,
      phoneNumber: phoneNumber,
      address: address,
      avatar: avatar,
      dob: dob,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/updateInfo", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        toast.success("Cập nhật thông tin thành công!");
        navigate("/");
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
                  <h2>Cập nhật thông tin</h2>
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
          className="container box_1170 "
          style={{
            width: "80%",
            border: "2px solid brown",
            margin: "20px auto",
          }}
        >
          <div className="section-top-border" style={{ height: "80vh" }}>

            <div
              className="row"
              style={{ display: "flex", height: "100%", alignItems: "center" }}
            >
              <div className="col-lg-4 col-md-4">
                <div
                  className="box snake namnb6"
                  style={{
                    borderRadius: "50%",
                    width: "320px",
                    height: "320px",
                  }}
                >
                  <label htmlFor="file-input">
                    <div className="gallery-img">
                      {img != null ? (
                        <img className="avatar" src={imgUpload} alt="avatar" />
                      ) : (
                        <img className="avatar" src={inputImg} alt="avatar" />
                      )}
                    </div>
                    <div className="overlay"></div>
                    <input
                      style={{ display: "none" }}
                      id="file-input"
                      type="file"
                      name="myfile"
                      multiple
                      onChange={(event) => {
                        uploadImg(event);
                      }}
                    />
                  </label>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p style={{ paddingTop: "5px", paddingRight: "55px" }}>
                    Nhấn vào ảnh để cập nhật Avatar!
                  </p>
                </div>
              </div>
              <div className="col-lg-8 col-md-8">
                <form action="#">
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
                      style={{ border: "1px solid #e5e6e9" }}
                      value={fullname}
                      onChange={setParams}
                    />
                  </div>{" "}
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
                      style={{ border: "1px solid #e5e6e9" }}
                      value={email}
                      onChange={setParams}
                      readOnly
                    />
                  </div>{" "}
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
                      style={{ border: "1px solid #e5e6e9" }}
                      value={phoneNumber}
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10">
                    <input
                      type="date"
                      name="dob"
                      placeholder="Ngày sinh"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Ngày sinh";
                      }}
                      required
                      className="single-input-namnb6"
                      style={{ border: "1px solid #e5e6e9" }}
                      value={dob}
                      onChange={setParams}
                    />
                  </div>{" "}
                  <div className="mt-10">
                    <input
                      type="text"
                      name="address"
                      placeholder="Địa chỉ"
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                      onBlur={(e) => {
                        e.target.placeholder = "Địa chỉ";
                      }}
                      required
                      className="single-input-namnb6"
                      style={{ border: "1px solid #e5e6e9" }}
                      value={address}
                      onChange={setParams}
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
                          onClick={updateInfo}
                        >
                          {" "}
                          Cập nhật{" "}
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

export default UpdateInfo;
