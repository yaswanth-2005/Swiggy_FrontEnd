import React from 'react'
import { Link } from 'react-router-dom'
const TopBar = () => {
    return (
        <section className="topBarSection">
            <div className="companyTitle">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h2>Swiggy</h2>
                </Link>
            </div>
            <div className="searchBar">
                <input type="text" name="" id="" placeholder='Search..' />
            </div>
            <div className="userAuth">
                login / Signup
            </div>
        </section>
    )
}

export default TopBar
