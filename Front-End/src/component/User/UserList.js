import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Page from '../../utils/Page';
import SearchForm from '../../Button/SearchForm';
import DeleteUser from '../../Button/DeleteUser';
import Sidebar from "../common/admin/sidebar";

function UserList() {

    const url = "http://localhost:8080/api/user";
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
    }

    const rerender = () => {
        setDisplay(!display);
    }
    useEffect(() => {
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
                <div className="slider-area2">
                    <div className="slider-height2 d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap hero-cap2 pt-70 text-center">
                                        <h2>Quản lý khách hàng</h2>
                                    </div>
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
                                <div className="col-lg-3 ms-10"></div>
                            </div>
                            <div className="section-top-border">
                                <h3 className="mb-30">Danh sách khách hàng</h3>
                                <div>
                                    <div className="progress-table" style={{ 'textAlign': 'center' }}>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Họ tên</th>
                                                    <th scope="col">Giới tính</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col">Ngày sinh</th>
                                                    <th scope="col">Số điện thoại</th>
                                                    {/* <th scope="col">Account</th> */}
                                                    {/* <th scope="col">Chức năng</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.data.content.length > 0 &&
                                                    list.data.content.map((item) =>
                                                        <tr style={{ 'marginTop': '5px' }} key={item.userId}>
                                                            <td>{item.userId}</td>
                                                            <td>{item.fullName}</td>
                                                            <td>{item.gender}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.dateOfBirth}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            {/* <td>{item.account.accountId}</td> */}
                                                            {/* <td>
                                                    <DeleteUser url={url} id={item.userId} rerender={rerender} />
                                                    </td> */}
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

export default UserList