import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import Page from '../../utils/Page';
import EditButton from '../../Button/EditButton';
import DeleteButton from '../../Button/DeleteButton';
import SearchForm from '../../Button/SearchForm';
import DetailButton from '../../Button/DetailButton';
import jwt_decode from "jwt-decode";
import accounting from "accounting";
import Sidebar from "../common/admin/sidebar";

function UserList() {
    const navigate = useNavigate();
    const url = "http://localhost:8080/api/hairService";
    const [list, setList] = useState({ data: { content: [] } });
    const [condition, setCondition] = useState("");
    const [display, setDisplay] = useState(true);
    const accessToken = localStorage.getItem("accessToken");



    function handleClick(page) {

        axios.get(`${url}?p=${page}&c=${condition}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods":
                    "PUT, POST, GET, DELETE, PATCH, OPTIONS",
                "Authorization": "Bearer " + accessToken,
            },
        }).then((res) => {
            console.log(res);
            setList(res);
        });
    }

    const onSubmit = (data) => {
        setCondition(data);
        console.log(setCondition);
    }

    const rerender = () => {
        setDisplay(!display);
    }

    useEffect(() => {
        if (accessToken == null) {
            navigate("/login");
        } else if (!["[ROLE_ADMIN]"].includes(jwt_decode(accessToken).roles)) {
            navigate("/main")
            return
        }
        axios.get(`${url}?c=${condition}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        }).then((res) => {
            setList(res);
            console.log(res);
        });
    }, [condition, display]);


    return (
        <div>
            <div className="slider-area2">
                <div className="slider-height2 d-flex align-items-center" id="slider1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="hero-cap hero-cap2 pt-70 text-center">
                                    <h2>Quản lý dịch vụ</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-lg-2" style={{ backgroundColor: "black" }}>
                    <Sidebar />
                </div>

                <div className="col-lg-10">
                    <div className="whole-wrap">
                        <div className="container box_1170">
                            <div className="blog_right_sidebar">
                                <aside className="single_sidebar_widget search_widget col-lg-12" style={{ 'display': 'flex' }}>
                                    <div className="col-lg-1">
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <SearchForm
                                                onSubmit={onSubmit}
                                            />
                                        </div>
                                    </div>
                                </aside>
                            </div>
                            <div className="mt-10" style={{ 'display': 'flex' }}>
                                <div className="col-lg-3 ms-10">
                                    <Link to="/createService">
                                        <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn">Thêm mới</button>
                                    </Link>
                                </div>
                                <div className="col-lg-3 ms-10"></div>
                            </div>
                            <div className="section-top-border">
                                <h3 className="mb-30">Danh sách dịch vụ</h3>
                                <div>
                                    <div className="progress-table" style={{ 'textAlign': 'center' }}>
                                        <table className="table table-hover" id="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Tên dịch vụ</th>
                                                    <th scope="col">Giá</th>
                                                    <th scope="col">Mô tả</th>
                                                    <th scope="col" style={{ width: "25%" }}>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.data.content.length > 0 &&
                                                    list.data.content.map((item) =>
                                                        <tr style={{ 'marginTop': '5px' }} key={item.serviceId}>
                                                            <td>{item.serviceId}</td>
                                                            <td>{item.name}</td>
                                                            <td className="mt-2">{accounting.formatMoney(item.price, {
                                                                symbol: "",
                                                                format: "%v vnđ",
                                                                precision: 0,
                                                            })}</td>
                                                            <td><div className='long-text-huyen'>{item.description}</div></td>
                                                            <td className='item'>
                                                                <DeleteButton url={url} id={item.serviceId} rerender={rerender} />
                                                                <EditButton url={'listService'} id={item.serviceId} />
                                                                <DetailButton url={'detailService'} id={item.serviceId} />
                                                            </td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                    <Page
                        totalPages={list.data.totalPages}
                        number={list.data.number}
                        condition={condition}
                        handleClick={handleClick}
                    />
                </div>
            </div>
        </div>
    )
}


export default UserList;