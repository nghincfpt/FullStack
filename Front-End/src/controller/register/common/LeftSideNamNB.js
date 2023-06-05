import React from "react";

function LeftSideNamNB() {
  return (
    <>
      <div
        className="col-lg-5 col-md-5 mt-sm-30"
        style={{ textAlign: "center" }}
      >
        <div className="logo-namnb6">
          <div className="logo">
            <img src="assets/img/logo/loder.png" alt="" />
          </div>
          <div
            style={{
              lineHeight: "48px",
              height: "48px",
              marginLeft: "10px",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              YOUARERIGHT
            </span>
          </div>
        </div>

        <div className="slogan-namnb6" style={{ marginTop: "20px" }}>
          <span
            style={{
              color: "#fff",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            "Where Style Meets Precision: Unleash Your Best Look!"
          </span>
        </div>
      </div>
    </>
  );
}

export default LeftSideNamNB;
