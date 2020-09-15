import React, {Component} from 'react'
import withBlogService from "../provider/service/with-blog-service";
import Cookies from 'js-cookie'
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import withLogin from "../provider/login/with-login";
import notice from "../hooks/alerts";

class Login extends Component {

    state = {
        username: '',
        password: '',
        errors: {}
    }

    onChangeInputs = (e) => {
        const elem = e.target
        this.setState({
            [elem.name]: elem.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        await this.props.login(this.state).then((data) => {
            Cookies.set('token', data.token)
            this.props.getUser(data).then(() => {
                notice('Вы авторизованы', 'success')
                this.props.history.push('/')
            })
        }).catch(async (err) => {
            const {res} = err;
            if (res && res.status === 400) {
                const errors = await res.json()
                this.setState({
                    errors
                })
            }
        })
    }

    render() {
        return (
            <div className='container jumbotron'>
                <div className="card col-6 offset-3">
                    <article className="card-body">
                        <a href="" className="float-right btn btn-outline-primary">Sign up</a>
                        <h4 className="card-title mb-4 mt-1">Sign in</h4>
                        {this.state.errors.detail && <div className="text-danger">
                            {this.state.errors.detail}
                        </div>}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Your username</label>
                                <input onChange={this.onChangeInputs} name="username" value={this.state.username}
                                       className="form-control"
                                       placeholder="Username" type="text"/>
                                {this.state.errors.username && <div className="text-danger">
                                    {this.state.errors.username[0]}
                                </div>}

                            </div>
                            <div className="form-group">
                                <a className="float-right" href="#">Forgot?</a>
                                <label>Your password</label>
                                <input onChange={this.onChangeInputs} name='password' className="form-control"
                                       value={this.state.password} placeholder="******"
                                       type="password"/>
                                {this.state.errors.password && <div className="text-danger">
                                    {this.state.errors.password[0]}
                                </div>}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Login</button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        )
    }

}

const mapMethodsToProps = (blogService) => {
    return {
        login: blogService.login
    }
}

export default withBlogService(mapMethodsToProps)(withRouter(withLogin(Login)));
