import React, { useState } from 'react';
import styles from '../storage/style/components/screen.module.css';
import { getCookie, setCookie } from '../storage/scripts/CookieManager.js';
import WelcomeMessage from './WelcomeMessage.js';
import DesktopSystem from './DesktopSystem.js';

export default class Screen extends React.Component {
    constructor(props) {
        super(props)

        this.getAppData = props.getAppData;
        this.setAppData = props.setAppData;
        this.forceUpdateApp = props.forceUpdateApp;

        this.screenData = {
            screenOn: updateMessageCookieState()
        };
    }

    setScreenData(value) {
        this.screenData = value;
    }

    render() {
        const renderScreen = {
            false: <WelcomeMessage toggleScreenData={this.setScreenData} />,
            true: <DesktopSystem forceUpdateApp={this.forceUpdateApp} setAppData={this.setAppData} getAppData={this.getAppData} />
        };

        return (<>
            <section id={styles.screen}>
                {renderScreen[this.screenData.screenOn]}
            </section>
        </>);
    }
};

function updateMessageCookieState() {
    let cookieValue = getCookie('welcomeMessage');
    // Get the state
    if (cookieValue != 'true') {
        // Update if expired
        let expiringDay = new Date();
        expiringDay.setMonth(expiringDay.getMonth() + 1)
        expiringDay = new Date(expiringDay).toUTCString();

        setCookie('welcomeMessage', 'true', expiringDay)
        return false;
    }
    return true;
}