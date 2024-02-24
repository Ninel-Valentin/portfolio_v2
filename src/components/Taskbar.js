import styles from '../storage/style/components/taskbar.module.css';

import { ReactComponent as OSLogo } from '../storage/svg/os.svg';

const Taskbar = () => {
    return (<>
        <section id={styles.taskBar}>
            <div>
                <OSLogo />
            </div>
        </section>
    </>);
};

export default Taskbar;