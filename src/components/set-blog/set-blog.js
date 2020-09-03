import React, {Component} from 'react'
import withBlogService from "../provider/service/with-blog-service";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class SetBlog extends Component {

    state = {
        title: '',
        body: '',
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
        this.props.setBlog(this.state).then((data) => {
            console.log(data)
        }).catch(async ({res}) => {
            if (res.status === 400) {
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
                <div className="card col-8 offset-2">
                    <article className="card-body">
                        <h4 className="card-title mb-4 mt-1">Set blog</h4>
                        {this.state.errors.detail && <div className="text-danger">
                            {this.state.errors.detail}
                        </div>}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input onChange={this.onChangeInputs} name="title" value={this.state.username}
                                       className="form-control"
                                       placeholder="Title" type="text"/>
                                {this.state.errors.title && <div className="text-danger">
                                    {this.state.errors.title[0]}
                                </div>}

                            </div>
                            <div className='form-group'>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                        const body = editor.getData();
                                        this.setState({body})
                                    }}
                                />
                                {this.state.errors.body && <div className="text-danger">
                                    {this.state.errors.body[0]}
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
        setBlog: blogService.setBlog
    }
}

export default withBlogService(mapMethodsToProps)(SetBlog);
