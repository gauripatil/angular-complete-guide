import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true
})
export class HeaderComponent {

    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string): void {
        this.featureSelected.emit(feature);
    }

}