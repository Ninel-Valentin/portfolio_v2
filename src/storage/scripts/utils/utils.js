import { getCookie, setCookie } from '../CookieManager.js';

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