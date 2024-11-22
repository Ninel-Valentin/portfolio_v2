import React from "react";

import collapsableMenuStyles from '../../storage/style/content/collapsableMenu.module.css';
import historyMenuStyles from '../../storage/style/content/historyContent.module.css'

import historyData from '../../storage/data/history.json';
import CollapsableMenu from "./default/CollapsableMenu.js";
import CollapsableMenuEntry from "./default/CollapsableMenuEntry.js";

import reactUtils from "../../storage/scripts/utils/reactUtils.js";

export default class HistoryContent extends React.Component {
    constructor(props) {
        super(props);

        this.appUtils = props.appUtils;
        this.data = historyData;
    }

    render() {
        let entries = this.generateEntries();
        return <CollapsableMenu
            entries={entries}
        />

    }

    generateEntries() {
        return this.data.entries.map((entry, i) => {
            let [header, content] = this.generateMenu(entry);
            return <CollapsableMenuEntry
                windowIdentifier={'history'}
                appUtils={this.appUtils}
                key={`CollapsableMenuEntry_${i}`}
                id={entry.id}
                header={header}
                content={content}
            />
        });
    }

    generateMenu(entry) {
        
        let header = this.createHeader(entry);
        let content = this.createContent(entry);

        return [header, content];
    }

    createHeader(entry) {
        // let untilPresent = !entry.endDate;
        // let presentTimestampStyle = untilPresent ? historyMenuStyles.presentDate : '';

        return <>
            <div className={collapsableMenuStyles.titleSection}>
                <h2 className={collapsableMenuStyles.title}>{entry.title}</h2>
                <span
                // className={presentTimestampStyle}
                >{this.parseDate(entry)}</span>
            </div>
            <p className={collapsableMenuStyles.company}>{entry.company}</p>
            {reactUtils.loadSVGWave(false)}
        </>;
    }

    createContent(entry) {
        // return 
        return <>
            {reactUtils.loadSVGWave(true)}
            content
        </>
    }

    parseDate(entry) {

        let startDate = new Date(entry.startDate).toLocaleString('default', { month: 'short', year: 'numeric' });
        let endDate = entry.endDate ? new Date(entry.endDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : 'Present';

        return (<>
            <span className={historyMenuStyles.date}>{startDate}</span> - <span className={historyMenuStyles.date}>{endDate}</span>
        </>);
    }
};