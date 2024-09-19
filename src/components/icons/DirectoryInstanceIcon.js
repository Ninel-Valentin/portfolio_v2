import DefaultInstanceIcon from './DefaultInstanceIcon';

export default class DirectoryInstanceIcon extends DefaultInstanceIcon {
    constructor(props) {
        super(props)
        this.constructorName = this.constructor.name;
    }
};