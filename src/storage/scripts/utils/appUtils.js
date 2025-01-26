import Consts from "./Consts";
import utils from "./utils";

export default class appUtils {
    constructor(setAppData, getAppData, forceUpdateApp) {
        this.getAppData = getAppData;
        this.setAppData = setAppData;
        this.forceUpdateApp = forceUpdateApp;

        this.setActiveInstanceId = this.setActiveInstanceId.bind(this);
        this.getActiveInstanceId = this.getActiveInstanceId.bind(this);

        this.getActiveHistoryId = this.getActiveHistoryId.bind(this);
        this.setActiveHistoryId = this.setActiveHistoryId.bind(this);
        this.getActiveProjectId = this.getActiveProjectId.bind(this);
        this.setActiveProjectId = this.setActiveProjectId.bind(this);
        
    }

    isIdActive(idToCheck) {
        return this.getActiveInstanceId() == idToCheck;
    }

    createWindowInstance(name, appName, src = null) {
        let id = this.getNextInstanceId();

        this.addInstance({
            type: appName.includes('App') ? Consts.instanceType.App : Consts.instanceType.Directory,
            id,
            name,
            src
        });
        return id;
    }

    /**
     * Checks for the instanceName, if it exists, it will be focused, else create it
     */
    enableWindowInstance(instanceName, appName, src = null) {
        if (!instanceName) return;

        const appData = this.getAppData();
        const appInstances = appData.instances.entries;

        let instance = appInstances.find(appInstance => appInstance.name == instanceName);
        var instanceId;
        if (instance) {
            // if it exists, focus on it
            instanceId = instance.id;
            if (this.getMinimizedStatus(instanceId))
                this.windowActionToggleMinimize(instanceId);
            // Set active instanceId
            this.setHighestZIndex(instanceId);
        }
        else
            // Open app window / directory
            instanceId = this.createWindowInstance(instanceName, appName, src)

        this.setActiveInstanceId(instanceId);
        this.forceUpdateApp();
    }

    addInstance(appInstanceToAdd) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;
        appInstances.push({
            ...appInstanceToAdd,
            zIndex: this.getHighestZIndex() + 1,
            isResizable: true,
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

    removeInstance(instanceId) {
        const appData = this.getAppData();
        const appInstances = appData.instances.entries;

        // Remove instance
        this.setAppData({
            ...appData,
            instances: {
                ...appData.instances,
                entries: appInstances.filter(appInstance => appInstance.id != instanceId)
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
        // const appData = this.getAppData();
        // const appInstances = appData.instances.entries;

        // // const currentInstance = this.getInstanceWithId(instanceIdToModify);
        // for (let appInstance of appInstances)
        //     if (appInstance.id == instanceIdToModify) {
        //         appInstance.isMaximized = !appInstance.isMaximized;
        //         break;
        //     }

        // this.setAppData({
        //     ...appData,
        //     instances: {
        //         ...appData.instances,
        //         entries: appInstances
        //     }
        // });
    }


    // Actions
    windowActionToggleMinimize(instanceId) {
        this.toggleInstanceMinimizedStatus(instanceId);
        if (this.getMinimizedStatus(instanceId))
            utils.applyMinimizeAnimation(instanceId);
        else
            utils.applyRestoreAnimation(instanceId);

        setTimeout(() => {
            this.forceUpdateApp();
        }, Consts.minimizeAnimationDuration * .9);
    }

    windowActionToggleMaximize(instanceId) {
        this.toggleInstanceMaximizedStatus(instanceId);
        this.forceUpdateApp();
    }

    windowActionClose(instanceId) {
        this.removeInstance(instanceId);
        this.forceUpdateApp();
    }

    getActiveHistoryId() {
        return this.getAppData().content.history.activeId;
    }

    setActiveHistoryId(instanceId) {
        const appData = this.getAppData();
        this.setAppData({
            ...appData,
            content: {
                ...appData.content,
                history: {
                    activeId: instanceId
                }
            }
        });
    }

    getActiveProjectId() {
        return this.getAppData().content.project.activeId;
    }

    setActiveProjectId(instanceId) {
        const appData = this.getAppData();
        this.setAppData({
            ...appData,
            content: {
                ...appData.content,
                project: {
                    activeId: instanceId
                }
            }
        });
    }

}