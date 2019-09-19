import { Component } from "../component";
import { BuilderComponent } from "../builder.component";

export class TopbarComponent extends BuilderComponent implements Component {

    build() {
        return this.render('topbar', 'index');
    }

    init() {
        throw new Error('Method not implemented.');
    }

    bind() {
        throw new Error('Method not implemented.');
    }
}