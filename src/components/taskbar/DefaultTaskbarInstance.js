import React from "react";
import reactUtils from "../../storage/scripts/utils/reactUtils";
import Consts from "../../storage/scripts/utils/Consts";
import styles from '../../storage/style/components/taskbar.module.css';
import utils from "../../storage/scripts/utils/utils";

export default class DefaultTaskbarInstance extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.name = props.name;

        this.setActiveInstanceId = props.setActiveInstanceFunction;
        this.getActiveInstanceId = props.getActiveInstanceFunction;
    }

    isActive() {
        return this.getActiveInstanceId() == this.id;
    }

    render() {
        return (<div
            onClick={(e) => {
                let instanceId = this.id;
                utils.setHighestZIndex(instanceId);
                this.setActiveInstanceId(instanceId);
            }}
            className={`${styles.taskbarAppInstance} ${styles.interactiveTile}${this.isActive() ? ` ${styles.focused}` : ''}`}>
            {reactUtils.loadDisplayIcon(
                Consts.applications.name[this.name]
            )}
        </div>)
    }
}