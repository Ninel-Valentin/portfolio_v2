export default class utils {
    static getZIndexList() {
        return JSON.parse(window.sessionStorage.getItem('appsZIndex') || '[]');
    }

    static setZIndexList(list) {
        window.sessionStorage.setItem('appsZIndex', JSON.stringify(list));
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

    static setHighestZIndex(id) {
        const zIndexList = utils.getZIndexList();
        let currentIndex = zIndexList[id];

        zIndexList.forEach((value, key) => {
            if (value > currentIndex) {
                zIndexList[key]--;

                let iteratedWindowNode = document.querySelector(`div[data-select="appInstanceWindow_${key}"]`);
                let windowStyle = iteratedWindowNode.getAttribute('style');
                let updatedWindowStyle = windowStyle.replace(/z-index:.*?;/, `z-index:${zIndexList[key]};`);
                iteratedWindowNode.setAttribute('style', updatedWindowStyle);
            }
        });

        let newIndex = zIndexList.length;
        zIndexList[id] = newIndex;
        utils.setZIndexList(zIndexList);

        const windowNode = document.querySelector(`div[data-select="appInstanceWindow_${id}"]`);
        const currentStyle = windowNode.getAttribute('style');
        const updatedStyle = currentStyle.replace(/z-index:.*?;/, `z-index:${newIndex};`);
        windowNode.setAttribute('style', updatedStyle);
    }

    static getZIndex(id) {
        const zIndexList = this.getZIndexList();
        if (!isNaN(zIndexList[id]))
            return zIndexList[id];
        else {
            let newValue = zIndexList.length;
            this.appendZIndex(id, newValue)
            return newValue;
        }
    }

    static appendZIndex(key, value) {
        const zIndexList = this.getZIndexList();
        zIndexList[key] = value;
        this.setZIndexList(zIndexList);
    }

    static getNextId() {
        const instanceIdsStorageName = 'instanceIds';
        const instanceIds = JSON.parse(sessionStorage.getItem(instanceIdsStorageName) || '[]');
        instanceIds.sort(this.sortingAlgorithm);
        for (let i = 1; i < instanceIds.length; i++) {
            let previousId = instanceIds[i - 1];
            let currentId = instanceIds[i];

            if (currentId - previousId > 1)
                var nextId = previousId + 1;
        }

        nextId = nextId || instanceIds.length;
        instanceIds.push(nextId);
        instanceIds.sort(this.sortingAlgorithm);

        sessionStorage.setItem(instanceIdsStorageName, JSON.stringify(instanceIds));
        return nextId;
    }

    static removeId(idToRemove) {
        const instanceIdsStorageName = 'instanceIds';
        let instanceIds = JSON.parse(sessionStorage.getItem(instanceIdsStorageName) || '[]');
        instanceIds = instanceIds.filter(id => id != idToRemove);
        instanceIds.sort(this.sortingAlgorithm);
        sessionStorage.setItem(instanceIdsStorageName, JSON.stringify(instanceIds));
    }

    static sortingAlgorithm = (a, b) => a - b;

}