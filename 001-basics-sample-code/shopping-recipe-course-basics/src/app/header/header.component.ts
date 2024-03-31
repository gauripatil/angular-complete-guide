import { Component, EventEmitter, Output } from "@angular/core";
import { DropdownDirective } from "../shared/dropdown.directive";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [
        DropdownDirective
    ]
})
export class HeaderComponent {

    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string): void {
        this.featureSelected.emit(feature);
    }

}