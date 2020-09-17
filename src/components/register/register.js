import React, {Component} from 'react'
import withBlogService from "../provider/service/with-blog-service";
import Swal from "sweetalert2";
import {Link, withRouter} from "react-router-dom";
import notice from "../hooks/alerts";

class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        email: '',
        errors: {}
    }

    onChangeInputs = (e) => {
        const elem = e.target
        this.setState({
            [elem.name]: elem.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {password, password2} = this.state
        if (password !== password2) {
            this.setState((state) => {
                const {errors} = state
                return {
                    errors: {...errors, password2: ['Пароли не совпадают']}
                }
            })
            return;
        }
        this.props.register(this.state).then((data) => {
            notice('Вы зарегистрированы', 'success')
            this.props.history.push('/login')
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
                        <Link to='/login' className="float-right btn btn-outline-primary">Sign in</Link>
                        <h4 className="card-title mb-4 mt-1">Sign up</h4>
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
                                <label>Your Email</label>
                                <input required onChange={this.onChangeInputs} name="email" value={this.state.email}
                                       className="form-control"
                                       placeholder="Email" type="email"/>
                                {this.state.errors.email && <div className="text-danger">
                                    {this.state.errors.email[0]}
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
                                <a className="float-right" href="#">Forgot?</a>
                                <label>Confirm password</label>
                                <input onChange={this.onChangeInputs} name='password2' className="form-control"
                                       value={this.state.password2} placeholder="******"
                                       type="password"/>
                                {this.state.errors.password2 && <div className="text-danger">
                                    {this.state.errors.password2[0]}
                                </div>}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Sing up</button>
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
        register: blogService.register
    }
}

export default withBlogService(mapMethodsToProps)(withRouter(Register));
