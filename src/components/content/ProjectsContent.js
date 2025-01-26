import React from "react";

import collapsableMenuStyles from '../../storage/style/content/collapsableMenu.module.css';
import projectsMenuStyles from '../../storage/style/content/projectsMenu.module.css';

import projectsData from '../../storage/data/projects.json';
import CollapsableMenu from "./default/CollapsableMenu";
import CollapsableMenuEntry from "./default/CollapsableMenuEntry";

import reactUtils from "../../storage/scripts/utils/reactUtils.js";

export default class ProjectsContent extends React.Component {
    constructor(props) {
        super(props);

        this.appUtils = props.appUtils;
        this.data = projectsData;
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
                windowIdentifier={'projects'}
                appUtils={this.appUtils}
                key={`Projects_CollapsableMenuEntry_${i}`}
                id={entry.id}
                header={header}
                content={content}
                getActiveSectionFunction={this.appUtils.getActiveProjectId}
                setActiveSectionFunction={this.appUtils.setActiveProjectId}
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
                <h2 className={collapsableMenuStyles.title}> {entry.title} </h2>
                <span> {this.parseDate(entry)} </span>
            </div>
            <span> {entry.shortDescription} </span>
            {reactUtils.loadSVGWave(false)}
        </>;
    }

    createContent(entry) {
        return <>
            {reactUtils.loadSVGWave(true)}
            <div className={collapsableMenuStyles.contentBody}>
                <h3>Description:</h3>
                {entry.description.map(description => {
                    return (<>
                        <p>◐ {description}</p>
                    </>)
                })}
                <div className={collapsableMenuStyles.splitContent}>
                    <div>
                        <h3>Technologies:</h3>
                        {entry.technologies.map(technology => {
                            return (<>
                                <p>↪ <span className={collapsableMenuStyles.highlightedSpan}>{technology}</span> ↩</p>
                            </>)
                        })}
                    </div>
                </div>
            </div>
        </>
    }

    parseDate(entry) {
        return (<>
            <span className={projectsMenuStyles.date}>{entry.createdDate}</span>
        </>);
    }
}