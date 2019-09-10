import { TypedEvent } from "./event";

export class events {
    static onClick = new TypedEvent<ClickEventArgs>();
    static onChange = new TypedEvent<ChangeEventArgs>();
}

export class ClickEventArgs {
}

export class ChangeEventArgs {
}