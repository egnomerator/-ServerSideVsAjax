import { DevsEditor } from "..";

export function publishTableEdited(devsEditor: DevsEditor) {
    const devEditedByReactEvent = devsEditor.props.pubSub.eventRegister.devEditedByReact;
    devsEditor.props.pubSub.publish(devEditedByReactEvent);
}