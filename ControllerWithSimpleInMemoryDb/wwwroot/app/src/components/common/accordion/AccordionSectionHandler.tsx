import * as React from "react";
import { Collapse } from "../collapse/Collapse";
import { AccordionSectionHandlerProps } from "./props";
import { AccordionSectionState } from "./state";

export class AccordionSectionHandler extends React.Component<AccordionSectionHandlerProps, AccordionSectionState>{
    constructor(props: AccordionSectionHandlerProps) {
        super(props);

        this.coordinationCallback = this.coordinationCallback.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);

        const myIndex = props.coordinationCallbackCollection.findIndex((callBack) => callBack.sectionId === props.sectionId);
        if(myIndex === -1) props.coordinationCallbackCollection.push({ sectionId: props.sectionId, callBack: this.coordinationCallback });

        this.state = { expanded: props.expanded }
    }

    coordinationCallback(sectionId) {
        if (sectionId !== this.props.sectionId && this.state.expanded) this.toggleExpanded(null);
    }

    toggleExpanded(e) {
        if(e !== null) e.preventDefault();
        const currentExpanded = this.state.expanded;
        this.setState({ expanded: !currentExpanded });
        if (!currentExpanded) this.props.coordinationCallback(this.props.sectionId);
    }

    render() {

        const chevronDown = "fa-angle-down";
        const chevronRight = "fa-angle-right";
        let classChevron = this.state.expanded ? ` ${chevronDown}` : ` ${chevronRight}`;
        let classCollapsed = this.state.expanded ? "" : " collapsed";
        let ariaExpanded = this.state.expanded;

        return <div className="card">
            <div className="card-header card-link border-bottom-0" onClick={this.toggleExpanded} >
                <h6 className="mb-0 d-flex align-items-center justify-content-between">
                    <a href="#collapseOne" className={`stretched-link${classCollapsed}`} aria-expanded={ariaExpanded}>{this.props.sectionTitle}</a> <i className={`text-right fas${classChevron}`}></i>
                </h6>
            </div>
            <Collapse expanded={this.state.expanded}>
                <div>
                    <div className="card-body">
                        <div>{this.props.sectionId}</div>
                        {this.props.children}
                    </div>
                </div>
            </Collapse>
        </div>
    }
}