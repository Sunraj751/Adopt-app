import {Component} from "react";
import {link, Redirect} from "react-router-dom";

class ErrorBoundary extends Component{
    state = { hasError: false, redirect: false};
    static getDerivedStateFromError(){
        return {hasError: true};
    }
    componentDidCatch(error, info){
        //i will log this to error monitoring services, like Azure Monitor

        console.log("ErrorBoundary caught an error", error, info);
        setTimeour(()=> this.setState({redirect: true}),5000);
    }
    render(){
        if(this.state.redirect){
            return <Redirect to = "/"/>
        }
        else if (this.state.hasError){
            return (
                <h2>
                    This listing has an error. <Link to="/">Click here</Link> to go back to Home page or wait five seconds
                </h2>
            )
        }
        return this.props.children;
    }
}
export default ErrorBoundary