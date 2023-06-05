import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import DetailService from '../component/HairService/DetailService'

export default function DetailButton(props) {
    const handleClick = () => <DetailService id={props.id} url={props.url} />
    return (
        <div>
            <Link as={Link} className="dropdown-item" to={`/${props.url}/${props.id}`}>
                <button className='genric-btn primary radius' onClick={handleClick}>
                    <i className="fa fa-eye"  aria-hidden="true"></i>
                </button>
            </Link>
        </div>
    )
}
