import { BuilderComponent } from "../builder.component";
import { Component } from "../component";
import { TopbarComponent } from "../topbar/topbar.component";

export class RootComponent extends BuilderComponent implements Component {

    build(): HTMLElement {
console.log('build');
        //const topbar = new TopbarComponent();
        return this.render('topbar', 'index');

    }

}