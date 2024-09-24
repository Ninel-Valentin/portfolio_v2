import React from 'react';

import styles from '../storage/style/components/desktopSystem.module.css';
import AppInstanceIcon from './icons/AppInstanceIcon.js';
import DirectoryInstanceIcon from './icons/DirectoryInstanceIcon.js'
import AppInstanceWindow from './instance/AppInstanceWindow.js'
import DirectoryInstanceWindow from './instance/DirectoryInstanceWindow.js'
import utils from '../storage/scripts/utils/utils.js';
import Consts from '../storage/scripts/utils/Consts.js';

export default class DesktopSystem extends React.Component {
    constructor(props) {
        super(props);

        this.instanceWindowSize = {
            // Approximation
            height: 500,
            width: 650
        }
        this.appOffset = 50;

        this.getAppData = props.getAppData;
        this.setAppData = props.setAppData;
        this.forceUpdateApp = props.forceUpdateApp;

        // Bind the methods to the DesktopSystem instance
        this.setActiveInstanceId = this.setActiveInstanceId.bind(this);
        this.getActiveInstanceId = this.getActiveInstanceId.bind(this);

        this.enableWindowInstance = this.enableWindowInstance.bind(this);
        this.closeInstance = this.closeInstance.bind(this);
        this.createWindowInstance = this.createWindowInstance.bind(this);
        this.createDirectoryInstance = this.createDirectoryInstance.bind(this);
    }

    render() {
        return (<>
            <main>
                {this.RenderDesktopIcons()}
                {this.RenderInstanceWindows()}
            </main>
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

    getNextSpawnPosition(iteration) {
        // iteration + 1 for additional offset in the corner
        const rowsPerColumn = Math.floor((window.innerHeight - this.instanceWindowSize.height) / this.appOffset);
        const horizontalIteration = Math.floor(iteration / rowsPerColumn)
        const verticalIteration = (iteration % rowsPerColumn) + 1;

        let x = (this.instanceWindowSize.width + this.appOffset) * horizontalIteration + this.appOffset * verticalIteration
        let y = this.appOffset * verticalIteration;

        return { x, y };
    }

    enableWindowInstance(instanceName, src = null, appName) {
        if (!instanceName) return;

        const appInstances = this.getAppData().appInstances;

        let instance = appInstances.find(appInstance => appInstance.name == instanceName);
        var instanceId;
        if (instance) {
            // if it exists, focus on it
            instanceId = instance.id;
            // Set active instanceId
            utils.setHighestZIndex(instanceId)
        }
        else {
            // Open app window / directory
            if (appName.includes('App'))
                instanceId = this.createWindowInstance(instanceName, src)
            else
                instanceId = this.createDirectoryInstance(instanceName)
            utils.addNewZIndex(instanceId);
        }

        this.setAppData({
            ...this.getAppData(),
            activeInstanceId: instanceId
        });

        this.forceUpdateApp();
    }

    createWindowInstance(name, src = null) {
        let id = utils.getNextInstanceId();
        const appInstances = this.getAppData().appInstances;
        appInstances.push({
            type: Consts.instanceType.App,
            id,
            name,
            src
        });
        this.setAppData({
            ...this.getAppData(),
            appInstances
        });
        return id;
    }

    createDirectoryInstance(name) {
        let id = utils.getNextInstanceId();
        const appInstances = this.getAppData().appInstances;
        appInstances.push({
            type: Consts.instanceType.Directory,
            id,
            name
        });
        this.setAppData({
            ...this.getAppData(),
            appInstances
        });
        return id;
    }

    closeInstance(instanceName) {
        if (!instanceName) return;
        const appInstances = this.getAppData().appInstances;
        let instance = appInstances.find(appInstance => appInstance.name == instanceName);
        if (instance) {
            // Remove instance
            this.setAppData({
                ...this.getAppData(),
                appInstances: appInstances.filter(appInstance => appInstance.name != instanceName)
            });
            utils.removeInstanceId(instance.id);
            this.forceUpdateApp()
        }
    }

    RenderDesktopIcons() {
        return (<>
            {/* TODO: https://www.linkedin.com/badges/profile/create?vanityname=ninel-valentin-banica&preferredlocale=en_US&trk=public_profile-settings_badge */}
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} src="https://www.linkedin.com/in/ninel-valentin-banica/" name="linkedin" />
            <DirectoryInstanceIcon enableWindowFunction={this.enableWindowInstance} name="projects" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="history" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="info" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="mail" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="settings" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="recycle bin" />
        </>);
    }

    RenderInstanceWindows() {
        const appData = this.getAppData();
        return (<>{appData.appInstances.map((appInstance, iteration) => {
            let position = this.getNextSpawnPosition(iteration);
            switch (appInstance.type) {
                case Consts.instanceType.App:
                    return <AppInstanceWindow
                        setActiveInstanceFunction={this.setActiveInstanceId}
                        getActiveInstanceFunction={this.getActiveInstanceId}
                        closeWindowFunction={this.closeInstance}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        src={appInstance.src || null}
                        key={`appInstanceWindow_key_${appInstance.id}`} />
                case Consts.instanceType.Directory:
                    return <DirectoryInstanceWindow
                        setActiveInstanceFunction={this.setActiveInstanceId}
                        getActiveInstanceFunction={this.getActiveInstanceId}
                        closeWindowFunction={this.closeInstance}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        key={`appInstanceWindow_key_${appInstance.id}`} />
            }

        })}</>)
    }
};