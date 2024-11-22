import React from 'react';
import styles from '../../storage/style/taskbar/taskbar.module.css';

import { ReactComponent as OSLogo } from '../../storage/svg/os.svg';
import DateTime from './DateTime';
import TaskbarAppInstance from './TaskbarAppInstance.js';

export default class Taskbar extends React.Component {
    constructor(props) {
        super(props);
        this.appUtils = props.appUtils;

        this.forceUpdateTaskbar = this.forceUpdateTaskbar.bind(this);
    }
    render() {
        return (<section
            id={styles.taskBar}
            onClick={(e) => {
                // Need this to prevent the propagation from apps
                this.appUtils.removeTaskbarContextMenu();
                this.appUtils.forceUpdateApp();
            }}>
            <OSLogo
                className={`${styles.interactiveTile}`}
                id={styles.osLogo} />
            <div id={styles.openApps}>
                {this.RenderOpenInstanceWindows()}
            </div>
            <DateTime />
        </section>);
    }

    forceUpdateTaskbar() {
        this.forceUpdate();
    }

    RenderOpenInstanceWindows() {
        const appInstances = this.appUtils.getAppData().instances.entries;
        return (<>{appInstances.map((appInstance, iteration) => {
            return <TaskbarAppInstance
                forceUpdateTaskbar={this.forceUpdateTaskbar}
                appUtils={this.appUtils}
                key={`taskBarAppInstance_key_${appInstance.id}`}
                id={appInstance.id}
                name={appInstance.name}
            />
        })}</>)
    }
};