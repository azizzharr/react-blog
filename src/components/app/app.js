import React, {Component} from "react";
import Header from "../header";
import HeroBanner from "../hero-banner";
import BlogPostArea from "../blog-post-area/blog-post-area";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "../login";
import Register from "../register/register";
import SetBlog from "../set-blog/set-blog";
import {LoginProvider} from "../provider/login/login-context";
import withBlogService from "../provider/service/with-blog-service";
import Loader from "../loader";
import DetailHeroBanner from "../detail-blog/detail-hero-banner";
import DetailBlog from "../detail-blog/detail-blog";
import UpdateBlog from "../update-blog/update-blog";

class App extends Component {

    state = {
        user: {},
        isAuthenticated: false,
        loading: true,
    }

    componentDidMount() {
        this.getUser().then(() => {
            this.setState({loading: false})
        });
    }

    getUser = async () => {
        await this.props.getUser().then((data) => {
            this.setState({user: data, isAuthenticated: true})
        }).catch(({res}) => {
            if (res && res.status === 401) {
                this.unAuth()
            }
        })
    }

    unAuth = () => {
        this.setState({isAuthenticated: false, user: {}})
    }

    render() {
        const {user, isAuthenticated, loading} = this.state;
        const unAuth = this.unAuth;
        const getUser = this.getUser;
        if (loading) {
            return <Loader/>
        }
        return (
            <LoginProvider value={{user, getUser, isAuthenticated, unAuth}}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path='/'>
                            <HeroBanner/>
                            <BlogPostArea/>
                        </Route>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/set-blog' component={SetBlog}/>
                        <Route exact path='/update-blog/:id' component={UpdateBlog}/>
                        <Route exact path='/blog/:id'>
                            <DetailBlog/>
                        </Route>
                    </Switch>
                </Router>
            </LoginProvider>
        )
    }
}

const mapMethodsToProps = (blogService) => {
    return {
        getUser: blogService.getUser
    }
}

export default withBlogService(mapMethodsToProps)(App);
