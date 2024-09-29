import React, { useState } from "react";
import Screen from "../components/Screen.js";
import Taskbar from "../components/taskbar/Taskbar.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.appData = {
            // Array of instances of AppWindow
            appInstances: [],
            activeInstanceId: null,
            taskbar: {
                activeContext: null
            }
        };

        // Bind references to parent as they will be called from another instance
        this.getAppData = this.getAppData.bind(this);
        this.setAppData = this.setAppData.bind(this);
        this.forceUpdateApp = this.forceUpdateApp.bind(this);
    }

    getAppData() {
        return this.appData;
    }

    setAppData(value) {
        this.appData = value;
    }

    forceUpdateApp() {
        this.forceUpdate();
    }

    render() {
        return (<>
            <Screen
                forceUpdateApp={this.forceUpdateApp}
                setAppData={this.setAppData}
                getAppData={this.getAppData} />
            <Taskbar
                forceUpdateApp={this.forceUpdateApp}
                setAppData={this.setAppData}
                getAppData={this.getAppData} />
        </>);
    }
}