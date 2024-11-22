import React from 'react';

import styles from '../../storage/style/icons/appIcons.module.css'
import reactUtils from '../../storage/scripts/utils/reactUtils';
import Consts from '../../storage/scripts/utils/Consts';

export default class DefaultInstanceIcon extends React.Component {
    constructor(props) {
        super(props)

        this.name = props.name;
        this.src = props.src || null;
        this.href = props.href || null;

        /**
         * Apps render by default but don't open new browser windows
         * If it has a redirecting behaviour, it will not render anything anymore
         * Unless a src is added as well
         */
        this.shouldRender = true;
        this.shouldRedirect = false;

        if (this.href) {
            this.shouldRender = false;
            this.shouldRedirect = true;
        }

        if (this.src)
            this.shouldRender = true;


        this.appUtils = props.appUtils;
    }

    render() {
        return (<>
            <section
                className={`${styles.windowIcon} unselectable`}
                onClick={(e) => {
                    if (this.shouldRender)
                        this.appUtils.enableWindowInstance(this.name, this.constructorName, this.src)
                    if (this.shouldRedirect)
                        window.open(this.href);
                }}
            >
                {reactUtils.loadDisplayIcon(this.name)}
                <p> {Consts.applications.title[this.name]} </p>
            </section>
        </>);
    }
};