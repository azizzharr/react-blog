import React from "react";

const NavbarMenu = () => {
    return (
        <ul className="nav navbar-nav menu_nav justify-content-center">
            <li className="nav-item active"><a className="nav-link" href="index.html">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="archive.html">Archive</a></li>
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

export default NavbarMenu;
