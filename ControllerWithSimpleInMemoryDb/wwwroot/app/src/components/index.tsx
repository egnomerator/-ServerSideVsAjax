import * as React from "react";
import * as ReactDOM from "react-dom";
import { PubSub } from "../pubSub";
import { Accordion } from "./common/accordion/Accordion";
import { AccordionSection } from "./common/accordion/AccordionSection";
import { DevsEditor } from "./devsEditor/DevsEditor";
import { DevsWebApi } from "./devsEditor/DevsEditor/webApi";

function renderDevsEditor(container: Element, api: DevsWebApi, pubSub: PubSub) {
    ReactDOM.render(
        <React.StrictMode>
            <Accordion collapseAsAccordion={true} sectionIndexInitialExpandeds={[0,2,3]}>
                <AccordionSection sectionTitle="SECTION YO 0">
                    <div>YO!  -0-</div>
                </AccordionSection>
                <AccordionSection sectionTitle="SECTION TABLE 1">
                    <DevsEditor devsWebApi={api} pubSub={pubSub} />
                </AccordionSection>
                <AccordionSection sectionTitle="SECTION YO 2">
                    <div>YO!  -2-</div>
                </AccordionSection>
                <AccordionSection sectionTitle="SECTION YO 3">
                    <div>YO! -3-</div>
                </AccordionSection>
            </Accordion>
        </React.StrictMode>,
        container
    )
}

const Components = {
    renderDevsEditor: function (container: Element, devsWebApi: object, pubSub: object) {
        renderDevsEditor(container, devsWebApi as DevsWebApi, pubSub as PubSub);
    }
}

export default Components;
