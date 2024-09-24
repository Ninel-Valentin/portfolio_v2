import React from 'react';
import styles from '../../storage/style/components/taskbar.module.css';

import { ReactComponent as OSLogo } from '../../storage/svg/os.svg';
import DateTime from './DateTime';
import DefaultTaskbarInstance from './DefaultTaskbarInstance';

export default class Taskbar extends React.Component {
    constructor(props) {
        super(props);

        this.getAppData = props.getAppData;
        this.setAppData = props.setAppData;

        this.forceUpdateApp = props.forceUpdateApp;
        this.setActiveInstanceId = this.setActiveInstanceId.bind(this);
        this.getActiveInstanceId = this.getActiveInstanceId.bind(this);
    }

    render() {
        return (<>
            <section id={styles.taskBar}>
                <OSLogo
                    className={`${styles.interactiveTile}`}
                    id={styles.osLogo} />
                <div id={styles.openApps}>
                    {this.RenderOpenInstanceWindows()}
                </div>
                <DateTime />
            </section>
        </>);
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

    RenderOpenInstanceWindows() {
        const appInstances = this.getAppData().appInstances;
        return (<>{appInstances.map((appInstance, iteration) => {
            return <DefaultTaskbarInstance
                setActiveInstanceFunction={this.setActiveInstanceId}
                getActiveInstanceFunction={this.getActiveInstanceId}
                key={`taskBarAppInstance_key_${appInstance.id}`}
                id={appInstance.id}
                name={appInstance.name}
            />
        })}</>)
    }
};