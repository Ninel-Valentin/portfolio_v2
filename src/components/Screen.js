import { useState } from 'react';
import styles from '../storage/style/components/screen.module.css';
import { getCookie, setCookie } from '../storage/scripts/CookieManager';
import WelcomeMessage from './WelcomeMessage';
import DesktopSystem from './DesktopSystem';

const Screen = () => {
    const [screenData, setScreenData] = useState({
        screenOn: updateMessageCookieState()
    });

    const renderScreen = {
        false: <WelcomeMessage toggleScreenData={setScreenData} />,
        true: <DesktopSystem />
    };

    return (<>
        <section id={styles.screen}>
            {renderScreen[screenData.screenOn]}
        </section>
    </>);
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

export default Screen;