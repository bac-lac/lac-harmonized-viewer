import { MessageType } from "./message-options";
export declare class MessageComponent {
    text: string;
    type: MessageType;
    className(type: MessageType): string;
    render(): any;
}
