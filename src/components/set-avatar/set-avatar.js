import React, {Component} from 'react';
import notice from "../hooks/alerts";
import {Redirect} from "react-router-dom";
import withBlogService from "../provider/service/with-blog-service";
import withLogin from "../provider/login/with-login";

class SetAvatar extends Component {
    state = {
        image: '',
        errors:{}
    }
    onChangeFile = (e) => {
        const elem = e.target
        this.setState( {
                 image: elem.files[0]
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.setAvatar({image: this.state.image}).then((data) => {
            notice('Сохранено', 'success')
            console.log(data)
            this.setState({image: null})
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

            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <input onChange={this.onChangeFile} name="image"
                           type="file"/>
                    {state.errors.image && <div className="text-danger">
                        {state.errors.image[0]}
                    </div>}

                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"> Сохранить</button>
                </div>
            </form>
        );
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        setAvatar: blogService.setAvatar
    }
}

export default withBlogService(mapMethodsToProps)(withLogin(SetAvatar));

