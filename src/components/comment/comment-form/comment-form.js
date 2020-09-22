import React, {Component} from 'react';
import withBlogService from "../../provider/service/with-blog-service";

class CommentForm extends Component {

    state = {
        body: '',
        errors: {}
    }

    onChange = (e) => {
        const elem = e.target
        this.setState({
            body: elem.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const news = this.props.news
        const body = this.state.body.trim()
        if (body.length === 0) {
            this.setState({errors: {body: ['Required']}})
            return;
        }
        const data = {news, body}
        this.props.setComment(data).then((data) => {
            this.props.appendComment(data)
        })
    }

    render() {
        return (
            <div className="comment-form">
                <h4>Leave a Reply</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                            <textarea onChange={this.onChange} value={this.state.body} className="form-control mb-10" rows="5" name="message"
                                      placeholder="Messege"
                                      required/>
                        {this.state.errors.body && <div className="text-danger">
                            {this.state.errors.body[0]}
                        </div>}
                    </div>
                    <button className="button submit_btn">Post Comment</button>
                </form>
            </div>
        );
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        setComment: blogService.setComment
    }
}

export default withBlogService(mapMethodsToProps)(CommentForm);
