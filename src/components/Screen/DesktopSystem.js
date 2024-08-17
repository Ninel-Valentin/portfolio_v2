import React from 'react';

import styles from '../../storage/style/screen/desktopSystem.module.css';
import AppWindow from './AppWindow';

export default class DesktopSystem extends React.Component {
    constructor(props) {
        super(props);
        // Array of instances of AppWindow
        // this.appInstances = [
        //     'test'
        // ];
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
        return;
    }
}