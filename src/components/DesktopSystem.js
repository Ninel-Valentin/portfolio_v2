import React from 'react';

import styles from '../storage/style/components/desktopSystem.module.css';
import AppInstanceIcon from './icons/AppInstanceIcon';
import DirectoryIcon from './icons/DirectoryIcon';

export default class DesktopSystem extends React.Component {
    constructor(props) {
        super(props);
        // Array of instances of AppWindow
        this.appInstances = [];
    }

    render() {
        return (<>
            <main>
                {/* <img id={styles.starWindow} /> */}
                {this.RenderDesktopIcons()}
                {/* <AppWindow id={0} position={{ x: 100, y: 500 }} appName="Test" />
                <AppWindow id={1} appName="test2" /> */}
            </main>
        </>);
    }

    RenderDesktopIcons() {
        return (<>
            <AppInstanceIcon name="linkedIn" />
            <DirectoryIcon name="projects" />
            <AppInstanceIcon name="history" />
            <AppInstanceIcon name="info" />
            <AppInstanceIcon name="mail" />
            <AppInstanceIcon name="settings" />
            <AppInstanceIcon name="recycle bin" />
        </>);
    }
};