import styles from '../../storage/style/components/taskbar.module.css';
import React from "react";

export default class TaskbarTooltipMenu extends React.Component {
    constructor(props) {
        super(props)
        this.name = props.name;
        this.id = props.id;

        this.appUtils = props.appUtils;
        this.windowActionToggleMinimize = props.windowActionToggleMinimize;
    }

    render() {
        return <menu>
            <span>{this.name}</span>
            {/* Restore */}
            <TooltipButton
                action={this.windowActionToggleMinimize}
                text={this.appUtils.getMinimizedStatus(this.id) ? "_ Restore" : "_ Minimize"} />
            <TooltipButton action="" text="◱ Maximize" />
            <TooltipButton action="" text="⨉ Close" />
        </menu>;
    }
}

class TooltipButton extends React.Component {
    constructor(props) {
        super(props);

        this.action = props.action;
        this.text = props.text;
    }

    render() {
        return <li onClick={(e) => {
            // e.stopPropagation(); 
            this.action();
        }}>
            {this.text}
        </li>
    }
}