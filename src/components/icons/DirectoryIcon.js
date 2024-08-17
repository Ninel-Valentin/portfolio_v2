import React from 'react';

import { ReactComponent as Directory } from '../../storage/svg/directory.svg';

import styles from '../../storage/style/appIcons/appIcons.module.css'

export default class DirectoryIcon extends React.Component {
    constructor(props) {
        super(props)

        this.name = props.name;
        // this.windowInstance = 
    }

    render() {
        return (<>
            <section
                data-select={`directoryIcon_${this.name}`}
                className={`${styles.windowIcon} unselectable`}>
                {/* <img src={this.imageUri} /> */}
                <Directory />
                <p> {this.name} </p>
            </section>
        </>);
    }
};