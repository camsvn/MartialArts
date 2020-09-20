import PropTypes from "prop-types"
import React from "react"
import { Router, Route, IndexRoute } from "react-router"
import { App, Home, Attendance, Login, BeltTest, AddEvents, Events, Library, Profile, EditProfile, AddCourse } from "./containers"

function checkForLoggedIn(nextState, replace, callback){
    let loggedInUser = localStorage.getItem("token")
    if(!loggedInUser){
        replace("/login")
    }

    callback()
}

const PathRoute = (props) => {
    return (
        <Router history={props.history}>
            <Route exact path="/" component={App} >
                <IndexRoute component={Home} />
                {/* <Route path="/home" component={App} /> */}
                <Route path="/attendance" component={Attendance} />
                <Route path="/belttest" component={BeltTest} />
                <Route path="/events" component={Events} />
                <Route path="/addevents" component={AddEvents} />
                <Route path="/library" component={Library} />                          
                <Route path="/editprofile" component={EditProfile} />
                <Route path="/addcourse" component={AddCourse} />
                <Route path="/myprofile" component={Profile} />
            </Route>
            <Route path="/login" component={Login} />
        </Router>
    )
}

PathRoute.propTypes = {
    history: PropTypes.any,
}

export default PathRoute
