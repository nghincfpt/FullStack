import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserCreate() {
    const customer = "http://localhost:8080/api/user";

    const error = { color: "red" };

    // const { id } = useParams();
    const [target, setTarget] = useState({});
    const [valid, setValid] = useState({});
    const location = useLocation();

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(customer, target, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => navigate("/"))
            .catch(error => setValid(error.response.data))
        console.log(error);
    }

    function handleChange(e) {
        setTarget({ ...target, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        setTarget(location.state);
    }, []);

    const [imageSrc, setImageSrc] = useState("./assets/img/thien/1.jpg");

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="slider-area2">
                <div className="slider-height2 d-flex align-items-center">
                </div>
            </div>
            <section id="section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="gallery-area" style={{ 'padding-top': '60px' }}>
                                <div className="col-lg-12 col-md-6 col-sm-6">
                                    <div className="box snake thien_snake">
                                        <label htmlFor="file-input">
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
                            <h2 className="mb-30">THÊM MỚI THÀNH VIÊN</h2>
                            <form id="form" onSubmit={onSubmit} style={{ textAlign: "left", color: "black", width: "80%" }}>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-3 col-md-4">
                                        <p className="mt-2">Họ Tên</p>
                                    </div>
                                    <div className="col-lg-9 col-md-4">
                                        <input type="text" placeholder="Họ tên"
                                            className="single-input"
                                            name='fullName' onChange={(e) => handleChange(e)} id="fullName" />
                                    </div>
                                </div>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-3 col-md-4">
                                        <p className="mt-2">Ngày sinh</p>
                                    </div>
                                    <div className="col-lg-9 col-md-4">
                                        <input type="date" placeholder="Ngày Sinh"
                                            className="single-input" name='dateOfBirth' onChange={(e) => handleChange(e)} id="dateOfBirth" />
                                    </div>
                                </div>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-3 col-md-4">
                                        <p className="mt-2">Số điện thoại</p>
                                    </div>
                                    <div className="col-lg-9 col-md-4">
                                        <input type="text" placeholder="Số điện thoại"
                                            className="single-input" name='phoneNumber' onChange={(e) => handleChange(e)} id="phoneNumber" />
                                    </div>
                                </div>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-3 col-md-4">
                                        <p className="mt-2">Giới tính</p>
                                    </div>
                                    <div className="col-lg-9 col-md-4" style={{ 'display': 'flex' }}>
                                        <div className="col-lg-3" style={{ 'display': 'flex' }}>
                                            <div className="col-lg-3 mt-1">
                                                <div className="confirm-radio">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                    <label className="form-check-label" htmlFor="inlineRadio1"></label>
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <label htmlFor="confirm-radio1">Nam</label>
                                            </div>
                                        </div>

                                        <div className="col-lg-3" style={{ 'display': 'flex' }}>
                                            <div className="col-lg-3 mt-1">
                                                <div className="confirm-radio">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                    <label className="form-check-label" htmlFor="inlineRadio2"></label>
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <label htmlFor="confirm-radio1">Nữ</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-3 col-md-4">
                                        <p className="mt-2">Email</p>
                                    </div>
                                    <div className="col-lg-9 col-md-4">
                                        <input type="email" placeholder="Email"
                                            className="single-input"
                                            name='email' onChange={(e) => handleChange(e)} id="email" />
                                    </div>
                                </div>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-3 col-md-4">
                                        <p className="mt-2">Địa chỉ</p>
                                    </div>
                                    <div className="col-lg-9 col-md-4">
                                        <input type="text" placeholder="Địa chỉ"
                                            className="single-input"
                                            name='address' onChange={(e) => handleChange(e)} id="address" />
                                    </div>
                                </div>
                                <div className="mt-10" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-4">
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                                            type="button"><Link as={Link} to='/listUser' style={{ textDecoration: 'none' }}>Trở về</Link></button>
                                    </div>
                                    <div className="col-lg-4">
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                                            type="reset">Làm mới</button>
                                    </div>
                                    <div className="col-lg-4">
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                                            type="submit">Thêm mới</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UserCreate