import React from "react";
import {Redirect} from 'react-router-dom';

const Logout = () => {
    sessionStorage.clear()
    return <Redirect to="/"/>
}

export default Logout