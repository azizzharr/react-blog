import React from 'react';
import {withRouter, Link, matchPath} from "react-router-dom";

const MyLink = ({children, className: classNameProp, to, exact, sensitive, strict, location}) => {
    const isActive = !!matchPath(location.pathname,
        {
            path: to,
            exact: exact,
            sensitive: sensitive,
            strict: strict
        }
    )
    const className = isActive ? `${classNameProp} active` : classNameProp;
    if (isActive) {
        return <span className={`pointer ${className}`}>{children}</span>
    }
    return (
        <Link to={to} className={className}>
            {children}
        </Link>
    );
}


export default withRouter(MyLink);
