import { MessageType } from "./message-options";
export declare class MessageComponent {
    type: MessageType;
    className(type: MessageType): string;
    render(): any;
}
