import Consts from './Consts.js';

export default class utils {
    static clampOnScreen(width, height) {
        return [
            Math.max(0, Math.min(width, window.innerWidth)),
            // 5 is 3rem from taskbar + 2rem of menuBar
            Math.max(0, Math.min(height, window.innerHeight - 5 * this.getRemValueInPX()))
        ];
    }

    static getRemValueInPX() {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    static applyMinimizeAnimation(instanceId) {
        const windowInstance = document.querySelector(`div[data-select="appInstanceWindow_${instanceId}"]`);
        const taskbarInstance = document.querySelector(`div[data-select="taskbarInstanceWindow_${instanceId}"]`);

        if (windowInstance && taskbarInstance) {
            const windInstanceRect = windowInstance.getBoundingClientRect();
            const taskInstanceRect = taskbarInstance.getBoundingClientRect();

            const keyframes = [{
                // FROM
                left: `${windInstanceRect.left}px`,
                top: `${windInstanceRect.top}px`,
                opacity: 1
            }, {
                // TO
                left: `${taskInstanceRect.left}px`,
                top: `${taskInstanceRect.top}px`,
                minWidth: 0,
                minHeight: 0,
                width: `${taskInstanceRect.width}px`,
                height: 0,
                opacity: 0
            }];

            const options = {
                duration: Consts.minimizeAnimationDuration,
                easing: "ease-out"
            }
            windowInstance.animate(keyframes, options);
        } else {
            console.log(`DEBUG: Window_${instanceId} not found`)
        }
    }

    static applyRestoreAnimation(instanceId) {
        const windowInstance = document.querySelector(`div[data-select="appInstanceWindow_${instanceId}"]`);
        const taskbarInstance = document.querySelector(`div[data-select="taskbarInstanceWindow_${instanceId}"]`);

        if (windowInstance && taskbarInstance) {
            const style = windowInstance.style;
            var initialLeft = style.left,
                initialTop = style.top;

            const taskInstanceRect = taskbarInstance.getBoundingClientRect();

            const keyframes = [{
                // FROM
                left: `${taskInstanceRect.left}px`,
                top: `${taskInstanceRect.top}px`,
                minWidth: 0,
                minHeight: 0,
                width: `${taskInstanceRect.width}px`,
                height: 0,
                opacity: 0
            }, {
                // TO
                display: 'block',
                left: initialLeft,
                top: initialTop,
                opacity: 1
            }];

            const options = {
                duration: Consts.minimizeAnimationDuration,
                easing: "ease-in"
            }
            windowInstance.animate(keyframes, options);
        } else {
            console.log(`DEBUG: Window_${instanceId} not found`)
        }
    }

    static applyZIndexChange(instanceIdToModify, zIndex) {
        const windowNode = document.querySelector(`div[data-select="appInstanceWindow_${instanceIdToModify}"]`);
        if (windowNode) {
            const currentStyle = windowNode.getAttribute('style');
            const updatedStyle = currentStyle.replace(/z-index:.*?;/, `z-index:${zIndex};`);
            windowNode.setAttribute('style', updatedStyle);
        } else {
            console.log(`DEBUG: Window_${instanceIdToModify} not found`)
        }
    }

    static sortingAlgorithm = (a, b) => a - b;

}