import { PubSub } from "../../../pubSub";
import { DevsWebApi } from "./webApi";

export interface DevsEditorProps {
    devsWebApi: DevsWebApi;
    pubSub: PubSub
}
