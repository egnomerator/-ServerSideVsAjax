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
        const expandedChanged = this.props.expanded !== nextProps.expanded;
        const childrenChanged = this.props.children !== nextProps.children;
        return expandedChanged || childrenChanged;
    }

    getSnapshotBeforeUpdate() {
        if (this.requiredDOMRefsMissing()) return null;

        const newContentHeight = this.containerDOM.current.style.height === this.initialStyle.height ? `${this.contentDOM.current.clientHeight}px` : null;
        const canSetContainerToNewHeight = !this.requiredDOMRefsMissing() && newContentHeight !== null;
        if (canSetContainerToNewHeight) this.containerDOM.current.style.height = newContentHeight;
        return null;
    }

    componentDidUpdate() {
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

        // TODO: further refactoring notes
        //  - goal is to make what's happening clearer
        //  - BASICS:
        //      - 1) determine if the given goal state is to be expanded or collapsed
        //      - 2a) clearly show a workflow toward EXPANDING if that's the goal
        //      - 2b) clearly show a workflow toward COLLAPSING if that's the goal
        const targetExpanded = this.props.expanded;
        const isFullyExpanded = targetExpanded && Math.abs(contentHeight - containerHeight) <= 1;
        const isFullyCollapsed = !targetExpanded && Math.abs(containerHeight) <= 1;

        if (isFullyExpanded || isFullyCollapsed) {
            this.onRest(targetExpanded, contentHeight);
        } else {
            this.onWork(targetExpanded, contentHeight);
            this.timeout = setTimeout(() => this.onResize(), this.checkTimeout);
        }
    }

    onRest(targetExpanded, contentHeight) {
        if (this.requiredDOMRefsMissing()) return;

        const hasExpanded = targetExpanded && this.containerDOM.current.style.height === `${contentHeight}px`;
        const hasCollapsed = !targetExpanded && this.containerDOM.current.style.height === this.collapsedStyle.height;

        if (hasExpanded || hasCollapsed) {
            this.containerDOM.current.style.overflow = targetExpanded ? this.initialStyle.overflow : this.collapsedStyle.overflow;
            this.containerDOM.current.style.height = targetExpanded ? this.initialStyle.height : this.collapsedStyle.height;
        }
    }

    onWork(targetExpanded, contentHeight) {
        if (this.requiredDOMRefsMissing()) return;

        const isOpening = targetExpanded && this.containerDOM.current.style.height === `${contentHeight}px`;
        const isClosing = !targetExpanded && this.containerDOM.current.style.height === this.collapsedStyle.height;

        if (isOpening || isClosing) return;

        this.containerDOM.current.style.overflow = this.collapsedStyle.overflow;
        this.containerDOM.current.style.height = targetExpanded ? `${contentHeight}px` : this.collapsedStyle.height;
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