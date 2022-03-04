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
    expandedStyle: CollapseStyle;
    collapsedStyle: CollapseStyle;

    constructor(props: CollapseProps) {
        super(props);

        this.containerDOM = React.createRef<HTMLDivElement>();
        this.contentDOM = React.createRef<HTMLDivElement>();
        this.checkTimeout = 50;
        this.timeout = setTimeout(() => { }, this.checkTimeout);
        clearTimeout(this.timeout);
        this.expandedStyle = { height: "auto", overflow: "initial" };
        this.collapsedStyle = { height: "0px", overflow: "hidden" };
        this.initialStyle = this.props.expanded ? this.expandedStyle : this.collapsedStyle;

        this.resizeContainer = this.resizeContainer.bind(this);
        this.continueResizingContainer = this.continueResizingContainer.bind(this);
        this.continueExpanding = this.continueExpanding.bind(this);
        this.continueCollapsing = this.continueCollapsing.bind(this);
        this.finishResizingContainer = this.finishResizingContainer.bind(this);
        this.finishExpanding = this.finishExpanding.bind(this);
        this.finishCollapsing = this.finishCollapsing.bind(this);

        this.requiredDOMRefsMissing = this.requiredDOMRefsMissing.bind(this);
    }

    componentDidMount() {
        this.resizeContainer();
    }

    shouldComponentUpdate(nextProps: CollapseProps) {
        const expandedChanged = this.props.expanded !== nextProps.expanded;
        const childrenChanged = this.props.children !== nextProps.children;
        return expandedChanged || childrenChanged;
    }

    getSnapshotBeforeUpdate() {
        if (this.requiredDOMRefsMissing()) return null;

        const newContentHeight = this.containerDOM.current.style.height === this.expandedStyle.height ? `${this.contentDOM.current.clientHeight}px` : null;
        const canSetContainerToNewHeight = !this.requiredDOMRefsMissing() && newContentHeight !== null;
        if (canSetContainerToNewHeight) this.containerDOM.current.style.height = newContentHeight;
        return null;
    }

    componentDidUpdate() {
        this.resizeContainer();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    resizeContainer() {
        clearTimeout(this.timeout);

        if (this.requiredDOMRefsMissing()) return;

        const containerHeight = Math.floor(this.containerDOM.current.clientHeight);
        const contentHeight = Math.floor(this.contentDOM.current.clientHeight);

        const isSetToExpand = this.props.expanded;
        const isFinishedExpanding = isSetToExpand && Math.abs(contentHeight - containerHeight) <= 1;
        const isFinishedCollapsing = !isSetToExpand && Math.abs(containerHeight) <= 1;

        if (isFinishedExpanding || isFinishedCollapsing) {
            this.finishResizingContainer(isSetToExpand, contentHeight);
        } else {
            this.continueResizingContainer(isSetToExpand, contentHeight);
            this.timeout = setTimeout(() => this.resizeContainer(), this.checkTimeout);
        }
    }

    continueResizingContainer(isSetToExpand, contentHeight) {
        if (this.requiredDOMRefsMissing()) return;

        if (isSetToExpand) this.continueExpanding(contentHeight);
        if (!isSetToExpand) this.continueCollapsing();
    }

    continueExpanding(contentHeight) {
        const isFinishedExpanding = this.containerDOM.current.style.height === `${contentHeight}px`;
        if (isFinishedExpanding) return;

        this.containerDOM.current.style.overflow = this.collapsedStyle.overflow; // during transition, overflow always hidden
        this.containerDOM.current.style.height = `${contentHeight}px`;
    }

    continueCollapsing() {
        const isFinishedCollapsing = this.containerDOM.current.style.height === this.collapsedStyle.height;
        if (isFinishedCollapsing) return;

        this.containerDOM.current.style.overflow = this.collapsedStyle.overflow;
        this.containerDOM.current.style.height = this.collapsedStyle.height;
    }

    finishResizingContainer(isSetToExpand, contentHeight) {
        if (this.requiredDOMRefsMissing()) return;

        if (isSetToExpand) this.finishExpanding(contentHeight);
        if (!isSetToExpand) this.finishCollapsing();
    }

    finishExpanding(contentHeight) {
        const isFinishedExpanding = this.containerDOM.current.style.height === `${contentHeight}px`;
        if (!isFinishedExpanding) return;

        this.containerDOM.current.style.overflow = this.expandedStyle.overflow;
        this.containerDOM.current.style.height = this.expandedStyle.height;
    }

    finishCollapsing() {
        const isFinishedCollapsing = this.containerDOM.current.style.height === this.collapsedStyle.height;
        if (!isFinishedCollapsing) return;

        this.containerDOM.current.style.overflow = this.collapsedStyle.overflow;
        this.containerDOM.current.style.height = this.collapsedStyle.height;
    }

    requiredDOMRefsMissing() {
        return !this.containerDOM || !this.contentDOM;
    }

    render() {
        return <div ref={this.containerDOM} className="collapseTransition" style={this.initialStyle} aria-hidden={!this.props.expanded}>
            <div ref={this.contentDOM}>
                {this.props.children}
            </div>
        </div>
    }
}