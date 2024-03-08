Angular provides a powerful feature known as data binding, which establishes a connection between the components of your application and the DOM. There are four types of data binding in Angular:

## In-built property & event binding
1. **Interpolation (`{{ expression }}`):**
   - Interpolation is a one-way data binding from the component to the view (DOM).
   - It allows you to embed expressions within double curly braces `{{ }}` in the HTML template.
   - Example:

     ```html
     <p>{{ title }}</p>
     ```

     In this case, the value of `title` from the component will be displayed in the paragraph.

2. **Property Binding (`[property]="expression"`):**
   - Property binding allows you to set the value of a property of an HTML element or directive.
   - It is a one-way data binding from the component to the view (DOM).
   - Example:

     ```html
     <img [src]="imageUrl" alt="Angular Logo">
     ```

     Here, the `src` property of the `img` element is bound to the value of the `imageUrl` property in the component.

3. **Event Binding (`(event)="expression"`):**
   - Event binding allows you to listen to events in the DOM and execute some logic in response.
   - It is a one-way data binding from the view (DOM) to the component.
   - Example:

     ```html
     <button (click)="onButtonClick()">Click me</button>
     ```

     In this example, the `onButtonClick` method in the component is called when the button is clicked.

4. **Two-way Binding (`[(ngModel)]="expression"`):**
   - Two-way binding is a combination of property binding and event binding, providing a convenient way to achieve bi-directional data binding.
   - It is commonly used with form elements for user input.
   - Example:

     ```html
     <input [(ngModel)]="username" placeholder="Enter your username">
     ```

     Here, changes to the `username` property in the component are reflected in the input field, and changes in the input field are automatically updated in the component.

To use two-way binding (`ngModel`), make sure to import the `FormsModule` in your Angular module.


## Custom property & event binding
In addition to the standard forms of data binding in Angular (interpolation, property binding, event binding, and two-way binding), you can create custom property and event bindings in your components to communicate between parent and child components. Let's explore these concepts:

### Custom Property Binding:
Custom property binding allows you to pass data from a parent component to a child component through a custom property.

**Child Component:**
```typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<p>{{ childMessage }}</p>',
})
export class ChildComponent {
  @Input() childMessage: string;
}
```

**Parent Component:**
```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '<app-child [childMessage]="parentMessage"></app-child>',
})
export class ParentComponent {
  parentMessage = 'Message from Parent';
}
```

In this example, the `ParentComponent` passes the value of `parentMessage` to the `ChildComponent` through the `childMessage` property.

### Custom Event Binding:
Custom event binding allows a child component to emit events that the parent component can listen to.

**Child Component:**
```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<button (click)="sendMessage()">Send Message</button>',
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Message from Child');
  }
}
```

**Parent Component:**
```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '<app-child (messageEvent)="receiveMessage($event)"></app-child><p>{{ parentMessage }}</p>',
})
export class ParentComponent {
  parentMessage: string;

  receiveMessage(message: string) {
    this.parentMessage = message;
  }
}
```

In this example, the `ChildComponent` emits a custom event named `messageEvent` with the message when the button is clicked. The `ParentComponent` listens for this event and updates its `parentMessage` property accordingly.

Custom property and event bindings provide a flexible way to establish communication between components in an Angular application.
