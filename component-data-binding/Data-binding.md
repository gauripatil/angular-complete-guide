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

<br><br><hr><br>
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

<br><br><hr><br>
## Comparison - Input/Output VS Services VS Combination of both Input/Output & Services
In Angular, you have several options for communication between components. The choice between Input/Output (using `@Input` and `@Output`), services, or a combination of both depends on the specific requirements and structure of your application. Here are some considerations for each approach:

### 1. **Input/Output (Using `@Input` and `@Output`):**

- **When to Use:**
  - **Parent-Child Component Communication:** Use Input and Output for communication between parent and child components.
  - **Simple Data Sharing:** For passing data from parent to child (Input) or emitting events from child to parent (Output).
  - **Stateless Child Components:** When the child component doesn't need to maintain its own state and relies on the parent for data.

- **Example:**
  - **Parent Component:**
    ```typescript
    // parent.component.ts
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-parent',
      template: '<app-child [inputData]="parentData" (outputEvent)="handleOutput($event)"></app-child>',
    })
    export class ParentComponent {
      parentData = 'Data from Parent';

      handleOutput(eventData: string) {
        console.log('Received from child:', eventData);
      }
    }
    ```

  - **Child Component:**
    ```typescript
    // child.component.ts
    import { Component, Input, Output, EventEmitter } from '@angular/core';

    @Component({
      selector: 'app-child',
      template: '<p>{{ inputData }}</p><button (click)="emitOutput()">Send Data</button>',
    })
    export class ChildComponent {
      @Input() inputData: string;
      @Output() outputEvent = new EventEmitter<string>();

      emitOutput() {
        this.outputEvent.emit('Data from Child');
      }
    }
    ```

### 2. **Services:**

- **When to Use:**
  - **Cross-Component Communication:** Use services for communication between components that are not directly connected in a parent-child relationship.
  - **Shared State or Logic:** When multiple components need access to shared data or business logic.
  - **Stateful Components:** When components need to maintain their own state independently of each other.

- **Example:**
  - **Service:**
    ```typescript
    // data.service.ts
    import { Injectable } from '@angular/core';
    import { Subject } from 'rxjs';

    @Injectable({
      providedIn: 'root',
    })
    export class DataService {
      private dataSubject = new Subject<string>();
      data$ = this.dataSubject.asObservable();

      sendData(data: string) {
        this.dataSubject.next(data);
      }
    }
    ```

  - **Components:**
    ```typescript
    // component-a.component.ts
    import { Component } from '@angular/core';
    import { DataService } from './data.service';

    @Component({
      selector: 'app-component-a',
      template: '<button (click)="sendData()">Send Data from A</button>',
    })
    export class ComponentAComponent {
      constructor(private dataService: DataService) {}

      sendData() {
        this.dataService.sendData('Data from Component A');
      }
    }
    ```

    ```typescript
    // component-b.component.ts
    import { Component, OnInit } from '@angular/core';
    import { DataService } from './data.service';

    @Component({
      selector: 'app-component-b',
      template: '<p>{{ receivedData }}</p>',
    })
    export class ComponentBComponent implements OnInit {
      receivedData: string;

      constructor(private dataService: DataService) {}

      ngOnInit() {
        this.dataService.data$.subscribe((data) => {
          this.receivedData = data;
        });
      }
    }
    ```

### 3. **Combination of Input/Output and Services:**

- **When to Use:**
  - **Complex Applications:** For larger applications, you may find a combination of both approaches useful.
  - **Separation of Concerns:** Use services for global concerns and Input/Output for local, parent-child communication.

- **Example:**
  - **Parent Component with Service:**
    ```typescript
    // parent.component.ts
    import { Component } from '@angular/core';
    import { DataService } from './data.service';

    @Component({
      selector: 'app-parent',
      template: '<app-child [inputData]="parentData"></app-child>',
    })
    export class ParentComponent {
      parentData = 'Data from Parent';

      constructor(private dataService: DataService) {}

      sendDataToService() {
        this.dataService.sendData('Data from Parent to Service');
      }
    }
    ```

  - **Child Component with Service:**
    ```typescript
    // child.component.ts
    import { Component } from '@angular/core';
    import { DataService } from './data.service';

    @Component({
      selector: 'app-child',
      template: '<button (click)="sendDataToService()">Send Data to Service</button>',
    })
    export class ChildComponent {
      constructor(private dataService: DataService) {}

      sendDataToService() {
        this.dataService.sendData('Data from Child to Service');
      }
    }
    ```

Remember that the choice between these approaches depends on the specific requirements and structure of your Angular application. Consider the size of your application, the relationships between components, and the nature of the data or logic being shared when making these decisions.
