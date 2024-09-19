import { getCookie, setCookie } from '../CookieManager.js';

export default class utils {

    static highlightWindow(id, parent = null) {
        // Unhighlight the previous window
        let currentId = getCookie("activeWindowId");
        if (currentId) {
            let currentWindow = document.querySelector(`div[data-select="appInstanceWindow_${currentId}"]`);
            if (currentWindow)
                currentWindow.className = [...currentWindow.classList].filter(className => !className.includes('active')).join(' ');

            // Highlight this window
            if (!parent)
                parent = document.querySelector(`div[data-select="appInstanceWindow_${id}"]`);
            parent.className += ` active`;
        }
        setCookie("activeWindowId", id.toString())
    }

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

    static getInstanceMap() {
        return JSON.parse(window.sessionStorage.getItem('appsInstances') || '{}');
    }

    static setInstanceMap(mapping) {
        window.sessionStorage.setItem('appsInstances', JSON.stringify(mapping));
    }

    /**
     * removes the ZIndex of the instanceId
     * @param {*} instanceId - id of the instance
     */
    static removeInstanceId(instanceIdToRemove) {
        const existingMapping = this.getInstanceMap();

        let filteredMap = Object.entries(existingMapping).filter(([instanceId, zIndex]) => instanceIdToRemove != instanceId)
        filteredMap = filteredMap.reduce((currentObj, [instanceId, zIndex]) => {
            currentObj[instanceId] = existingMapping[instanceId]
            return currentObj;
        }, {});
        this.setInstanceMap(filteredMap)
    }

    static addNewZIndex(instanceIdToAdd) {
        const existingMapping = this.getInstanceMap()
        existingMapping[instanceIdToAdd] = this.getNextHighestZIndex() + 1;
        this.setInstanceMap(existingMapping);
    }

    static getZIndex(instanceId) {
        return this.getInstanceMap()[instanceId];
    }

    static getCurrentHighestZIndex() {
        const existingMapping = this.getInstanceMap();
        let mapInstances = Object.values(existingMapping)
        let highestZIndex = mapInstances.length ? Math.max(...mapInstances.map(zIndex => +zIndex)) : -1;
        return highestZIndex;
    }

    static getNextHighestZIndex() {
        let currentHighestIndex = this.getCurrentHighestZIndex();
        return currentHighestIndex == -1 ? 0 : currentHighestIndex;
    }

    static setHighestZIndex(instanceIdToModify) {
        const existingMapping = utils.getInstanceMap();
        let currentZIndex = existingMapping[instanceIdToModify];

        let highestZIndex = this.getCurrentHighestZIndex();
        if (currentZIndex) {
            for (let [instanceId, zIndex] of Object.entries(existingMapping))
                // Do nothing to lower indexes
                // Decrease by 1 the higher indexes
                if (zIndex > currentZIndex)
                    existingMapping[instanceId]--;
        }
        // else
        //     highestZIndex++;

        // Replace the targetId
        existingMapping[instanceIdToModify] = highestZIndex;

        utils.setInstanceMap(existingMapping);

        const windowNode = document.querySelector(`div[data-select="appInstanceWindow_${instanceIdToModify}"]`);
        const currentStyle = windowNode.getAttribute('style');
        const updatedStyle = currentStyle.replace(/z-index:.*?;/, `z-index:${highestZIndex};`);
        windowNode.setAttribute('style', updatedStyle);
    }

    // static appendZIndex(instanceId) {
    //     const zIndexList = this.getZIndexMap();
    //     zIndexList[instanceId] = this.getHighestZIndex() + 1;
    //     this.setZIndexMap(zIndexList);
    // }

    /**
     * Get the next available instance ID
     */
    static getNextInstanceId() {
        const existingMapping = this.getInstanceMap();
        let instanceIds = Object.keys(existingMapping).map(key => +key);
        instanceIds.sort(this.sortingAlgorithm);

        for (let i = 1; i < instanceIds.length; i++) {
            let previousId = instanceIds[i - 1];
            let currentId = instanceIds[i];

            if (currentId - previousId > 1)
                var nextId = previousId + 1;
        }

        nextId = nextId || instanceIds.length;
        return nextId;
    }

    static sortingAlgorithm = (a, b) => a - b;

}