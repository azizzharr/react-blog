import React, {Component} from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import parse from 'html-react-parser';
import './blog-item.css'
import withLogin from "../../provider/login/with-login";
import Swal from "sweetalert2";
import withBlogService from "../../provider/service/with-blog-service";
import notice from "../../hooks/alerts";

class BlogItem extends Component {

    deleteBlog = (id) => {
        Swal.fire({
            title: 'Do you want delete?',
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteBlog(id).then(() => {
                    this.props.getBlogsFromServer()
                    notice('Удалено', 'success')
                })
            }
        })
    }

    render() {
        const {item, isAuthenticated} = this.props
        return (
            <div className="single-recent-blog-post">
                <div className="thumb">
                    <img className="img-fluid" src={item.imageBlog} alt=""/>
                    <ul className="thumb-info">
                        <li><a href="#"><i className="ti-user"/>{item.author}</a></li>
                        <li><a href="#"><i className="ti-notepad"/><Moment
                            format="YYYY-MM-DD HH:mm">{item.createAt}</Moment></a></li>
                        <li><a href="#"><i className="ti-themify-favicon"/>2 Comments</a></li>
                    </ul>
                </div>
                <div className="details mt-20">
                    <a href="blog-single.html">
                        <h3>{item.title}</h3>
                    </a>
                    <p className="tag-list-inline">Type: <a href="#">{item.type}</a></p>
                    <div>{parse(item.body)}</div>
                    <a className="button" href="#">Read More <i className="ti-arrow-right"/></a>
                    {isAuthenticated && <i onClick={() => this.deleteBlog(item.id)} className='fa fa-trash trash'/>}
                </div>
            </div>
        )
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        deleteBlog: blogService.deleteBlog
    }
}

export default withBlogService(mapMethodsToProps)(withLogin(BlogItem));
