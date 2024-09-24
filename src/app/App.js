import React, { useState } from "react";
import Screen from "../components/Screen.js";
import Taskbar from "../components/taskbar/Taskbar.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.appData = "test";

        // console.log("App constructor")
        // console.log("appData: " + this.appData)
    }

    setAppData(value) {
        this.appData = value;
    }

    render() {
        return (<>
            <Screen />
            <Taskbar />
        </>);
    }
}