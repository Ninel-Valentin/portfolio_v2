import styles from '../../storage/style/taskbar/taskbar.module.css';
import React from "react";

export default class TaskbarTooltipMenu extends React.Component {
    constructor(props) {
        super(props)
        this.name = props.name;
        this.id = props.id;

        this.appUtils = props.appUtils;
        this.forceUpdateTaskbar = props.forceUpdateTaskbar;
    }

    render() {
        return <menu>
            <span>{this.name}</span>
            {/* Restore */}
            <TooltipButton
                text={this.appUtils.getMinimizedStatus(this.id) ? "_ Restore" : "_ Minimize"}
                id={this.id}
                appUtils={this.appUtils}
                forceUpdateTaskbar={this.forceUpdateTaskbar}
            />
            <TooltipButton
                text="◱ Maximize"
                id={this.id}
                appUtils={this.appUtils}
                forceUpdateTaskbar={this.forceUpdateTaskbar}
            />
            <TooltipButton
                text="⨉ Close"
                id={this.id}
                appUtils={this.appUtils}
                forceUpdateTaskbar={this.forceUpdateTaskbar}
            />
        </menu>;
    }
}

class TooltipButton extends React.Component {
    constructor(props) {
        super(props);

        this.forceUpdateTaskbar = props.forceUpdateTaskbar;
        this.appUtils = props.appUtils;
        this.text = props.text;
        this.id = props.id;
    }

    render() {
        return <li
            data-select={`toolbarBtn_${this.name}`}
            onClick={(e) => {
                this.action();
                this.appUtils.removeTaskbarContextMenu();
                this.forceUpdateTaskbar();
                e.stopPropagation();
            }}>
            {this.text}
        </li>
    }

    action() {
        switch (this.text.split(' ').pop().toLowerCase()) {
            case 'restore':
            case 'minimize':
                this.appUtils.windowActionToggleMinimize(this.id);
                break;
            case 'maximize':
                this.appUtils.windowActionToggleMaximize(this.id);
                break;
            case 'close':
                this.appUtils.windowActionClose(this.id);
                break;
        }
    }
}