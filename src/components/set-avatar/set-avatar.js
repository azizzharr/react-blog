import React, {Component} from 'react';
import notice from "../hooks/alerts";
import {withRouter, Redirect} from "react-router-dom";
import withBlogService from "../provider/service/with-blog-service";
import withLogin from "../provider/login/with-login";

class SetAvatar extends Component {
    state = {
        data: {
            username: '',
        },
        errors: {}
    }

    constructor() {
        super();
        this.avatar = React.createRef();
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
    onSubmit = (e) => {
        e.preventDefault()
        const files = this.avatar.current.files
        let data = this.state.data
        if (files.length > 0) {
            data = {
                ...data,
                avatar: files[0]
            }
        }
        if (data.username.trim().length === 0) {
            delete data['username']
        }

        this.props.setAvatar(data).then((data) => {
            this.props.setUserApp(data, () => {
                notice('Сохранено', 'success')
                this.props.history.push('/')
            })
        }).catch(async ({res}) => {
            if (res && res.status === 400) {
                const errors = await res.json()
                this.setState({
                    errors
                })
            }
        })
    }

    render() {
        const state = this.state
        if (!this.props.isAuthenticated) {
            notice('Вы не авторизованы', 'warning')
            return <Redirect to='/login'/>
        }
        return (
            <div className='container jumbotron'>
                <div className="card col-6 offset-3">
                    <article className="card-body">
                        <a href="" className="float-right btn btn-outline-primary">Sign up</a>
                        <h4 className="card-title mb-4 mt-1">Sign in</h4>
                        {state.errors.detail && <div className="text-danger">
                            {state.errors.detail}
                        </div>}
                        <form onSubmit={this.onSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <label>Your username</label>
                                <input onChange={this.onChangeInputs} name="username" value={state.data.username}
                                       className="form-control"
                                       placeholder="Username" type="text"/>
                                {state.errors.username && <div className="text-danger">
                                    {state.errors.username[0]}
                                </div>}

                            </div>
                            <div className="form-group">
                                <input ref={this.avatar} name="image"
                                       type="file"/>
                                {state.errors.avatar && <div className="text-danger">
                                    {state.errors.avatar[0]}
                                </div>}

                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Сохранить</button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>

        );
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        setAvatar: blogService.setAvatar
    }
}

export default withBlogService(mapMethodsToProps)(withRouter(withLogin(SetAvatar)));

