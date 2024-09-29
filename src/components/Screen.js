import React, { useState } from 'react';
import styles from '../storage/style/components/screen.module.css';
import { getCookie, setCookie } from '../storage/scripts/CookieManager.js';
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
            <section id={styles.screen}>
                {
                    this.shouldShowWelcomeMessage() ?
                        <WelcomeMessage
                            forceUpdateScreen={this.forceUpdateScreen} /> :
                        <DesktopSystem
                            appUtils={this.appUtils}
                        />}
            </section>
        </>);
    }


    shouldShowWelcomeMessage() {
        return getCookie('welcomeMessage') != 'true'
    }
};