import React from "react";
import {LoginConsumer} from "./login-context";

const withLogin = (Component) => (props) => {
    return (
        <LoginConsumer>
            {(loginMethods) => {
                return <Component {...props} {...loginMethods}/>
            }}
        </LoginConsumer>
    )
}

export default withLogin;
