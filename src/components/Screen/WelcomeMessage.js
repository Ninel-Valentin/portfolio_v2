import React from 'react';

import styles from '../../storage/style/components/Screen/welcomeMessage.module.css';

import ApplyTypingAnimation from '../../storage/scripts/screen/helloMsgAnimation.js';

class WelcomeMessage extends React.Component {
    componentDidMount() {
        ApplyTypingAnimation();
        window.onclick = disableMessage;
    }

    render() {
        return (<div data-select="welcomeElement">
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
        </div>);
    }
};

function disableMessage() {
    const msg = document.querySelector('[data-select="welcomeElement"]');
    msg.parentNode.removeChild(msg);

    // Remove the event
    window.onclick = '';
}

export default WelcomeMessage;