import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cockpit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @ViewChild('serverContentInput') serverContentInput: ElementRef | undefined;
  // newServerName: string = '';
  // newServerContent: string = '';

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput?.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) { 
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput?.nativeElement.value
    });
  }

}
