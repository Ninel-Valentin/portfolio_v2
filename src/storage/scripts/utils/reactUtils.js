import React from 'react';

import Consts from './Consts';

import { ReactComponent as MailIcon } from '../../svg/mail.svg';
import { ReactComponent as LinkedInIcon } from '../../svg/linkedin.svg';
import { ReactComponent as SettingsIcon } from '../../svg/settings.svg';
import { ReactComponent as RecycleBinIcon } from '../../svg/trash.svg';
import { ReactComponent as HistoryIcon } from '../../svg/history.svg';
import { ReactComponent as InfoIcon } from '../../svg/info.svg';
import { ReactComponent as Directory } from '../../svg/directory.svg';
import { ReactComponent as GithubIcon } from '../../svg/github.svg';

import { ReactComponent as Wave01 } from '../../svg/wave/wave01.svg';
import { ReactComponent as Wave02 } from '../../svg/wave/wave02.svg';
import { ReactComponent as Wave03 } from '../../svg/wave/wave03.svg';
import { ReactComponent as Wave04 } from '../../svg/wave/wave04.svg';
import { ReactComponent as Wave05 } from '../../svg/wave/wave05.svg';
import { ReactComponent as Wave06 } from '../../svg/wave/wave06.svg';
import { ReactComponent as Wave07 } from '../../svg/wave/wave07.svg';
import { ReactComponent as Wave08 } from '../../svg/wave/wave08.svg';
import { ReactComponent as Wave09 } from '../../svg/wave/wave09.svg';
import { ReactComponent as Wave10 } from '../../svg/wave/wave10.svg';

import SiemensLogo from '../../img/logo/siemens.png';
import CSLogo from '../../img/logo/channelsight.png';
import MCLogo from '../../img/logo/mcdonalds.png';
import ProfiLogo from '../../img/logo/profi.png';

import PlaceholderContent from '../../../components/content/temp/PlaceholderContent.js';

import HistoryContent from '../../../components/content/HistoryContent.js';
import AppInstanceIcon from '../../../components/icons/AppInstanceIcon.js';
import ProjectsContent from '../../../components/content/ProjectsContent.js';

export default class reactUtils {

    static loadDisplayIcon(name) {
        switch (Consts.applications.type[name]) {
            case Consts.applications.type["linkedin"]:
                return <LinkedInIcon />
            case Consts.applications.type["history"]:
                return <HistoryIcon />
            case Consts.applications.type["about"]:
                return <InfoIcon />
            case Consts.applications.type["mail"]:
                return <MailIcon />
            case Consts.applications.type["settings"]:
                return <SettingsIcon />
            case Consts.applications.type["recycle bin"]:
                return <RecycleBinIcon />
            case Consts.applications.type["github"]:
                return <GithubIcon />
            case Consts.applications.type["directory"]:
                return <Directory />
            default:
                return;
        }
    }

    static loadDirectoryContent(name, appUtils) {
        switch (Consts.applications.name[name]) {
            case Consts.applications.name["social"]:
                return (<>
                    <AppInstanceIcon
                        appUtils={appUtils}
                        name="linkedin"
                        href="https://www.linkedin.com/in/ninel-valentin-banica/" />
                    <AppInstanceIcon
                        appUtils={appUtils}
                        name="github"
                        href="https://github.com/Ninel-Valentin" />
                    <AppInstanceIcon
                        appUtils={appUtils}
                        name="mail" />
                </>);
            default:
                return;
        }
    }

    static loadApplicationContent(name, appUtils) {
        switch (Consts.applications.name[name]) {
            case Consts.applications.name["history"]:
                return <HistoryContent
                    key={`historyContent_${name}`}
                    appUtils={appUtils} />;
            case Consts.applications.name["projects"]:
                return <ProjectsContent
                    appUtils={appUtils} />;
            default:
                return <PlaceholderContent />;
        }
    }

    static loadCompanyLogo(name) {
        switch (name) {
            case 'siemens':
                return SiemensLogo;
            case 'channelsight':
                return CSLogo;
        }
    }

    static loadSVGWave(flipped) {
        const waves = [
            <Wave01 />,
            <Wave02 />,
            <Wave03 />,
            <Wave04 />,
            <Wave05 />,
            <Wave06 />,
            <Wave07 />,
            <Wave08 />,
            <Wave09 />,
            <Wave10 />
        ];
        let randomIndex = Math.floor(Math.random() * waves.length);
        let attributes = {};

        if (flipped)
            attributes.className = 'flipped';


        return <div {...attributes}>
            {waves[randomIndex]}
        </div>;
    }
}