import React from "react";
import reactUtils from "../../storage/scripts/utils/reactUtils";
import Consts from "../../storage/scripts/utils/Consts";
import styles from '../../storage/style/components/taskbar.module.css';
import TaskbarTooltipMenu from "./TaskbarTooltipMenu";

export default class TaskbarAppInstance extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.name = props.name;

        this.forceUpdateTaskbar = props.forceUpdateTaskbar;
        this.appUtils = props.appUtils;
    }

    loadContextMenu() {
        return this.appUtils.getAppData().taskbar.activeContext == this.id ? (<TaskbarTooltipMenu name={this.name} />) : null;
    }

    render() {
        return (<div
            onClick={(e) => {
                let instanceId = this.id;
                this.appUtils.setHighestZIndex(instanceId);
                this.appUtils.setActiveInstanceId(instanceId);
                this.appUtils
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                const data = this.appUtils.getAppData();
                this.appUtils.setAppData({
                    ...data,
                    taskbar: {
                        ...data.taskbar,
                        activeContext: this.id
                    }
                });
                this.forceUpdateTaskbar()
            }}
            className={`${styles.taskbarAppInstance} ${styles.interactiveTile}${this.appUtils.isIdActive(this.id) ? ` ${styles.focused}` : ''}`}>
            {reactUtils.loadDisplayIcon(Consts.applications.name[this.name])}
            {this.loadContextMenu()}
        </div>)
    }
}