import React, {Component} from 'react'
import withBlogService from "../provider/service/with-blog-service";
import Cookies from 'js-cookie'
import {withRouter} from "react-router-dom";
import withLogin from "../provider/login/with-login";
import notice from "../hooks/alerts";

class Login extends Component {

    state = {
        data: {
            username: '',
            password: '',
        },
        disabled: false,
        errors: {}
    }

    onChangeInputs = (e) => {
        const el = e.target
        this.setState(({data}) => ({
            data: {
                ...data,
                [el.name]: el.value
            }
        }))
    }

    onSubmit = async (e) => {
        e.preventDefault()
        this.setState({disabled: true})
        console.log(this.state.data)
        await this.props.login(this.state.data).then((data) => {
            Cookies.set('token', data.token)
            this.props.getUser().then(() => {
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
            this.setState({disabled: false})
        })
    }

    render() {
        const {disabled, data, errors} = this.state
        return (
            <div className='container jumbotron'>
                <div className="card col-6 offset-3">
                    <article className="card-body">
                        <a href="" className="float-right btn btn-outline-primary">Sign up</a>
                        <h4 className="card-title mb-4 mt-1">Sign in</h4>
                        {errors.detail && <div className="text-danger">
                            {errors.detail}
                        </div>}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Your username</label>
                                <input onChange={this.onChangeInputs} name="username" value={data.username}
                                       className="form-control"
                                       placeholder="Username" type="text"/>
                                {errors.username && <div className="text-danger">
                                    {errors.username[0]}
                                </div>}

                            </div>
                            <div className="form-group">
                                <a className="float-right" href="#">Forgot?</a>
                                <label>Your password</label>
                                <input onChange={this.onChangeInputs} name='password' className="form-control"
                                       value={data.password} placeholder="******"
                                       type="password"/>
                                {this.state.errors.password && <div className="text-danger">
                                    {this.state.errors.password[0]}
                                </div>}
                            </div>
                            <div className="form-group">
                                <button disabled={disabled} type="submit" className="btn btn-primary btn-block"> Login
                                </button>
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
