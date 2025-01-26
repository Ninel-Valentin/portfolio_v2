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
                key={`History_CollapsableMenuEntry_${i}`}
                id={entry.id}
                header={header}
                content={content}
                getActiveSectionFunction={this.appUtils.getActiveHistoryId}
                setActiveSectionFunction={this.appUtils.setActiveHistoryId}
            />
        });
    }

    generateMenu(entry) {
        let header = this.createHeader(entry);
        let content = this.createContent(entry);

        return [header, content];
    }

    createHeader(entry) {
        return <>
            <div className={collapsableMenuStyles.titleSection}>
                <h2 className={collapsableMenuStyles.title}>{entry.title}</h2>
                <span> {this.parseDate(entry)} </span>
            </div>
            <img className={historyMenuStyles.companyLogo} src={reactUtils.loadCompanyLogo(entry.logo)} />
            <p className={historyMenuStyles.companyName}>{entry.company}</p>
            {reactUtils.loadSVGWave(false)}
        </>;
    }

    createContent(entry) {
        return <>
            {reactUtils.loadSVGWave(true)}
            <div className={collapsableMenuStyles.contentBody}>
                <h3>Responsabilities:</h3>
                {entry.description.map(description => {
                    return (<>
                        <p>◐ {description}</p>
                    </>)
                })}
                <div className={collapsableMenuStyles.splitContent}>
                    <div>
                        <h3>Technical skills:</h3>
                        {entry.softSkills.map(skill => {
                            return (<>
                                <p>↪ <span className={collapsableMenuStyles.highlightedSpan}>{skill}</span> ↩</p>
                            </>)
                        })}
                    </div>
                    <div>
                        <h3>Soft skills:</h3>
                        {entry.technicalSkills.map(skill => {
                            return (<>
                                <p>↪ <span className={collapsableMenuStyles.highlightedSpan}>{skill}</span> ↩</p>
                            </>)
                        })}
                    </div>
                </div>
            </div>
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