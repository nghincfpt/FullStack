import React, { useState, useMemo } from 'react'

export default function Page(props) {
    const [page, setPage] = useState([]);

    useMemo(() => {
        setPage(new Array(props.totalPages).fill(0));
    }, [props]);

    return (
        <div>
            <section className="blog_area" style={{ 'paddingBottom': '80px' }}>
                <div className="col-lg-12 mb-5 mb-lg-0">
                    <nav className="blog-pagination1 justify-content-center d-flex">
                        <ul className="pagination">
                            {props.number > 0 && <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => props.handleClick(props.number - 1)}>
                                        <i className="ti-angle-left" id= "huyentn"></i>
                                    </button>
                                </li>
                            </ul>}
                            {page.map((item, index) =>
                                <li className="page-item" key={index + item}>
                                    <button className={index === props.number ? "page-link" : "page-link"}
                                        onClick={() => props.handleClick(index)}>{index + 1}</button>
                                </li>
                            )}
                            {props.number < props.totalPages - 1 && <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => props.handleClick(props.totalPages - 1)}>
                                        <i className="ti-angle-right" id= "huyentn"></i>
                                    </button>
                                </li>
                            </ul>}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    )
}
