import React from "react";
import Screen from "../components/Screen.js";
import Taskbar from "../components/taskbar/Taskbar.js";
import appUtils from "../storage/scripts/utils/appUtils.js";
import Consts from "../storage/scripts/utils/Consts.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.appData = {
            // Array of instances of AppWindow
            instances: {
                /** entries JSON Schema
                 * type: Consts.instanceType[App/Directory]
                 * id: String
                 * name: String
                 * src: String/null
                 * zIndex: number
                 * isResizeable: bool - if false, isMinimized and isMaximized will no longer be used
                 * isMinimized: bool - minimized or shown on the screen
                 * isMaximized: bool - fullscreen or normal size
                */
                entries: [],
                activeId: null
            },
            taskbar: {
                activeContext: null
            },
            // Same rule as in css
            deviceType: window.innerWidth <= 600 ? Consts.deviceType.Mobile : Consts.deviceType.Desktop,
            content: {
                history: {
                    activeId: null
                },
                project: {
                    activeId: null
                }
            }
        };

        // Bind references to parent as they will be called from another instance
        this.getAppData = this.getAppData.bind(this);
        this.setAppData = this.setAppData.bind(this);
        this.forceUpdateApp = this.forceUpdateApp.bind(this);

        // Main point of control
        this.appUtils = new appUtils(this.setAppData, this.getAppData, this.forceUpdateApp);

        window.addEventListener('resize', (e) => {
            let deviceType = window.innerWidth <= 600 ? Consts.deviceType.Mobile : Consts.deviceType.Desktop;
            if (this.getAppData().deviceType != deviceType)
                this.setAppData({
                    ...this.getAppData(),
                    deviceType
                });
        });
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
            <Screen appUtils={this.appUtils} />
            <Taskbar appUtils={this.appUtils} />
        </>);
    }
}