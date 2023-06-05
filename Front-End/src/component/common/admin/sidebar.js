import React from "react";
import Header from "../../../controller/register/common/Header";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
function Sidebar() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken")

  const toCustomer = () => {
    navigate("/listUser");
  };
  const toEmployee = () => {
    navigate("/employee");
  };
  const toService = () => {
    navigate("/listService");
  };
  const toBranch = () => {
    navigate("/branch");
  };
  const toChart = () => {
    navigate("/chart");
  };
  const toInvoice = () => {
    navigate("/invoice-history");
  };
  const toBookingManagement = () => {
    navigate("/booking-management")
  }
  return (
    <div>
      <nav
        className="nav flex-column"
        style={{
          color: "white",
          backgroundColor: "black",
          height: "100%",
          alignItems: "baseline",
        }}
      >
        {accessToken && jwt_decode(accessToken).roles == "[ROLE_ADMIN]" &&
          <>
            <a onClick={toEmployee} className="nav-link m-3 text-center">
              Quản lý nhân viên
            </a>
            <a onClick={toService} className="nav-link m-3 text-center">
              Quản lý dịch vụ
            </a>
            <a onClick={toBranch} className="nav-link m-3 text-center">
              Quản lý chi nhánh
            </a>
            <a onClick={toChart} className="nav-link m-3 text-center">
              Quản lý thông kê
            </a>
          </>
        }
        {accessToken && jwt_decode(accessToken).roles == "[ROLE_RECEPTIONIST]" &&
          <>
            <a onClick={toCustomer} className="nav-link m-3 text-center">
              Quản lý khách hàng
            </a>
            <a onClick={toBookingManagement} className="nav-link m-3 text-center">Quản lý đặt lịch </a>
            <a onClick={toInvoice} className="nav-link m-3 text-center">
              Quản lý thanh toán
            </a>
          </>
        }
      </nav>
    </div>
  );
}

export default Sidebar;
