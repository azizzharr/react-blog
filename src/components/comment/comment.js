import React, {Component} from 'react';
import CommentItem from "./comment-item";

class Comment extends Component {
    render() {
        const comments = this.props.comments
        return (
            <div className="comments-area">
                <h4>05 Comments</h4>
                {comments.map((item) => <CommentItem key={item.id} {...item} />)}
            </div>
        );
    }
}

export default Comment;
