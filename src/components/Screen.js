import { useState } from 'react';
import styles from '../storage/style/components/screen.modules.css';
import WelcomeMessage from './Screen/WelcomeMessage';
import DesktopSystem from './Screen/DesktopSystem';

const Screen = () => {
    const [screenData, setScreenData] = useState({
        screenOn: false
    });

    const renderScreen = {
        false: <WelcomeMessage />,
        true: <DesktopSystem />
    };

    return (<>
        <main>
            {renderScreen[screenData.screenOn]}
        </main>
    </>)
};

export default Screen;