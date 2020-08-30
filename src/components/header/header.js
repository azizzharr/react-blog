import React from "react";
import NavbarSocial from "./navbar-social";
import NavbarMenu from "./navbar-menu";

const Header = () => {
    return (
        <header className="header_area">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container box_1620">
                        <a className="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <NavbarMenu/>
                            <NavbarSocial/>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;
