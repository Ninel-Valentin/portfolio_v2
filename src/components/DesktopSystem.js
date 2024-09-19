import React from 'react';

import styles from '../storage/style/components/desktopSystem.module.css';
import AppInstanceIcon from './icons/AppInstanceIcon.js';
import DirectoryInstanceIcon from './icons/DirectoryInstanceIcon.js'
import AppInstanceWindow from './window/AppInstanceWindow.js'
import DirectoryInstanceWindow from './window/DirectoryInstanceWindow.js'
import utils from '../storage/scripts/utils/utils';
import Consts from '../storage/scripts/utils/Consts';

export default class DesktopSystem extends React.Component {
    constructor(props) {
        super(props);

        this.instanceWindowSize = {
            // Approximation
            height: 500,
            width: 650
        }
        this.appOffset = 50;

        this.state = {
            // Array of instances of AppWindow
            appInstances: []
        };

        // Bind the methods to the DesktopSystem instance
        this.enableWindowInstance = this.enableWindowInstance.bind(this);
        this.closeWindowInstance = this.closeInstance.bind(this);
        this.createWindowInstance = this.createWindowInstance.bind(this);
        this.createDirectoryInstance = this.createDirectoryInstance.bind(this);
    }

    render() {
        return (<>
            <main>
                {this.RenderDesktopIcons()}
                {this.RenderInstanceWindows()}
                {/* <AppInstanceWindow id={0} position={{ x: 100, y: 500 }} appName="Test" /> */}
                {/* <AppInstanceWindow id={1} appName="test2" /> */}
            </main>
        </>);
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

        let instance = this.state.appInstances.find(appInstance => appInstance.name == instanceName);
        var instanceId;
        if (instance) {
            // if it exists, focus on it
            // Focus
            instanceId = instance.id;
            utils.highlightWindow(instanceId)
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

        this.forceUpdate();
    }

    createWindowInstance(name, src = null) {
        let id = utils.getNextInstanceId();
        this.state.appInstances.push({
            type: Consts.instanceType.App,
            id,
            name,
            src
        });
        return id;
    }

    createDirectoryInstance(name) {
        let id = utils.getNextInstanceId();
        this.state.appInstances.push({
            type: Consts.instanceType.Directory,
            id,
            name
        });
        return id;
    }

    closeInstance(instanceName) {
        if (!instanceName) return;

        let instance = this.desktopSystemReference.state.appInstances.find(appInstance => appInstance.name == instanceName);
        if (instance) {
            // Remove instance
            this.desktopSystemReference.state.appInstances = this.desktopSystemReference.state.appInstances.filter(appInstance => appInstance.name != instanceName);
            utils.removeInstanceId(instance.id);
            this.desktopSystemReference.forceUpdate()
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
        return (<>{this.state.appInstances.map((appInstance, iteration) => {
            let position = this.getNextSpawnPosition(iteration);

            switch (appInstance.type) {
                case Consts.instanceType.App:
                    return <AppInstanceWindow
                        closeWindowFunction={this.closeInstance}
                        desktopSystemReference={this}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        src={appInstance.src || null}
                        key={`appInstanceWindow_key=${appInstance.id}`} />
                case Consts.instanceType.Directory:
                    return <DirectoryInstanceWindow
                        closeWindowFunction={this.closeInstance}
                        desktopSystemReference={this}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        key={`appInstanceWindow_key=${appInstance.id}`} />
            }

        })}</>)
    }
};