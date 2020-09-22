import React, {Component} from 'react';
import Moment from "react-moment";

class CommentItem extends Component {
    render() {
        const {avatar, username, createAt, body, isAnswer} = this.props
        const className = isAnswer ? 'left-padding' : ''
        return (
            <div className={"comment-list " + className}>
                <div className="single-comment justify-content-between d-flex">
                    <div className="user justify-content-between d-flex">
                        <div className="thumb">
                            <img src={avatar} alt=""/>
                        </div>
                        <div className="desc">
                            <h5><a href="#">{username}</a></h5>
                            <p className="date"><Moment format="YYYY-MM-DD HH:mm">{createAt}</Moment></p>
                            <p className="comment">
                                {body}
                            </p>
                        </div>
                    </div>
                    <div className="reply-btn">
                        <a href="" className="btn-reply text-uppercase">reply</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentItem;
