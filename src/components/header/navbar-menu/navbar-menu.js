import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import withLogin from "../../provider/login/with-login";
import './navbar-menu.css'
import MyLink from "../../hooks/my-link";

const NavbarMenu = ({isAuthenticated}) => {
    return (
        <ul className="nav navbar-nav menu_nav justify-content-center">
            <li className="nav-item"><MyLink exact className="nav-link" to='/'>Home</MyLink></li>
            {isAuthenticated &&
            <li className="nav-item"><MyLink exact className="nav-link" to='/set-blog'>Set blog</MyLink></li>}
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

export default withLogin(withRouter(NavbarMenu));
