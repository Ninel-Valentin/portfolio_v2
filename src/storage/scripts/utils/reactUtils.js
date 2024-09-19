import React from 'react';

import { ReactComponent as MailIcon } from '../../svg/mail.svg';
import { ReactComponent as LinkedInIcon } from '../../svg/linkedin.svg';
import { ReactComponent as SettingsIcon } from '../../svg/settings.svg';
import { ReactComponent as RecycleBinIcon } from '../../svg/trash.svg';
import { ReactComponent as HistoryIcon } from '../../svg/history.svg';
import { ReactComponent as InfoIcon } from '../../svg/info.svg';
import { ReactComponent as Directory } from '../../svg/directory.svg';
import Consts from './Consts';

export default class reactUtils {

    static loadDisplayIcon(name) {
        switch (Consts.applications.name[name]) {
            case Consts.applications.name["linkedin"]:
                return <LinkedInIcon />
            case Consts.applications.name["history"]:
                return <HistoryIcon />
            case Consts.applications.name["info"]:
                return <InfoIcon />
            case Consts.applications.name["mail"]:
                return <MailIcon />
            case Consts.applications.name["settings"]:
                return <SettingsIcon />
            case Consts.applications.name["recycle bin"]:
                return <RecycleBinIcon />
            case Consts.applications.name["directory"]:
                return <Directory />
            default:
                return;
        }
    }
}