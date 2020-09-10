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

class App extends Component {

    state = {
        user: {},
        isAuthenticated: false,
        loading: true,
    }

    componentDidMount() {
        this.props.getUser().then((data) => {
            this.auth(data)
            this.setState({loading: false})
        }).catch(({res}) => {
            if (res && res.status === 401) {
                this.unAuth()
                this.setState({loading: false})
            }
        })
    }

    auth = (data) => {
        this.setState((state) => ({
            user: data,
            isAuthenticated: true
        }))
    }

    unAuth = () => {
        this.setState({isAuthenticated: false, user: {}})
    }

    render() {
        const {user, isAuthenticated, loading} = this.state;
        const unAuth = this.unAuth;
        const auth = this.auth;
        if (loading) {
            return <Loader/>
        }
        return (
            <LoginProvider value={{user, auth, isAuthenticated, unAuth}}>
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
