import React from 'react';

import styles from '../../storage/style/components/appWindow.module.css'
import Consts from '../../storage/scripts/utils/Consts.js'
import utils from '../../storage/scripts/utils/utils.js';
import reactUtils from '../../storage/scripts/utils/reactUtils.js';

export default class DefaultInstanceWindow extends React.Component {
    constructor(props) {
        super(props);

        this.id = props.id;
        this.name = props.name;
        this.src = props.src;

        this.active = props.active;

        this.isBeingMoved = false;
        this.difference = {
            x: 0,
            y: 0
        };

        this.position = props.position || {
            x: 0,
            y: 0
        };

        this.appUtils = props.appUtils;
        this.render = this.render.bind(this);
        // Parent functions
        this.RenderMenuBarButtons = this.RenderMenuBarButtons.bind(this);
    }

    render() {
        window.addEventListener('mousemove', (e) => {
            if (this.isBeingMoved && !this.appUtils.getMinimizedStatus(this.id)) {
                this.MoveToTarget(e);
            }
        });
        window.addEventListener('mouseup', (e) => {
            this.isBeingMoved = false;
        });

        return (<>
            <div
                data-select={`appInstanceWindow_${this.id}`}
                className={`${styles.appInstanceWindow} unselectable${this.appUtils.isIdActive(this.id) ? ' active' : ''}`}
                onMouseDown={(e) => {
                    // Don't handle click if the target is a menu bar button
                    if (e.target.className) {
                        let instanceId = this.id;
                        // Set active instanceId
                        this.appUtils.setHighestZIndex(instanceId);
                        this.appUtils.setActiveInstanceId(instanceId);
                        this.appUtils.forceUpdateApp();
                    }
                }}
                style={{
                    display: this.appUtils.getMinimizedStatus(this.id) ? 'none' : 'block',
                    left: this.position.x,
                    top: this.position.y,
                    zIndex: this.appUtils.getZIndex(this.id) || 0
                }}>
                <section
                    onMouseDown={(e) => {
                        this.isBeingMoved = true;
                        this.difference = this.GetHoldDifference(e);
                    }}
                    className={styles.appMenuBar}>
                    <p>
                        <span className={styles.appMenuBarIcon}>
                            {reactUtils.loadDisplayIcon(
                                Consts.applications.name[this.name]
                            )}
                        </span>
                        {Consts.applications.title[this.name]}
                    </p>
                    <div>
                        {this.RenderMenuBarButtons()}
                    </div>
                </section>
                <section className={styles.appContent}>
                    <iframe
                        className={styles.inactiveFrame}
                        src={this.src}
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
                    // Set state minimized
                    this.appUtils.windowActionToggleMinimize(this.id);
                }}
            > _ </div>
            <div
                onMouseDown={(e) => {
                    this.isBeingMoved = false;
                    // Set state restored/maximized
                    this.appUtils.windowActionToggleMaximize(this.id);
                }}
            > ◱ </div>
            <div
                onMouseDown={(e) => {
                    this.isBeingMoved = false;
                    this.appUtils.windowActionClose(this.id);
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

