import styles from '../../storage/style/components/taskbar.module.css';

import { ReactComponent as OSLogo } from '../../storage/svg/os.svg';
import DateTime from './DateTime';

const Taskbar = () => {
    return (<>
        <section id={styles.taskBar}>
            <OSLogo id={styles.osLogo} />
            <div id={styles.openApps}>

            </div>
            <DateTime id={styles.datetime} />
        </section>
    </>);
};

export default Taskbar;