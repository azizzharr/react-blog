import React from "react";
import NavbarSocial from "./navbar-social";
import NavbarMenu from "./navbar-menu";
import {Link, NavLink} from "react-router-dom";
import withLogin from "../provider/login/with-login";

const Header = ({isAuthenticated}) => {

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
                            <div className='row' style={{
                                minWidth: '200px'
                            }}>
                                {!isAuthenticated && [
                                    <div className='col-6'>
                                        <NavLink to='/login'>Sing In</NavLink>
                                    </div>,
                                    <div className='col-6'>
                                        <NavLink to='/register'>Sing Up</NavLink>
                                    </div>
                                ]}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default withLogin(Header);
