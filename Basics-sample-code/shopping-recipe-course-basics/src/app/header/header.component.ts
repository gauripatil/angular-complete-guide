import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true
})
export class HeaderComponent {

    @Output() linkClick = new EventEmitter<string>();

    onLinkClicked(linkSelected: string): void {
        this.linkClick.emit(linkSelected);
    }

}