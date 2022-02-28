import * as React from "react";
import { CollapseProps } from "./props";

interface CollapseStyle {
    height: string;
    overflow: string;
}

export class Collapse extends React.Component<CollapseProps> {
    containerDOM: React.RefObject<HTMLDivElement>;
    contentDOM: React.RefObject<HTMLDivElement>;
    checkTimeout: number;
    timeout;
    initialStyle: CollapseStyle;
    collapsedStyle: CollapseStyle;
    appliedStyle: CollapseStyle;

    constructor(props: CollapseProps) {
        super(props);

        this.containerDOM = React.createRef<HTMLDivElement>();
        this.contentDOM = React.createRef<HTMLDivElement>();
        this.checkTimeout = 50;
        this.timeout = setTimeout(() => { }, this.checkTimeout);
        clearTimeout(this.timeout);
        this.initialStyle = { height: "auto", overflow: "initial" };
        this.collapsedStyle = { height: "0px", overflow: "hidden" };
        this.appliedStyle = props.expanded ? this.initialStyle : this.collapsedStyle;

        this.onResize = this.onResize.bind(this);
        this.onRest = this.onRest.bind(this);
        this.onWork = this.onWork.bind(this);
        this.requiredDOMRefsMissing = this.requiredDOMRefsMissing.bind(this);
    }

    componentDidMount() {
        this.onResize();
    }

    shouldComponentUpdate(nextProps: CollapseProps) {
        return this.props.expanded !== nextProps.expanded
            || this.props.children !== nextProps.children;
    }

    getSnapshotBeforeUpdate() {
        if (this.requiredDOMRefsMissing()) return null;

        //return this.containerDOM.current.style.height === this.initialStyle.height ? `${this.contentDOM.current.clientHeight}px` : null;
        const newContentHeight = this.containerDOM.current.style.height === this.initialStyle.height ? `${this.contentDOM.current.clientHeight}px` : null;
        const shouldSetNewHeight = !(this.requiredDOMRefsMissing() || newContentHeight === null);
        if (shouldSetNewHeight) this.containerDOM.current.style.height = newContentHeight;
        return null;
    }

    componentDidUpdate(newContentHeight) {
        //const shouldSetNewHeight = !(this.requiredDOMRefsMissing() || newContentHeight === null);
        //if (shouldSetNewHeight) this.containerDOM.current.style.height = newContentHeight;

        this.onResize();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    onResize() {
        clearTimeout(this.timeout);

        if (this.requiredDOMRefsMissing()) return;

        const containerHeight = Math.floor(this.containerDOM.current.clientHeight);
        const contentHeight = Math.floor(this.contentDOM.current.clientHeight);

        const currentExpanded = this.props.expanded;
        const isFullyOpened = currentExpanded && Math.abs(contentHeight - containerHeight) <= 1;
        const isFullyClosed = !currentExpanded && Math.abs(containerHeight) <= 1;

        if (isFullyOpened || isFullyClosed) {
            this.onRest(currentExpanded, contentHeight);
        } else {
            this.onWork(currentExpanded, contentHeight);
            this.timeout = setTimeout(() => this.onResize(), this.checkTimeout);
        }
    }

    onRest(expanded, contentHeight) {
        if (this.requiredDOMRefsMissing()) return;

        const hasOpened = expanded && this.containerDOM.current.style.height === `${contentHeight}px`;
        const hasClosed = !expanded && this.containerDOM.current.style.height === '0px';

        if (hasOpened || hasClosed) {
            this.containerDOM.current.style.overflow = expanded ? 'initial' : 'hidden';
            this.containerDOM.current.style.height = expanded ? 'auto' : '0px';
        }
    }

    onWork(expanded, contentHeight) {
        if (this.requiredDOMRefsMissing()) return;

        const isOpening = expanded && this.containerDOM.current.style.height === `${contentHeight}px`;
        const isClosing = !expanded && this.containerDOM.current.style.height === '0px';

        if (isOpening || isClosing) return;

        this.containerDOM.current.style.overflow = 'hidden';
        this.containerDOM.current.style.height = expanded ? `${contentHeight}px` : '0px';
    }

    render() {
        return <div ref={this.containerDOM} className="collapseTransition" style={this.appliedStyle} aria-hidden={!this.props.expanded}>
            <div ref={this.contentDOM}>
                {this.props.children}
            </div>
        </div>
    }

    requiredDOMRefsMissing() {
        return !this.containerDOM || !this.contentDOM;
    }
}