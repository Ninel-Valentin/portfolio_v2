import React from "react";
import reactUtils from "../../storage/scripts/utils/reactUtils.js";
import Consts from "../../storage/scripts/utils/Consts.js";
import utils from "../../storage/scripts/utils/utils.js";
import styles from '../../storage/style/components/taskbar.module.css';
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
                let instanceId = this.id;
                if (this.appUtils.getMinimizedStatus(instanceId) || this.appUtils.isIdActive(this.id)) {
                    this.windowActionToggleMinimize()
                }
                if (!this.appUtils.isIdActive(this.id)) {
                    this.appUtils.setHighestZIndex(instanceId);
                    this.appUtils.setActiveInstanceId(instanceId);
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
            {reactUtils.loadDisplayIcon(Consts.applications.name[this.name])}
            {this.loadContextMenu()}
        </div>)
    }

    loadContextMenu() {
        return this.appUtils.getAppData().taskbar.activeContext == this.id ?
            (<TaskbarTooltipMenu
                name={this.name}
                id={this.id}
                appUtils={this.appUtils}
                windowActionToggleMinimize={this.windowActionToggleMinimize} />)
            : null;
    }

    windowActionToggleMinimize() {
        this.appUtils.toggleInstanceMinimizedStatus(this.id);
        if (this.appUtils.getMinimizedStatus(this.id))
            utils.applyMinimizeAnimation(this.id);
        else
            utils.applyRestoreAnimation(this.id);

        setTimeout(() => {
            this.appUtils.forceUpdateApp();
        }, Consts.minimizeAnimationDuration * .9);
    }
}