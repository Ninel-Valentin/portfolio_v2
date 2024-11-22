import reactUtils from '../../storage/scripts/utils/reactUtils.js';
import DefaultInstanceWindow from './DefaultInstanceWindow.js';

export default class DirectoryInstanceWindow extends DefaultInstanceWindow {
    constructor(props) {
        super(props);

        this.appUtils = props.appUtils;
        this.name = props.name;
        this.loadContent = this.loadContent.bind(this);
    }

    render() {
        return <DefaultInstanceWindow
            {...this.props}
            loadContent={this.loadContent}
        />
    }

    loadContent = () => {
        return reactUtils.loadDirectoryContent(this.name, this.appUtils);
    }
}

