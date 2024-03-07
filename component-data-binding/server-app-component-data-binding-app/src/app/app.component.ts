import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ServerComponent } from './server/server.component';
import { CockpitComponent } from './cockpit/cockpit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ServerComponent,
    CockpitComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'server-app-component-data-binding-app';
  serverElements: any = [
    {
      type: 'server',
      name: 'New Server',
      content: 'Server Content'
    },
    {
      type: 'blueprint',
      name: 'New Server',
      content: 'Server Content'
    }
  ];
  // newServerName: string = '';
  // newServerContent: string = '';

  // onAddServer() {
  //   this.serverElements.push({
  //     type: 'server',
  //     name: this.newServerName,
  //     content: this.newServerContent
  //   });
  // }

  // onAddBlueprint() {
  //   this.serverElements.push({
  //     type: 'blueprint',
  //     name: this.newServerName,
  //     content: this.newServerContent
  //   });
  // }
}
