import styles from '../../storage/style/components/taskbar.module.css';
import React from "react";

export default class TaskbarTooltipMenu extends React.Component {
    constructor(props) {
        super(props)
        this.name = props.name;
    }

    render() {
        return <menu>
            <span>{this.name}</span>
            <li> _ Restore</li>
            <li> □ Set fullscreen</li>
            <li> ⨉ Close</li>
        </menu>;
    }
}