import React from 'react';

import { ReactComponent as MailIcon } from '../../storage/svg/mail.svg';
import { ReactComponent as LinkedInIcon } from '../../storage/svg/linkedin.svg';
import { ReactComponent as SettingsIcon } from '../../storage/svg/settings.svg';
import { ReactComponent as RecycleBinIcon } from '../../storage/svg/trash.svg';
import { ReactComponent as HistoryIcon } from '../../storage/svg/history.svg';
import { ReactComponent as InfoIcon } from '../../storage/svg/info.svg';

import styles from '../../storage/style/appIcons/appIcons.module.css'

export default class AppInstanceIcon extends React.Component {
    constructor(props) {
        super(props)

        this.name = props.name;
        this.imageUri = props.src || "../../storage/img/star.png";
        this.enableWindowFunction = props.enableWindowFunction
    }

    render() {
        return (<>
            <section
                // data-select={`appWindowIcon_${this.name}`}
                className={`${styles.windowIcon} unselectable`}
                onClick={(e) => {
                    // alert(this.name);
                    this.enableWindowFunction(this.name)
                    // console.log(this._reactInternalInstance.)
                }}
            >
                {this.LoadDisplayIcon()}
                <p> {this.name} </p>
            </section>
        </>);
    }

    LoadDisplayIcon() {
        switch (this.name) {
            case "linkedIn":
                return <LinkedInIcon />
            case "history":
                return <HistoryIcon />
            case "info":
                return <InfoIcon />
            case "mail":
                return <MailIcon />
            case "settings":
                return <SettingsIcon />
            case "recycle bin":
                return <RecycleBinIcon />
            default:
                return (<img src={this.imageUri} />);
        }
    }
};