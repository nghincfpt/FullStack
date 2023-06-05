import axios from "axios";
import jwt_decode from "jwt-decode";
import { React, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Booking() {
  //useState
  const [data, setData] = useState();
  const [selectBranch, setSelectBranch] = useState("");
  const [dataStyle, setDataStyle] = useState();
  const [dataSkinner, setDataSkinner] = useState();
  const [workingTimeData, setWorkingTimeData] = useState();
  const [selectStyle, setSelectStyle] = useState();
  const [selectSkinner, setSelectSkinner] = useState();
  const [selectTime, setSelectTime] = useState();
  const [selectDay, setSelectDay] = useState();
  const [busyTime, setBusyTime] = useState();
  const [selectservice, setSelectservice] = useState([]);
  const [formData, setFormData] = useState({ isDelete: 0 });
  const [serviceList, setServiceList] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const { id } = useParams();
  const [title, setTitle] = useState("ĐẶT LỊCH HẸN");
  const [oldInfo, setOldInfo] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [oldFormData, setOldFormData] = useState();
  const [errors, setErrors] = useState({});
  console.log(id);
  console.log(accessToken);


  //useEffect
  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    } else if (!["[ROLE_CUSTOMER]", "[ROLE_RECEPTIONIST]"].includes(jwt_decode(accessToken).roles)) {
      navigate("/main")
    }
  }, []);


  useEffect(() => {
    if (location.state != null && location.state.formData != null) {
      setFormData({ ...location.state.formData, serviceList: serviceList });
      setSelectStyle(location.state.formData.styleId);
      setSelectDay(location.state.formData.bookingDate);
      setSelectTime(location.state.formData.workTimeId);
      setSelectSkinner(location.state.formData.skinnerId);

      if (id) {
        setOldInfo({
          bookingDate: location.state.formData.bookingDate,
          styleId: location.state.formData.styleId,
          workTimeId: location.state.formData.workTimeId,
        });
      }
    }
    setSelectBranch(formData.branch);
  }, [status]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/emp/booking/info/list-branch")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (formData.branch != "") {
      axios
        .get(
          "http://localhost:8080/api/emp/booking/info/list-employee-of-branch?branchId=" +
          formData.branch
        )
        .then((res) => {
          console.log(res);
          setDataStyle(res.data.filter((item) => item.employee.type === "1"));
          setDataSkinner(res.data.filter((item) => item.employee.type === "2"));
        })
        .catch((error) => {
          console.error("Lỗi khi gửi yêu cầu:", error);
        });
      axios
        .get("http://localhost:8080/api/emp/booking/info/working-time")
        .then((res) => {
          setWorkingTimeData(res.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }
    setBusyTime([]);
  }, [selectBranch]);
  console.log(data);
  useEffect(() => {
    if (selectStyle != null && selectDay != null) {
      axios
        .get(
          "http://localhost:8080/api/emp/booking/info/busy-list?employeeId=" +
          selectStyle +
          "&day=" +
          selectDay
        )
        .then((res) => {
          setBusyTime(res.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gửi yêu cầu:", error);
        });
    }
  }, [selectDay, selectStyle]);

  useEffect(() => {
    if (accessToken == null) {
      navigate("/login");
    }
    if (location.state != null && location.state.selectService != null) {
      setSelectservice(location.state.selectService);
      location.state.selectService.forEach((element) => {
        setServiceList((prev) => [...prev, element.serviceId]);
      });
      location.state.selectService = [];
    }
    setMinDate(getCurrentDate());
    setMaxDate(getMaxDate());
    setStatus("OK");
    if (id == undefined) {
      setTitle("ĐẶT LỊCH HẸN");
    } else {
      setTitle("CHỈNH SỬA LỊCH HẸN");
    }
  }, []);
  console.log("ServiceList", serviceList);

  //console log
  console.log("formdata", formData);

  //const
  const styleImg = {
    border: "4px solid #d19f68",
    borderRadius: "100px",
    height: "100px",
    width: "100px",
  };
  const styleImgUnselect = {
    borderRadius: "50px",
    height: "100px",
    width: "100px",
  };
  const selectedService = {
    border: "1px gray solid",
    borderRadius: "5px",
    display: "inline-block",
    whiteSpace: "break-word",
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const getMaxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 10);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  //function
  const handleClickTime = (time) => {
    // setSelectTime(time);
    if (
      selectTime === time.workingTimeId ||
      busyTime.includes(time.timeZone.substring(0, 5))
    ) {
      setSelectTime(null);
    } else {
      setSelectTime(time.workingTimeId);
    }

    setFormData({ ...formData, workTimeId: time.workingTimeId });
  };

  const handleButtonClick = (style) => {
    setSelectStyle(style.employee.employeeId);
    setFormData({ ...formData, styleId: style.employee.employeeId });
  };

  const handleSelectBranch = (e) => {
    setSelectBranch(e.value);

    setFormData({
      userId: jwt_decode(accessToken).aud,
      isDelete: 0,
      serviceList: serviceList,
      branch: e.value,
      bookingDate: selectDay,
    });
    setSelectStyle("");
  };

  const handleSelectDay = (e) => {
    var toDay = new Date();
    var selectDay = new Date(e);
    toDay.setDate(toDay.getDate() + 10);
    setSelectDay(e);
    if (new Date(e) <= toDay && new Date(getCurrentDate()) <= selectDay) {
      setFormData({ ...formData, bookingDate: e });
    } else {
      setFormData({ ...formData, bookingDate: undefined });
    }
  };
  const handleSelectSkinner = (e) => {
    setSelectSkinner(e);
    setFormData({ ...formData, skinnerId: e });
  };

  const handleSelectServiceButton = () => {
    if (id) {
      navigate("/select-service", {
        state: { selectService: selectservice, formData: formData, id: id },
      });
    } else {
      navigate("/select-service", {
        state: { selectService: selectservice, formData: formData },
      });
    }
  };
  const handleBack = () => {
    navigate("/booking-management");
  };

  const handleInputNote = (e) => {
    setFormData({ ...formData, note: e });
  };

  const handleInputName = (e) => {
    setFormData({ ...formData, customerName: e });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!("note" in formData)) {
      setFormData({ ...formData, note: null });
    }

    const errors = {};

    if (!formData.branch) {
      errors.branch = "Vui lòng chọn chi nhánh";
    }

    if (jwt_decode(accessToken).roles.includes("ROLE_RECEPTIONIST")) {
      if (!formData.customerName || formData.customerName?.trim() == "") {
        errors.customerName = "Vui lòng nhập tên khách hàng";
      }
    }

    if (!formData.serviceList || formData.serviceList.length == 0) {
      errors.serviceList = "Vui lòng chọn ít nhất một dịch vụ";
    }
    var toDay = new Date();
    var selectDay = new Date(e);
    toDay.setDate(toDay.getDate() + 10);
    if (
      !formData.bookingDate ||
      new Date(formData.bookingDate) < new Date(getCurrentDate()) ||
      new Date(formData.bookingDate) > toDay
    ) {
      errors.bookingDate =
        "Vui lòng chọn ngày trong khoảng 10 ngày tính từ ngày hiện tại!";
    }

    if (!formData.styleId) {
      errors.styleId = "Vui lòng chọn stylist";
    }

    if (!formData.skinnerId) {
      errors.skinnerId = "Vui lòng chọn skinner";
    }
    if (!formData.workTimeId) {
      errors.workTimeId = "Vui lòng chọn giờ";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      if (id) {
        axios
          .post(
            "http://localhost:8080/api/emp/booking/update/" + id,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods":
                  "PUT, POST, GET, DELETE, PATCH, OPTIONS",
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((data) => {
            console.log(data.data);
            toast.success("Cập nhật lịch hẹn thành công!", {
              position: "top-center",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            navigate("/booking-management", {
              state: null,
            });
          })
          .catch((error) => {
            toast.error(
              "Cập nhật thất bại! Danh sách lịch hẹn vừa được cập nhật",
              {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            navigate("/booking-management", {
              state: null,
            });
          });
      } else {
        axios
          .post("http://localhost:8080/api/emp/booking/create", formData, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Methods":
                "PUT, POST, GET, DELETE, PATCH, OPTIONS",
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((data) => {
            console.log(data.data);
            toast.success("Đặt lịch hẹn thành công!", {
              position: "top-center",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            navigate("/main", {
              state: null,
            });
          })
          .catch((error) => {
            toast.error(
              "Đặt lịch thất bại! Danh sách lịch hẹn vừa được cập nhật",
              {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            navigate("/booking", {
              state: null,
            });
          });
      }
    }

    // if (
    //   formData.isDelete == 0 &&
    //   formData.serviceList.length > 0 &&
    //   formData.branch != ""   &&
    //   formData.userId != "" && formData.userId != undefined &&
    //   formData.bookingDate != undefined &&
    //   formData.workTimeId != "" &&formData.workTimeId != undefined &&
    //   formData.styleId != "" && formData.styleId != undefined &&
    //   formData.skinnerId != "" &&  formData.skinnerId != undefined
    // ) {
    // }
  };

  return (
    <>
      <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70 text-center">
                  <h2>{title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <section className="service-area p-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <form action="#">
                  <div className="input-group-icon mt-10">
                    <h1>Chọn chi nhánh</h1>

                    <div>
                      <select
                        className="form-select"
                        id="default-select"
                        onChange={(event) => {
                          handleSelectBranch(event.target);
                        }}
                      >
                        <option value="">Vui lòng chọn</option>
                        {data?.map((branch, index) =>
                          branch.branchId == formData.branch ? (
                            <option
                              key={index}
                              value={branch.branchId}
                              selected={true}
                            >
                              {branch.name} | {branch.address}
                            </option>
                          ) : (
                            <option key={index} value={branch.branchId}>
                              {branch.name} | {branch.address}
                            </option>
                          )
                        )}
                      </select>
                      {errors.branch && (
                        <span className="error-message">{errors.branch}</span>
                      )}
                    </div>
                  </div>
                  {jwt_decode(accessToken).roles.includes(
                    "ROLE_RECEPTIONIST"
                  ) && (
                      <div className="input-group-icon mt-10">
                        <h1>Tên khách hàng đặt lịch</h1>
                        <input
                          onChange={(event) =>
                            handleInputName(event.target.value)
                          }
                          className="single-textarea"
                          placeholder="Vui lòng nhập tên khách hàng..."
                          defaultValue={formData.customerName}
                        />
                        {errors.customerName && (
                          <span className="error-message">
                            {errors.customerName}
                          </span>
                        )}
                      </div>
                    )}
                  <div className="input-group-icon mt-10">
                    <h1>Chọn dịch vụ</h1>
                    <div>
                      <button
                        type="button"
                        onClick={handleSelectServiceButton}
                        className="btn header-btn"
                        style={{ width: "100%" }}
                      >
                        <i className="fas fa-cut fa-rotate-270"></i> Chọn dịch
                        vụ
                      </button>
                      {errors.serviceList && (
                        <span className="error-message">
                          {errors.serviceList}
                        </span>
                      )}
                    </div>

                    {selectservice.length > 0 && (
                      <div className="m-3">Dịch vụ đã chọn</div>
                    )}
                    <div>
                      {selectservice?.map((item, index) => (
                        <span
                          key={index}
                          className="p-2 m-3"
                          style={selectedService}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {"branch" in formData && formData.branch != "" && (
                    <div className="mt-10">
                      <h1>Chọn ngày, giờ & stylist</h1>
                      <div className="container">
                        <h2>Chọn stylist</h2>
                        <div>
                          {console.log(dataStyle)}
                          {dataStyle && (
                            <Carousel
                              responsive={responsive}
                              infinite={true}
                              arrows={true}
                            >
                              {dataStyle?.map((style, index) => (
                                <>
                                  <img
                                    key={index}
                                    src={style.avatar}
                                    onClick={() => {
                                      handleButtonClick(style);
                                    }}
                                    alt="không hiển thị được ảnh"
                                    style={
                                      selectStyle === style.employee.employeeId
                                        ? styleImg
                                        : styleImgUnselect
                                    }
                                  />
                                  <h6 key={index + 1}>{style.fullName}</h6>
                                </>
                              ))}
                            </Carousel>
                          )}
                          {errors.styleId && (
                            <span className="error-message">
                              {errors.styleId}
                            </span>
                          )}
                        </div>
                        <h2>Chọn ngày</h2>
                        <input
                          min={minDate}
                          max={maxDate}
                          type="date"
                          defaultValue={selectDay}
                          required
                          className="single-input"
                          onChange={(event) => {
                            handleSelectDay(event.target.value);
                          }}
                        />
                        {errors.bookingDate && (
                          <span className="error-message">
                            {errors.bookingDate}
                          </span>
                        )}
                        <h2>Chọn giờ</h2>
                        <div className="d-flex justify-content-center row m-0">
                          {workingTimeData?.map((time, index) => {
                            const isBusy =
                              formData.styleId == oldInfo?.styleId &&
                                formData.bookingDate == oldInfo?.bookingDate
                                ? time.workingTimeId != oldInfo?.workTimeId &&
                                busyTime.includes(
                                  time.timeZone.substring(0, 5)
                                )
                                : busyTime.includes(
                                  time.timeZone.substring(0, 5)
                                );
                            const isSelected =
                              formData.workTimeId === time.workingTimeId;

                            const buttonStyle = {
                              border: "1px solid",
                              borderRadius: "5px",
                              backgroundColor: isSelected
                                ? "#d19f68"
                                : isBusy
                                  ? "#888888"
                                  : null,
                            };

                            return (
                              <button
                                key={index}
                                type="button"
                                className={`genric-btn col-2 time-select ${isSelected ? "" : "success-border"
                                  }`}
                                style={buttonStyle}
                                onClick={() => handleClickTime(time)}
                                disabled={isBusy}
                              >
                                {time.timeZone}
                              </button>
                            );
                          })}
                        </div>
                        {errors.workTimeId && (
                          <span className="error-message">
                            {errors.workTimeId}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {"branch" in formData && formData.branch != "" && (
                    <div className="input-group-icon mt-10">
                      <h1>Chọn skinner</h1>

                      <div id="default-select">
                        <select
                          className="form-select"
                          onChange={(event) => {
                            handleSelectSkinner(event.target.value);
                          }}
                        >
                          <option value=""> Vui lòng chọn skinner</option>
                          {selectBranch != "" &&
                            dataSkinner?.map((skinner, index) =>
                              skinner.employee.employeeId ==
                                formData.skinnerId ? (
                                <option
                                  selected={true}
                                  key={index}
                                  value={skinner.employee.employeeId}
                                >
                                  {skinner.fullName}
                                </option>
                              ) : (
                                <option
                                  key={index}
                                  value={skinner.employee.employeeId}
                                >
                                  {skinner.fullName}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                      {errors.skinnerId && (
                        <span className="error-message">
                          {errors.skinnerId}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-10">
                    <h1>Ghi chú</h1>
                    <textarea
                      onChange={(event) => handleInputNote(event.target.value)}
                      className="single-textarea"
                      placeholder="Ghi chú"
                      defaultValue={formData.note}
                    ></textarea>
                  </div>
                  <div className="input-group-icon mt-10">
                    {id ? (
                      <div>
                        <span
                          className="btn header-btn px-2 mx-2"
                          style={{ width: "20%" }}
                          onClick={handleBack}
                        >
                          <i class="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                          Quay lại
                        </span>

                        <button
                          className="btn header-btn"
                          style={{ width: "79%" }}
                          onClick={(event) => handleSubmitForm(event)}
                        >
                          <i className="fas fa-cut fa-rotate-270"></i> Hoàn tất
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={(event) => handleSubmitForm(event)}
                          className="btn header-btn"
                          style={{ width: "100%" }}
                        >
                          <i className="fas fa-check"></i>Hoàn tất
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
