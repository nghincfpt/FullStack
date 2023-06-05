import React from "react";

export default function SearchForm(props) {
  const style = { marginLeft: "10px", marginRight: "10px" };

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = Object.fromEntries(new FormData(e.target)).condition;
    props.onSubmit(formData.trim());
    console.log(formData.trim());
  };

  return (
    <div>
      <form onSubmit={onSubmit} id="form">
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Nhập từ khoá cần tìm"
            name="condition"
            id="condition"
            style={style}
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btns" type="submit" style={style}>
              <i className="ti-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
