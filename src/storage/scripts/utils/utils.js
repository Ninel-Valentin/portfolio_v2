export default class utils {
    static getZIndexList() {
        return JSON.parse(window.sessionStorage.getItem('appsZIndex') || '[]');
    }

    static setZIndexList(list) {
        window.sessionStorage.setItem('appsZIndex', JSON.stringify(list));
    }

    static ClampOnScreen(width, height) {
        return [
            Math.max(0, Math.min(width, window.innerWidth)),
            // 5 is 3rem from taskbar + 2rem of menuBar
            Math.max(0, Math.min(height, window.innerHeight - 5 * this.getRemValueInPX()))
        ];
    }

    static getRemValueInPX() {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
}