import React from 'react';
import styles from '../../storage/style/components/taskbar.module.css';

import { ReactComponent as OSLogo } from '../../storage/svg/os.svg';
import DateTime from './DateTime';
import TaskbarAppInstance from './TaskbarAppInstance.js';

export default class Taskbar extends React.Component {
    constructor(props) {
        super(props);

        this.getAppData = props.getAppData;
        this.setAppData = props.setAppData;

        this.forceUpdateApp = props.forceUpdateApp;
        this.forceUpdateTaskbar = this.forceUpdateTaskbar.bind(this);
    }
    render() {
        return (<section
            id={styles.taskBar}
            onClick={(e) => {
                const appData = this.getAppData();
                this.setAppData({
                    ...appData,
                    taskbar: {
                        ...appData.taskbar,
                        activeContext: null
                    }
                });
                this.forceUpdateApp();
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
        const appInstances = this.getAppData().appInstances;
        return (<>{appInstances.map((appInstance, iteration) => {
            return <TaskbarAppInstance
                forceUpdateTaskbar={this.forceUpdateTaskbar}
                getAppData={this.getAppData}
                setAppData={this.setAppData}
                forceUpdateApp={this.forceUpdateApp}
                key={`taskBarAppInstance_key_${appInstance.id}`}
                id={appInstance.id}
                name={appInstance.name}
            />
        })}</>)
    }
};