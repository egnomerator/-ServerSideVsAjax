import * as React from "react";
import { Collapse } from "../collapse/Collapse";
import { AccordionSectionHandlerProps } from "./props";

export class AccordionSectionHandler extends React.Component<AccordionSectionHandlerProps>{
    constructor(props) {
        super(props);

        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded(e) {
        e.preventDefault();
        this.props.expandedToggler(this.props.accordionIndex);
    }

    render() {

        const chevronDown = "fa-angle-down";
        const chevronRight = "fa-angle-right";
        let classChevron = this.props.expanded ? ` ${chevronDown}` : ` ${chevronRight}`;
        let classCollapsed = this.props.expanded ? "" : " collapsed";
        let ariaExpanded = this.props.expanded;

        return <div className="card">
            <div className="card-header card-link border-bottom-0" onClick={this.toggleExpanded} >
                <h6 className="mb-0 d-flex align-items-center justify-content-between">
                    <a href="#collapseOne" className={`stretched-link${classCollapsed}`} aria-expanded={ariaExpanded}>{this.props.sectionTitle}</a> <i className={`text-right fas${classChevron}`}></i>
                </h6>
            </div>
            <Collapse expanded={this.props.expanded}>
                <div>
                    <div className="card-body">
                        {this.props.children}
                    </div>
                </div>
            </Collapse>
        </div>
    }
}