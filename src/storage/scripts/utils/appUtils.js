import utils from "./utils";

export default class appUtils {
    constructor(setAppData, getAppData, forceUpdateApp) {
        this.getAppData = getAppData;
        this.setAppData = setAppData;
        this.forceUpdateApp = forceUpdateApp;

        this.setActiveInstanceId = this.setActiveInstanceId.bind(this);
        this.getActiveInstanceId = this.getActiveInstanceId.bind(this);
    }

    isIdActive(idToCheck) {
        return this.getActiveInstanceId() == idToCheck;
    }

    addInstance(appInstanceToAdd) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;
        appInstances.push({
            ...appInstanceToAdd,
            zIndex: this.getHighestZIndex() + 1,
            isMinimized: false,
            isMaximized: false
        });

        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                entries: appInstances
            }
        });
    }

    removeInstance(appInstanceName) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;

        // Remove instance
        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                entries: appInstances.filter(appInstance => appInstance.name != appInstanceName)
            }
        });
    }

    setActiveInstanceId(instanceId) {
        const appData = this.getAppData();
        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                activeId: instanceId
            }
        });
    }

    getActiveInstanceId() {
        return this.getAppData().instances.activeId;
    }

    getInstanceWithId(searchId) {
        return this.getAppData().instances.entries.find(appInstance => appInstance.id == searchId);
    }

    setHighestZIndex(instanceIdToModify) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;

        let currentInstance = this.getInstanceWithId(instanceIdToModify);
        let currentZIndex = currentInstance.zIndex;
        let highestZIndex = this.getHighestZIndex();

        if (currentZIndex >= 0) {
            for (let appInstance of appInstances) {
                let shouldUpdate = false;
                // Do nothing to lower indexes

                // Set highestZIndex to current instance
                if (appInstance.id == instanceIdToModify) {
                    appInstance.zIndex = highestZIndex;
                    shouldUpdate = true;
                }

                // Decrease by 1 the higher indexes
                else if (appInstance.zIndex > currentZIndex) {
                    // This modifies the array
                    --appInstance.zIndex;
                    shouldUpdate = true;
                }

                // Apply for both cases above
                if (shouldUpdate) {
                    utils.applyZIndexChange(appInstance.id, appInstance.zIndex);
                }
            }
        }

        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                entries: appInstances
            }
        });
    }

    getHighestZIndex() {
        const appInstances = this.getAppData().instances.entries;
        let highestZIndex = appInstances.length ? Math.max(...appInstances.map(appInstance => +appInstance.zIndex)) : -1;
        return highestZIndex;
    }

    getZIndex(instanceId) {
        return this.getInstanceWithId(instanceId).zIndex;
    }

    /**
    * Get the next available instance ID
    */
    getNextInstanceId() {
        const appInstances = this.getAppData().instances.entries;

        let instanceIds = appInstances.map(appInstance => +appInstance.id);
        instanceIds.sort(utils.sortingAlgorithm);

        var nextId = instanceIds.length;
        const largestId = instanceIds[instanceIds.length - 1];
        for (let i = 0; i <= largestId; i++)
            if (!instanceIds.includes(i)) {
                nextId = i;
                break;
            }

        return nextId;
    }

    removeTaskbarContextMenu() {
        const appData = this.getAppData();
        this.setAppData({
            ...appData,
            taskbar: {
                ...appData.taskbar,
                activeContext: null
            }
        });
    }

    getMinimizedStatus(instanceId) {
        const instance = this.getInstanceWithId(instanceId);
        if (!instance)
            console.log(`No instance found for ${instanceId}`);
        
        return instance?.isMinimized;
    }

    toggleInstanceMinimizedStatus(instanceIdToModify) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;

        // const currentInstance = this.getInstanceWithId(instanceIdToModify);
        for (let appInstance of appInstances)
            if (appInstance.id == instanceIdToModify) {
                appInstance.isMinimized = !appInstance.isMinimized;
                break;
            }

        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                entries: appInstances
            }
        });
    }

    toggleInstanceMaximizedStatus(instanceIdToModify) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;

        // const currentInstance = this.getInstanceWithId(instanceIdToModify);
        for (let appInstance of appInstances)
            if (appInstance.id == instanceIdToModify) {
                appInstance.isMaximized = !appInstance.isMaximized;
                break;
            }

        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                entries: appInstances
            }
        });
    }
}