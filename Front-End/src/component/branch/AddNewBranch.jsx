import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import ImageGallery from "../common/ImageGallery";
import Sidebar from "../common/admin/sidebar";
import { storage } from "../firebase/index.js";
import jwt_decode from "jwt-decode";
const accessToken = localStorage.getItem("accessToken");

function AddNewBranch(props) {

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);
  const url = "http://localhost:8080/api/admin/branch";
  const { id } = useParams();
  const [target, setTarget] = useState({
    name: "",
    address: "",
    media: [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // State lưu trữ giá trị phần trăm tải lên

  //Validation
  const [valid, setValid] = useState({ name: "", address: "" });

  const [imagesArray, setImagesArray] = useState([]);

  const error = { color: "red" };

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    if (id) {
      axios
        .patch(`${url}/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
              "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((resp) => {
          navigate("/branch");
          toast.success("Thêm mới chi nhánh thành công!", {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          console.log(error);
          setValid(error.response.data);
        });
    }
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((resp) => {
        navigate("/branch");
      })
      .catch((error) => {
        console.log(error);
        setValid(error.response.data);
        console.log(setValid);
      });
  };

  const handleStatusFromGallery = (data) => { };

  // Refresh
  const handleReset = () => {
    setTarget({});
  };

  const handleChange = (element) => {
    setTarget({ ...target, [element.target.name]: element.target.value });
  };

  useEffect(() => {
    if (id) {
      axios.get(`${url}/${id}`).then((resp) => {
        setTarget(resp.data);
      });
    }
  }, [id]);

  const handleDataFromImageGallery = (data) => {
    setImagesArray(data);
  };

  const handleUploadMultiImage = async () => {
    try {
      setUploading(true);
      const updatedData = { ...target };
      await Promise.all(
        imagesArray.map(async (image) => {
          const imageref = ref(storage, `images/${v4() + image.name}`);
          const snapshot = await uploadBytes(imageref, image);
          const url = await getDownloadURL(snapshot.ref);
          updatedData.media.push(url);
        })
      );

      console.log("up xong anh");

      onSubmit(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <main >
        {/* Hero Start */}
        <div className="slider-area2">
          <div className="slider-height2 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="hero-cap hero-cap2 pt-70 text-center">
                    <h2>Thêm mới chi nhánh</h2>
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
                        <ImageGallery
                          sendDataToParent={handleDataFromImageGallery}
                          sendStatus={handleStatusFromGallery}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <h3 className="mb-30">Thêm mới chi nhánh</h3>
                    {uploading && <div className="progress-bar"></div>}
                    <form action="#">
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Tên Chi Nhánh</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <input
                            type="text"
                            placeholder="Tên chi nhánh"
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                            onBlur={(e) => {
                              e.target.placeholder = "Tên chi nhánh";
                            }}
                            required
                            className="single-input"
                            name="name"
                            value={target.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="mt-80" style={{ display: "flex" }}>
                        <div className="col-lg-3 col-md-4">
                          <p className="mt-2">Địa chỉ</p>
                        </div>
                        <div className="col-lg-9 col-md-4">
                          <input
                            type="text"
                            placeholder="Địa chỉ"
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                            onBlur={(e) => {
                              e.target.placeholder = "Địa chỉ";
                            }}
                            required
                            className="single-input"
                            name="address"
                            value={target.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </form>
                    <div className="mt-110" style={{ display: "flex" }}>
                      <div className="col-lg-4 ms-10">
                        <Link to="/branch">
                          <div className="button rounded-0 primary-bg w-100 btn_1 boxed-btn">
                            Trở về
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 ms-10">
                        <button
                          className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                          type="reset"
                          onClick={handleReset}
                        >
                          Làm mới
                        </button>
                      </div>
                      <div className="col-lg-4">
                        <button
                          className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                          type="submit"
                          onClick={handleUploadMultiImage}
                        >
                          Thêm mới
                        </button>
                      </div>
                    </div>
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

export default AddNewBranch;
