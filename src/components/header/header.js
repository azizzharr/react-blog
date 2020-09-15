import React from "react";
import NavbarMenu from "./navbar-menu";
import {Link} from "react-router-dom";
import withLogin from "../provider/login/with-login";

const Header = ({isAuthenticated, user}) => {

    return (
        <header className="header_area">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container box_1620">
                        <Link to="/" className="navbar-brand logo_h"><img src="img/logo.png" alt=""/></Link>
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
                                    <div key='login' className='col-6'>
                                        <Link to='/login'>Sing In</Link>
                                    </div>,
                                    <div key='register' className='col-6'>
                                        <Link to='/register'>Sing Up</Link>
                                    </div>
                                ]}
                                {isAuthenticated && <p>{user.username}</p>}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default withLogin(Header);
