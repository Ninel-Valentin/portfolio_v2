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
        this.appOffset = 50;

        this.appUtils = props.appUtils;

        // Bind the methods to the DesktopSystem instance
        this.enableWindowInstance = this.enableWindowInstance.bind(this);
        this.closeInstance = this.closeInstance.bind(this);
        this.createWindowInstance = this.createWindowInstance.bind(this);
    }

    render() {
        return (<>
            <main>
                {this.RenderDesktopIcons()}
                {this.RenderInstanceWindows()}
            </main>
        </>);
    }

    getNextSpawnPosition(iteration) {
        // iteration + 1 for additional offset in the corner
        const rowsPerColumn = Math.floor((window.innerHeight - Consts.windowInstanceSize.height) / this.appOffset);
        const horizontalIteration = Math.floor(iteration / rowsPerColumn)
        const verticalIteration = (iteration % rowsPerColumn) + 1;

        let x = (Consts.windowInstanceSize.width + this.appOffset) * horizontalIteration + this.appOffset * verticalIteration
        let y = this.appOffset * verticalIteration;

        return { x, y };
    }

    /**
     * Checks for the instanceName, if it exists, it will be focused, else create it
     */
    enableWindowInstance(instanceName, appName, src = null) {
        if (!instanceName) return;

        const appData = this.appUtils.getAppData();
        const appInstances = appData.instances.entries;

        let instance = appInstances.find(appInstance => appInstance.name == instanceName);
        var instanceId;
        if (instance) {
            // if it exists, focus on it
            instanceId = instance.id;
            // Set active instanceId
            this.appUtils.setHighestZIndex(instanceId);
        }
        else
            // Open app window / directory
            instanceId = this.createWindowInstance(instanceName, appName, src)

        this.appUtils.setActiveInstanceId(instanceId);
        this.appUtils.forceUpdateApp();
    }

    createWindowInstance(name, appName, src = null) {
        let id = this.appUtils.getNextInstanceId();

        this.appUtils.addNewInstance({
            type: appName.includes('App') ? Consts.instanceType.App : Consts.instanceType.Directory,
            id,
            name,
            src
        });
        return id;
    }

    closeInstance(instanceName) {
        if (!instanceName) return;

        this.appUtils.removeInstance(instanceName);
        this.appUtils.forceUpdateApp()
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
        const appData = this.appUtils.getAppData();
        return (<>{appData.instances.entries.map((appInstance, iteration) => {
            let position = this.getNextSpawnPosition(iteration);
            switch (appInstance.type) {
                case Consts.instanceType.App:
                    return <AppInstanceWindow
                        appUtils={this.appUtils}
                        closeWindowFunction={this.closeInstance}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        src={appInstance.src || null}
                        key={`appInstanceWindow_key_${appInstance.id}`} />
                case Consts.instanceType.Directory:
                    return <DirectoryInstanceWindow
                        appUtils={this.appUtils}
                        closeWindowFunction={this.closeInstance}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        key={`appInstanceWindow_key_${appInstance.id}`} />
            }

        })}</>)
    }
};