import React, {Component} from 'react';

class Comment extends Component {
    render() {
        return (
            <div className="comments-area">
                <h4>05 Comments</h4>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c1.jpg" alt=""/>
                            </div>
                            <div className="desc">
                                <h5><a href="#">Emilly Blunt</a></h5>
                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">reply</a>
                        </div>
                    </div>
                </div>
                <div className="comment-list left-padding">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c2.jpg" alt=""/>
                            </div>
                            <div className="desc">
                                <h5><a href="#">Elsie Cunningham</a></h5>
                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">reply</a>
                        </div>
                    </div>
                </div>
                <div className="comment-list left-padding">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c3.jpg" alt=""/>
                            </div>
                            <div className="desc">
                                <h5><a href="#">Annie Stephens</a></h5>
                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">reply</a>
                        </div>
                    </div>
                </div>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c4.jpg" alt=""/>
                            </div>
                            <div className="desc">
                                <h5><a href="#">Maria Luna</a></h5>
                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">reply</a>
                        </div>
                    </div>
                </div>
                <div className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                        <div className="user justify-content-between d-flex">
                            <div className="thumb">
                                <img src="/img/blog/c5.jpg" alt=""/>
                            </div>
                            <div className="desc">
                                <h5><a href="#">Ina Hayes</a></h5>
                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                <p className="comment">
                                    Never say goodbye till the end comes!
                                </p>
                            </div>
                        </div>
                        <div className="reply-btn">
                            <a href="" className="btn-reply text-uppercase">reply</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
