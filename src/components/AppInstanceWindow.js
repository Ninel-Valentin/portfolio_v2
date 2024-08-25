import React from 'react';

import styles from '../storage/style/components/appWindow.module.css'
import Consts from '../storage/scripts/utils/Consts';
import utils from '../storage/scripts/utils/utils';

export default class AppInstanceWindow extends React.Component {
    constructor(props) {
        super(props);

        this.position = props.position || {
            x: 0,
            y: 0
        };
        // On closing, remove from zIndexArray
        this.id = props.id;

        this.name = props.name;
        this.isFocused = true;
        this.windowSizeState = Consts.windowSizeState.normal;

        this.isBeingMoved = false;
        this.difference = {
            x: 0,
            y: 0
        };

        // Parent functions
        this.closeWindowFunction = props.closeWindowFunction;
        this.RenderMenuBarButtons = this.RenderMenuBarButtons.bind(this);
    }

    render() {
        window.addEventListener('mousemove', (e) => {
            if (this.isBeingMoved) {
                this.MoveToTarget(e);
            }
        });
        window.addEventListener('mouseup', (e) => {
            this.isBeingMoved = false;
        });

        return (<>
            <div
                data-select={`appInstanceWindow_${this.id}`}
                className={`${styles.appInstanceWindow} unselectable`}
                onMouseDown={(e) => {
                    // Don't handle click if the target is a menu bar button
                    if (e.target.className)
                        utils.setHighestZIndex(this.id)
                }}
                style={{
                    left: this.position.x,
                    top: this.position.y,
                    zIndex: utils.getZIndex(this.id) || 0
                }}>
                <section
                    onMouseDown={(e) => {
                        this.isBeingMoved = true;
                        this.difference = this.GetHoldDifference(e);
                    }}
                    className={styles.appMenuBar}>
                    <p>{this.name}</p>
                    <div>
                        {this.RenderMenuBarButtons()}
                    </div>
                </section>
                <section className={styles.appContent}>
                    <iframe
                        className={styles.inactiveFrame}
                        allowFullScreen={true}
                    ></iframe>
                </section>
            </div>
        </>);
    }

    RenderMenuBarButtons() {
        return (<>
            <div
                onMouseDown={(e) => {
                    this.isBeingMoved = false;
                    e.stopPropagation(); // Needed to not pass the event to parent window
                    // Set state minimized
                }}
            > _ </div>
            <div
                onMouseDown={(e) => {
                    this.isBeingMoved = false;
                    e.stopPropagation(); // Needed to not pass the event to parent window

                    // Set state maximized
                }}
            > □ </div>
            <div
                onMouseDown={(e) => {
                    this.isBeingMoved = false;
                    this.closeWindowFunction(this.name)
                    e.stopPropagation(); // Needed to not pass the event to parent window
                    // Destroy self from array of instances from parent
                }}
            > ⨉ </div>
        </>);
    }

    GetHoldDifference(e) {
        const differenceX = this.position.x - e.clientX
            , differenceY = this.position.y - e.clientY;

        return {
            x: differenceX,
            y: differenceY
        };
    }

    MoveToTarget(e) {
        var targetX = e.clientX + this.difference.x,
            targetY = e.clientY + this.difference.y;

        [targetX, targetY] = utils.clampOnScreen(targetX, targetY);

        this.position = {
            x: targetX,
            y: targetY
        };

        const windowNode = document.querySelector(`div[data-select="appInstanceWindow_${this.id}"]`);
        const currentStyle = windowNode.getAttribute('style');
        const updatedStyle = currentStyle.replace(/left:.*?;/, `left:${targetX}px;`).replace(/top:.*?;/, `top: ${this.position.y}px;`);
        windowNode.setAttribute('style', updatedStyle);
    }
}

