import React from "react";
import {NavLink} from "react-router-dom";
import withLogin from "../../provider/login/with-login";
import './navbar-menu.css'

const NavbarMenu = ({isAuthenticated}) => {
    return (
        <ul className="nav navbar-nav menu_nav justify-content-center">
            <li className="nav-item"><NavLink exact className="nav-link" to='/'>Home</NavLink></li>
            {isAuthenticated &&
            <li className="nav-item"><NavLink exact className="nav-link" to='/set-blog'>Set blog</NavLink></li>}
            <li className="nav-item"><a className="nav-link" href="category.html">Category</a></li>
            <li className="nav-item submenu dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"
                   role="button"
                   aria-haspopup="true"
                   aria-expanded="false">Pages</a>
                <ul className="dropdown-menu">
                    <li className="nav-item"><a className="nav-link" href="blog-details.html">Blog
                        Details</a></li>
                </ul>
            </li>
            <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a>
            </li>
        </ul>
    )
}

export default withLogin(NavbarMenu);
