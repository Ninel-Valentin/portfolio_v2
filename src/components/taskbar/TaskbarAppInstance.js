import React from "react";
import reactUtils from "../../storage/scripts/utils/reactUtils.js";
import Consts from "../../storage/scripts/utils/Consts.js";
import styles from '../../storage/style/taskbar/taskbar.module.css';
import TaskbarTooltipMenu from "./TaskbarTooltipMenu.js";

export default class TaskbarAppInstance extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.name = props.name;

        this.forceUpdateTaskbar = props.forceUpdateTaskbar;
        this.appUtils = props.appUtils;
    }

    render() {
        return (<div
            onClick={(e) => {
                if (this.appUtils.getMinimizedStatus(this.id) || this.appUtils.isIdActive(this.id)) {
                    this.appUtils.windowActionToggleMinimize(this.id)
                }
                if (!this.appUtils.isIdActive(this.id)) {
                    this.appUtils.setHighestZIndex(this.id);
                    this.appUtils.setActiveInstanceId(this.id);
                }
                this.forceUpdateTaskbar();
                e.stopPropagation();
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
            data-select={`taskbarInstanceWindow_${this.id}`}
            className={`${styles.taskbarAppInstance} ${styles.interactiveTile}${this.appUtils.isIdActive(this.id) ? ` ${styles.focused}` : ''}`}>
            {reactUtils.loadDisplayIcon(Consts.applications.type[this.name])}
            {this.loadContextMenu()}
        </div>)
    }

    loadContextMenu() {
        return this.appUtils.getAppData().taskbar.activeContext == this.id ?
            (<TaskbarTooltipMenu
                name={this.name}
                id={this.id}
                appUtils={this.appUtils}
                forceUpdateTaskbar={this.forceUpdateTaskbar}
                windowActionToggleMinimize={this.windowActionToggleMinimize} />)
            : null;
    }


}