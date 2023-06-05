import accounting from "accounting";
import axios from "axios";
import React, { useState } from "react";
import ModalDetail from "./ModalDetail";

export default function DetailInfoButton(props) {
  const [detailInfo, setDetailInfo] = useState([]);
  const [listService, setListService] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const getInfo = () => {
    axios
      .get(`${props.url}?id=${props.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods":
            "PUT, POST, GET, DELETE, PATCH, OPTIONS",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((resp) => {
        setDetailInfo(resp.data);
        setListService(resp.data.service);
      });
  };

  return (
    <React.Fragment>
      <div
        className="genric-btn primary"
        data-bs-toggle="modal"
        data-bs-target={`#modalDetail-${props.id}`}
        onClick={getInfo}
      >
        <i className="fa fa-eye" aria-hidden="true"></i>
      </div>

      <ModalDetail
        id={props.id}
        data={detailInfo}
        listService={listService?.map((item, index) => (
          <tr key={index} style={{ textAlign: "left" }}>
            <td>{index + 1}</td>
            <td>{item.serviceName}</td>
            <td>{item.employeeName}</td>
            <td>
              {accounting.formatMoney(item.price, {
                symbol: "",
                format: "%v vnđ",
                precision: 0,
              })}
            </td>
          </tr>
        ))}
        total={accounting.formatMoney(detailInfo.total, {
          symbol: "",
          format: "%v vnđ",
          precision: 0,
        })}
        pay={detailInfo.total}
      />
    </React.Fragment>
  );
}
