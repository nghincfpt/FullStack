import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";


import Login from "./controller/login/Login.js";
import ChangePassword from "./controller/register/ChangePassword";
import ConfirmOtp from "./controller/register/ConfirmOtp";
import ForgotChangePassword from "./controller/register/ForgotChangePassword";
import ForgotPassword from "./controller/register/ForgotPassword";
import Register from "./controller/register/Register";
import UpdateInfo from "./controller/register/UpdateInfo";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./component//User/UserList";
import CreateService from "./component/HairService/CreateService";
import DetailService from "./component/HairService/DetailService";
import EditService from "./component/HairService/EditService";
import HairServiceList from "./component/HairService/HairServiceList";
import UserCreate from "./component/User/UserCreate";
import BookingManagement from "./component/booking/BookingManagement";
import Booking from "./component/booking/booking";
import Selectservice from "./component/booking/selectservice";
import AddNewBranch from "./component/branch/AddNewBranch";
import Branch from "./component/branch/DashboardBranch";
import DetailBranch from "./component/branch/DetailBranch";
import EditBranch from "./component/branch/EditBranch";
import BarChart1 from "./component/common/admin/BarChart1";
import About from "./component/common/user/About";
import Main from "./component/common/user/Main";
import Services from "./component/common/user/Services";
import Trend from "./component/common/user/Trend";
import Footer from "./component/common/user/footer";
import AddNewEmployee from "./component/employee/AddNewEmployee";
import AddNewRec from "./component/employee/AddNewRec";
import DashboardEmployee from "./component/employee/DashboardEmployee";
import DetailEmployee from "./component/employee/DetailEmployee";
import EditEmployee from "./component/employee/EditEmployee";
import Invoice from "./component/invoice/Invoice";
import InvoiceHistory from "./component/invoice/InvoiceHistory";
import Payment from "./component/payment/Payment";
import PaymentEdit from "./component/payment/PaymentEdit";
import PaymentServiceEdit from "./component/payment/PaymentServiceEdit";
import Header from "./controller/register/common/Header";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Main />}>   </Route>
          <Route exact path='/main' element={<Main />} />
          <Route exact path='/service' element={<Services />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/trend' element={<Trend />} />
          <Route exact path='/chart' element={<BarChart1 />} />

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/confirm-otp" element={<ConfirmOtp />}></Route>
          <Route
            path="/forgot-changePassword"
            element={<ForgotChangePassword />}
          ></Route>
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          <Route path="/updateInfo" element={<UpdateInfo />}></Route>

          <Route path="/booking" element={<Booking />}>
            <Route path="/booking/:id" element={<Booking />} />
          </Route>
          <Route path="/select-service" element={<Selectservice />}></Route>
          <Route path="/listUser" element={<UserList />} />
          <Route path="/createUser" element={<UserCreate />} />
          <Route path="/listService" element={<HairServiceList />} />
          <Route path="/createService" element={<CreateService />} />
          <Route path="/detailService/:id" element={<DetailService />} />

          <Route path='/listService/:id' element={<EditService />} />

          <Route path="/branch" element={<Branch />}></Route>
          <Route path="/branch-add" element={<AddNewBranch />}></Route>
          <Route path="/branch-detail/:id" element={<DetailBranch />}></Route>
          <Route path="/branch-edit/:id" element={<EditBranch />}></Route>

          <Route path="/invoice/:id" element={<Invoice />}></Route>
          <Route path="/invoice-history" element={<InvoiceHistory />}></Route>

          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/payment-edit/:id" element={<PaymentEdit />} />
          <Route path="/payment-service-edit/:id" element={<PaymentServiceEdit />} />

          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/employee" element={<DashboardEmployee />}></Route>
          <Route path="/employee-add" element={<AddNewEmployee />}></Route>
          <Route path="/emp/edit" element={<EditEmployee />}></Route>
          <Route path="/employee/:id" element={<DetailEmployee />}></Route>
          <Route path="/employee-addRec" element={<AddNewRec />}></Route>
          <Route
            path="/booking-management"
            element={<BookingManagement />}
          ></Route>

        </Routes>
        <Footer />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
