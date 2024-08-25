import React from 'react';

import styles from '../storage/style/components/desktopSystem.module.css';
import AppInstanceIcon from './icons/AppInstanceIcon';
import DirectoryIcon from './icons/DirectoryIcon';
import AppInstanceWindow from './AppInstanceWindow'
import utils from '../storage/scripts/utils/utils';

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

        // Bind the enableWindowInstance method to the DesktopSystem instance
        this.enableWindowInstance = this.enableWindowInstance.bind(this);
        this.closeWindowInstance = this.closeWindowInstance.bind(this);
    }

    getNextPosition(iteration) {
        // iteration + 1 for additional offset in the corner
        const rowsPerColumn = Math.floor((window.innerHeight - this.instanceWindowSize.height) / this.appOffset);
        const horizontalIteration = Math.floor(iteration / rowsPerColumn)
        const verticalIteration = (iteration % rowsPerColumn) + 1;

        let x = (this.instanceWindowSize.width + this.appOffset) * horizontalIteration + this.appOffset * verticalIteration
        let y = this.appOffset * verticalIteration;

        return { x, y };
    }

    getNextPosition_OLD(iteration) {
        // iteration + 1 for additional offset in the corner
        let x, y;
        x = y = this.appOffset * (iteration + 1);

        if (y >= window.innerHeight - this.instanceWindowSize.height) {
            let colRows = Math.floor((window.innerHeight - this.instanceWindowSize.height) / this.appOffset);
            let horizontalIteration = Math.floor((iteration + 1) / colRows);
            x = (this.instanceWindowSize.width + this.appOffset) * horizontalIteration + this.appOffset * ((iteration + 1) % colRows)
            y = this.appOffset * ((iteration + 1) % colRows);
        }
        this.appCurrentPosition = { x, y };
        return this.appCurrentPosition;
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

    enableWindowInstance(instanceName) {
        if (!instanceName) return;

        let instance = this.state.appInstances.find(appInstance => appInstance.name == instanceName);
        if (instance)
            // Focus
            utils.setHighestZIndex(instance.id)
        else
            // Create
            this.createWindowInstance(instanceName)
        this.forceUpdate();
    }

    closeWindowInstance(instanceName) {
        if (!instanceName) return;

        let instance = this.state.appInstances.find(appInstance => appInstance.name == instanceName);
        if (instance) {
            // Remove instance
            this.state.appInstances = this.state.appInstances.filter(appInstance => appInstance.name != instanceName);
            utils.removeId(instance.id);

            this.forceUpdate()
        }
    }

    createWindowInstance(name) {
        let id = utils.getNextId();
        this.state.appInstances.push({
            id: id,
            name: name
        });
    }

    RenderDesktopIcons() {
        return (<>
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="linkedIn" />
            <DirectoryIcon enableWindowFunction={this.enableWindowInstance} name="projects" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="history" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="info" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="mail" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="settings" />
            <AppInstanceIcon enableWindowFunction={this.enableWindowInstance} name="recycle bin" />
        </>);
    }

    RenderInstanceWindows() {
        return (<>{this.state.appInstances.map((appInstance, iteration) => {
            let position = this.getNextPosition(iteration);
            return <AppInstanceWindow
                closeWindowFunction={this.closeWindowInstance}
                position={position}
                name={appInstance.name}
                id={appInstance.id}
                key={`appInstanceWindow_key=${appInstance.id}`} />
        })}</>)
    }
};