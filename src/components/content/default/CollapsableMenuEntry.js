import styles from '../../../storage/style/content/collapsableMenu.module.css';
import React from "react";

export default class CollapsableMenuEntry extends React.Component {
    constructor(props) {
        super(props);
        this.header = props.header;
        this.content = props.content;
        this.id = props.id;
        this.windowIdentifier = props.windowIdentifier;
        this.appUtils = props.appUtils;
    }

    render() {
        let className = styles.collapsableMenuEntry;
        return (<li
            className={className}
            data-select={`collapsableMenu_${this.windowIdentifier}_${this.id}`}
            onClick={(e) => {
                let activeId = this.appUtils.getActiveHistoryId();
                let activeItem = document.querySelector(`.active[data-select="collapsableMenu_${this.windowIdentifier}_${activeId}"]`);

                // Remove the current active item
                if (activeItem)
                    activeItem.className = className;

                // Toggle the active for the clicked item
                if (activeId != this.id || !activeItem) {
                    this.appUtils.setActiveHistoryId(this.id);

                    let currentItem = document.querySelector(`[data-select="collapsableMenu_${this.windowIdentifier}_${this.id}"]`);
                    if (currentItem)
                        currentItem.className = `${className} active`;
                    else
                        log.error(`${this.id} collapsable menu entry not found!`);

                }
            }}
        >
            <section className={styles.collapsableMenuHeader}>{this.header}</section>
            <section className={styles.collapsableMenuContent}>{this.content}</section>
        </li>);
    }
};