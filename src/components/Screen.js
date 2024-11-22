import React from 'react';
import styles from '../storage/style/screen.module.css';
import { getCookie } from '../storage/scripts/CookieManager.js';
import WelcomeMessage from './WelcomeMessage.js';
import DesktopSystem from './DesktopSystem.js';

export default class Screen extends React.Component {
    constructor(props) {
        super(props)

        this.appUtils = props.appUtils;
        this.forceUpdateScreen = this.forceUpdateScreen.bind(this);
    }

    forceUpdateScreen() {
        this.forceUpdate();
    }

    render() {
        return (<>
            <section
                id={styles.screen}
                onClick={(e) => {
                    this.appUtils.removeTaskbarContextMenu();
                    this.forceUpdateScreen();
                }}
            >
                {this.shouldShowWelcomeMessage() ?
                    <WelcomeMessage forceUpdateScreen={this.forceUpdateScreen} /> :
                    <DesktopSystem appUtils={this.appUtils} />}
            </section>
        </>);
    }


    shouldShowWelcomeMessage() {
        return getCookie('welcomeMessage') != 'true'
    }
};