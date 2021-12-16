export interface PubSub {
    eventRegister: EventRegister;
    subscribe(eventName: string, handler: Handler): UnSubscriber;
    publish(eventName: string, data?: object): () => void;
}

type UnSubscriber = () => void;
type Handler = (data: object) => void;
type EventRegister = any;