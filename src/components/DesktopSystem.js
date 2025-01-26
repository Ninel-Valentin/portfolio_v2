import React from 'react';

import styles from '../storage/style/desktopSystem.module.css';
import AppInstanceIcon from './icons/AppInstanceIcon.js';
import DirectoryInstanceIcon from './icons/DirectoryInstanceIcon.js'
import AppInstanceWindow from './instance/AppInstanceWindow.js'
import DirectoryInstanceWindow from './instance/DirectoryInstanceWindow.js'
import Consts from '../storage/scripts/utils/Consts.js';

export default class DesktopSystem extends React.Component {
    constructor(props) {
        super(props);
        this.appOffset = 50;

        this.appUtils = props.appUtils;
    }

    render() {
        return (<>
            <main className='directoryDisplay'>
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

    RenderDesktopIcons() {
        return (<>
            {/* TODO: https://www.linkedin.com/badges/profile/create?vanityname=ninel-valentin-banica&preferredlocale=en_US&trk=public_profile-settings_badge */}
            {/* <AppInstanceIcon appUtils={this.appUtils} src="https://www.linkedin.com/in/ninel-valentin-banica/" name="linkedin" /> */}
            <DirectoryInstanceIcon appUtils={this.appUtils} name="social" />
            <AppInstanceIcon appUtils={this.appUtils} name="projects" />
            <AppInstanceIcon appUtils={this.appUtils} name="history" />
            <AppInstanceIcon appUtils={this.appUtils} name="about" />
            <AppInstanceIcon appUtils={this.appUtils} name="settings" />
            <AppInstanceIcon appUtils={this.appUtils} name="recycle bin" />
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
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        src={appInstance.src || null}
                        instanceType={appInstance.type}
                        key={`appInstanceWindow_key_${appInstance.id}`} />
                case Consts.instanceType.Directory:
                    return <DirectoryInstanceWindow
                        appUtils={this.appUtils}
                        position={position}
                        name={appInstance.name}
                        id={appInstance.id}
                        instanceType={appInstance.type}
                        key={`appInstanceWindow_key_${appInstance.id}`} />
            }
        })}</>)
    }
};