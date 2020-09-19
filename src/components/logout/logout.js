import React, {Component} from 'react';
import withLogin from "../provider/login/with-login";
import withBlogService from "../provider/service/with-blog-service";
import Cookies from "js-cookie";
import notice from "../hooks/alerts";
import {Redirect} from "react-router-dom";

class Logout extends Component {
    state = {
        loading: true,
        error: null
    }

    componentDidMount() {
        this.logout().then(() => {
            this.setState({loading: false})
        })
    }

    logout = async () => {
        await this.props.logout().then(() => {
            Cookies.remove('token')
            notice('Вы успешно вышли', 'success')
            this.props.unAuth()
        }).catch((err) => {
            console.log(err)
            this.setState({error: err.toString()})
        })
    }


    render() {
        const {loading, error} = this.state
        if (!loading) {
            if (error) {
                notice(error, 'error')
            }
            return <Redirect to="/"/>
        }
        return null;
    }
}

const mapMethodsToProps = (blogService) => {
    return {logout: blogService.logout}
}

export default withBlogService(mapMethodsToProps)(withLogin(Logout));
