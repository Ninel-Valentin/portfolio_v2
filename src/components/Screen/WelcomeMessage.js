import React from 'react';

import styles from '../../storage/style/screen/welcomeMessage.module.css';

import ApplyTypingAnimation from '../../storage/scripts/screen/helloMsgAnimation.js';

export default class WelcomeMessage extends React.Component {
    constructor(props) {
        super(props);
        this.toggleScreenDataRef = props.toggleScreenData;
        
        window.sessionStorage.removeItem('canContinue');
    }

    componentDidMount() {
        ApplyTypingAnimation();
        window.onclick = () => { disableMessage(this.toggleScreenDataRef) };
    }

    render() {
        return (<>
            <p
                data-select="welcomeMsg"
                className={styles.welcomeP}
                id={styles.welcomeMsg}>
                &gt;&gt;
                <span data-select="targetMsg"></span>
                <span id={styles.underscore}>_</span>
            </p>
            <p
                data-select="continueMsg"
                className={styles.welcomeP}
                id={styles.continueMsg}>
                Press any button to continue...
            </p>
        </>);
    }
};

function disableMessage(setScreenDataRef) {
    if (window.sessionStorage.getItem('canContinue')) {
        // Remove the event
        window.onclick = '';
        setScreenDataRef({
            screenOn: true
        });
    }
}