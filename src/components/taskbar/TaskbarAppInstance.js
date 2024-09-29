import React from "react";
import reactUtils from "../../storage/scripts/utils/reactUtils";
import Consts from "../../storage/scripts/utils/Consts";
import styles from '../../storage/style/components/taskbar.module.css';
import utils from "../../storage/scripts/utils/utils";
import TaskbarTooltipMenu from "./TaskbarTooltipMenu";

export default class TaskbarAppInstance extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.name = props.name;

        this.forceUpdateTaskbar = props.forceUpdateTaskbar;

        this.getAppData = props.getAppData;
        this.setAppData = props.setAppData;
        this.forceUpdateApp = props.forceUpdateApp;
    }

    isActive() {
        return this.getActiveInstanceId() == this.id;
    }

    setActiveInstanceId(instanceId) {
        this.setAppData({
            ...this.getAppData(),
            activeInstanceId: instanceId
        });
        this.forceUpdateApp()
    }

    getActiveInstanceId() {
        return this.getAppData().activeInstanceId;
    }

    loadContextMenu() {
        return this.getAppData().taskbar.activeContext == this.id ? (<TaskbarTooltipMenu name={this.name} />) : null;
    }

    render() {
        return (<div
            onClick={(e) => {
                let instanceId = this.id;
                utils.setHighestZIndex(instanceId);
                this.setActiveInstanceId(instanceId);
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                const data = this.getAppData();
                this.setAppData({
                    ...data,
                    taskbar: {
                        ...data.taskbar,
                        activeContext: this.id
                    }
                });
                this.forceUpdateTaskbar()
            }}
            className={`${styles.taskbarAppInstance} ${styles.interactiveTile}${this.isActive() ? ` ${styles.focused}` : ''}`}>
            {reactUtils.loadDisplayIcon(Consts.applications.name[this.name])}
            {this.loadContextMenu()}
        </div>)
    }
}