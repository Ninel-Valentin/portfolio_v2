import styles from '../../../storage/style/content/collapsableMenu.module.css';
import React from "react";

export default class CollapsableMenu extends React.Component {
    constructor(props) {
        super(props);

        this.entries = props.entries
    }

    render() {
        return (
            <ul
                className={styles.collapsableMenu}
            >
                {this.entries}
            </ul>);
    }
};