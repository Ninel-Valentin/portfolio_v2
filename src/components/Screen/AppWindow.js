import React from 'react';

import styles from '../../storage/style/screen/appWindow.module.css'
import Consts from '../../storage/scripts/utils/Consts';
import utils from '../../storage/scripts/utils/utils';

export default class AppWindow extends React.Component {
    constructor(props) {
        super(props);

        this.position = props.position || {
            x: 0,
            y: 0
        };
        this.id = props.id;

        this.appName = props.appName;
        this.isFocused = true;
        this.windowSizeState = Consts.windowSizeState.normal;

        this.isBeingMoved = false;
        this.difference = {
            x: 0,
            y: 0
        };
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
                data-select={`appWindowFrame_${this.id}`}
                className={`${styles.appWindowFrame} unselectable`}
                onMouseDown={(e) => { this.SetHighestZIndex() }}
                style={{
                    left: this.position.x,
                    top: this.position.y,
                    zIndex: this.GetZIndex(this.id) || 0
                }}>
                <section
                    onMouseDown={(e) => {
                        this.isBeingMoved = true;
                        this.difference = this.GetHoldDifference(e);
                    }}
                    className={styles.appMenuBar}>
                    <p>{this.appName}</p>
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
                    // Set state minimized
                }}
            > _ </div>
            <div
                onMouseDown={(e) => {
                    // Set state maximized
                }}
            > □ </div>
            <div
                onMouseDown={(e) => {
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

        [targetX, targetY] = utils.ClampOnScreen(targetX, targetY);

        this.position = {
            x: targetX,
            y: targetY
        };

        const windowNode = document.querySelector(`div[data-select="appWindowFrame_${this.id}"]`);
        const currentStyle = windowNode.getAttribute('style');
        const updatedStyle = currentStyle.replace(/left:.*?;/, `left:${targetX}px;`).replace(/top:.*?;/, `top: ${this.position.y}px;`);
        windowNode.setAttribute('style', updatedStyle);
    }

    SetHighestZIndex() {
        const zIndexList = utils.getZIndexList();
        let currentIndex = zIndexList[this.id];

        zIndexList.forEach((value, key) => {
            if (value > currentIndex) {
                zIndexList[key]--;

                let iteratedWindowNode = document.querySelector(`div[data-select="appWindowFrame_${key}"]`);
                let windowStyle = iteratedWindowNode.getAttribute('style');
                let updatedWindowStyle = windowStyle.replace(/z-index:.*?;/, `z-index:${zIndexList[key]};`);
                iteratedWindowNode.setAttribute('style', updatedWindowStyle);
            }
        });

        let newIndex = zIndexList.length;
        zIndexList[this.id] = newIndex;
        utils.setZIndexList(zIndexList);

        const windowNode = document.querySelector(`div[data-select="appWindowFrame_${this.id}"]`);
        const currentStyle = windowNode.getAttribute('style');
        const updatedStyle = currentStyle.replace(/z-index:.*?;/, `z-index:${newIndex};`);
        windowNode.setAttribute('style', updatedStyle);
    }

    GetZIndex(id) {
        const zIndexList = utils.getZIndexList();
        if (!isNaN(zIndexList[id]))
            return zIndexList[id];
        else {
            let newValue = zIndexList.length;
            this.AppendZIndex(id, newValue)
            return newValue;
        }
    }

    AppendZIndex(key, value) {
        const zIndexList = utils.getZIndexList();
        zIndexList[key] = value;
        utils.setZIndexList(zIndexList);
    }
}

