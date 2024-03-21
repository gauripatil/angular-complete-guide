Angular provides a powerful feature known as data binding, which establishes a connection between the components of your application and the DOM. There are four types of data binding in Angular:


## 1. In-built property & event binding
<details>
   <summary>
   
   <ul>
     <li>Interpolation</li>
      <li>Property Binding</li>
      <li>Event Binding</li>
      <li>Two-way Binding</li>  
   </ul>
      
   </summary>
   
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
</details>

<br><hr><br>
## 2. Custom property & event binding

<details>
   <summary>
   
   <ul>
     <li>Custom Property Binding</li>
      <li>Custom Event Binding</li>
   </ul>
      
   </summary>

   
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

</details>

<br><hr><br>
## 3. Comparison - Input/Output VS Services VS Combination of both Input/Output & Services
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

<br><br><hr><br>
## 4. View Encapsulation
View encapsulation in Angular refers to the way Angular manages the styles of components to prevent them from leaking or affecting other parts of the application. Angular provides three types of view encapsulation:

1. **Emulated (default):**
   - **Style Encapsulation:** Angular emulates the shadow DOM to encapsulate styles. It generates unique attributes for each component and attaches them to the DOM elements, ensuring that styles are scoped to the component.
   - **How to Use:** This is the default behavior, and you don't need to explicitly specify it.

   ```typescript
   @Component({
     selector: 'app-example',
     template: '<p class="example">This is an example</p>',
     styles: ['.example { color: red; }']
   })
   ```

   In this example, the styles are scoped to the component using Angular's emulated encapsulation.

2. **None:**
   - **Style Encapsulation:** No style encapsulation is applied. Styles defined in the component can affect the global styles and can be affected by global styles.
   - **How to Use:** Specify `encapsulation: ViewEncapsulation.None` in the `@Component` decorator.

   ```typescript
   @Component({
     selector: 'app-example',
     template: '<p class="example">This is an example</p>',
     styles: ['.example { color: red; }'],
     encapsulation: ViewEncapsulation.None
   })
   ```

   Use this cautiously, as it may lead to unintended style clashes in larger applications.

3. **ShadowDom:**
   - **Style Encapsulation:** Utilizes the browser's native shadow DOM to encapsulate styles. It provides true isolation, but not all browsers support shadow DOM.
   - **How to Use:** Specify `encapsulation: ViewEncapsulation.ShadowDom` in the `@Component` decorator.

   ```typescript
   @Component({
     selector: 'app-example',
     template: '<p class="example">This is an example</p>',
     styles: ['.example { color: red; }'],
     encapsulation: ViewEncapsulation.ShadowDom
   })
   ```

   This is the most isolated form of style encapsulation, but it might not be supported in all environments.

To summarize, view encapsulation in Angular ensures that styles defined in a component are scoped to that component, preventing unintended style collisions across different parts of your application. The default emulated encapsulation is often suitable for most applications, providing a good balance between isolation and browser compatibility.


<br><br><hr><br>
## 5. Emulated Vs ShadowDom view encapsulation
Shadow DOM and Emulated View Encapsulation are two techniques used in Angular for styling components and preventing style leakage or conflicts. Let's explore the differences between these two approaches:

### Shadow DOM:

1. **Native Browser Feature:**
   - **Shadow DOM is a native browser feature**, and it's part of the web components standard.
   - It provides true encapsulation by creating a separate, isolated DOM subtree for a component.
   - Styles applied within the Shadow DOM are scoped to that specific component, preventing them from affecting or being affected by styles outside the component.

2. **Browser Support:**
   - **Not universally supported:** While widely supported in modern browsers, not all browsers have full support for Shadow DOM.

3. **Usage in Angular:**
   - **Use `ViewEncapsulation.ShadowDom`:**
     ```typescript
     @Component({
       selector: 'app-example',
       template: '<p class="example">This is an example</p>',
       styles: ['.example { color: red; }'],
       encapsulation: ViewEncapsulation.ShadowDom
     })
     ```

4. **Isolation Level:**
   - **High Isolation:** Provides the highest level of style isolation among the available options.

### Emulated View Encapsulation:

1. **Angular Emulation:**
   - **Angular emulates Shadow DOM using techniques like style rewriting and attribute selectors.**
   - It creates unique attributes for each component and attaches them to the DOM elements, effectively achieving a similar scoping effect.

2. **Browser Support:**
   - **Supported in All Browsers:** Since emulated encapsulation is achieved using standard CSS techniques, it is universally supported in all browsers.

3. **Usage in Angular:**
   - **Default in Angular:** Emulated view encapsulation is the default behavior in Angular, and you don't need to explicitly specify it.
     ```typescript
     @Component({
       selector: 'app-example',
       template: '<p class="example">This is an example</p>',
       styles: ['.example { color: red; }']
     })
     ```

4. **Isolation Level:**
   - **Medium Isolation:** While not as isolated as native Shadow DOM, emulated encapsulation provides a good balance between isolation and broad browser support.

### Summary:

- **Shadow DOM** is a native browser feature providing the highest level of isolation but may not be universally supported.
- **Emulated View Encapsulation** is the default in Angular, achieving similar results by emulating Shadow DOM using widely supported CSS techniques.

In most cases, emulated view encapsulation is sufficient for Angular applications. It provides a good balance between isolation and browser compatibility. However, if your application specifically targets browsers with full Shadow DOM support, or if you are building web components, you may choose to use native Shadow DOM for enhanced encapsulation.

<br><br><hr><br>
## 6. Local template Variables
Local template variables in Angular allow you to reference elements or directives within a template and perform actions with them, such as accessing their properties or calling methods. These variables are defined using the `#` symbol followed by a name, and they can only be accessed within the template where they are defined. Here's how you can use local template variables in Angular:

### Accessing DOM Elements or Directives:

```html
<!-- Using a local template variable to reference an input element -->
<input #inputField type="text">
<button (click)="logInputValue(inputField.value)">Log Value</button>
```

In this example, `#inputField` is a local template variable that references the input element. It can be used within the template to access the input's properties, such as `value`.

### Accessing Angular Components or Directives:

```html
<!-- Using a local template variable to reference a child component -->
<app-child #childComponent></app-child>
<button (click)="childComponent.doSomething()">Do Something</button>
```

Here, `#childComponent` is a local template variable that references the `app-child` component. You can call methods or access properties of the child component using this variable.

### Using Template Variables with Structural Directives:

```html
<!-- Using a local template variable with *ngFor -->
<ul>
  <li *ngFor="let item of items; let i = index" #listItem>
    {{ listItem.textContent }} - Index: {{ i }}
  </li>
</ul>
```

In this example, `#listItem` is a local template variable that references each `li` element generated by the `*ngFor` directive. You can access properties of each list item, such as `textContent` or `innerText`.

### Using Template Variables with ngModel:

```html
<!-- Using a local template variable with ngModel -->
<input #inputField [(ngModel)]="inputValue" type="text">
<button (click)="logInputValue(inputField.value)">Log Value</button>
```

In this case, `#inputField` references the input element, and `[(ngModel)]="inputValue"` binds the input's value to a property `inputValue` in the component. You can then access the value of the input using the local template variable.

### Summary:

Local template variables in Angular provide a convenient way to reference elements, components, or directives within a template and interact with them directly. They are especially useful for accessing DOM elements, calling methods on components, or working with structural directives like `*ngFor`. Remember that these variables are local to the template and cannot be accessed outside of it.


<br><br><hr><br>
## 7. Local template Variables VS ngModel

Local template variables and `ngModel` serve different purposes in Angular, and the choice between them depends on the specific requirements of your application. Let's compare them and discuss when to use each:

### Local Template Variables:

1. **Purpose:**
   - **Reference DOM Elements:** Local template variables allow you to reference HTML elements or Angular components/directives within a template.
   - **Access Properties/Methods:** They enable you to access properties or call methods of elements/components directly within the template.

2. **Usage:**
   - **Element/Component Interaction:** Use local template variables when you need to interact with elements or components within the template itself.
   - **One-Time Access:** Use them for one-time access to elements or components, such as retrieving their values or triggering methods.

3. **Example:**
   ```html
   <input #inputField type="text">
   <button (click)="logInputValue(inputField.value)">Log Value</button>
   ```
   In this example, `#inputField` is a local template variable referencing the input element. You can access its value directly in the template or pass it to a method.

### ngModel:

1. **Purpose:**
   - **Two-Way Data Binding:** `ngModel` provides two-way data binding, binding a component property to an input element's value and keeping them in sync.
   - **Forms Handling:** It's commonly used for handling form inputs and managing their values within the component.

2. **Usage:**
   - **Forms and Inputs:** Use `ngModel` when working with form controls and managing their values in the component.
   - **Bi-Directional Binding:** Use it when you need to bind an input element's value to a component property and reflect changes bidirectionally.

3. **Example:**
   ```html
   <input [(ngModel)]="inputValue" type="text">
   <button (click)="logInputValue(inputValue)">Log Value</button>
   ```
   Here, `[(ngModel)]` binds the input's value to the `inputValue` property in the component. Any changes to the input field are automatically reflected in the component, and vice versa.

### When to Use:

- **Local Template Variables:**
  - Use when you need to reference elements or components within the template for one-time access or interaction.
  - Use for accessing properties or methods of elements/components directly within the template.

- **ngModel:**
  - Use when you need to establish two-way data binding between a component property and an input element's value.
  - Use for managing form inputs and handling their values within the component.

### Summary:

- **Local Template Variables:** Used for referencing elements or components within the template for one-time access or interaction.
- **ngModel:** Used for establishing two-way data binding between a component property and an input element's value, commonly used in forms handling.

<br><br><hr><br>
## 8. @ViewChild in Angular8+
@ViewChild() in Angular 8+
In Angular 8+, the @ViewChild() syntax which you'll see in the next lecture needs to be changed slightly:

Instead of:
```html
@ViewChild('serverContentInput') serverContentInput: ElementRef;
```
use
```html
@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
```
The same change (add { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild() (and also @ContentChild() which you'll learn about later) IF you plan on accessing the selected element inside of ngOnInit().

If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!

If you're using Angular 9+, you only need to add { static: true } (if needed) but not { static: false }.

<br><br><hr><br>
## 9. @ViewChild in Angular8+ - All scenarios
In Angular, `ViewChild` is used to query and access child components, directives, or elements from within a component class. While `ViewChild` primarily targets components and directives, it can also be used to access elements referenced by local template variables. Let's explore how to do this and cover various scenarios:

### Scenario 1: Accessing DOM Elements with Local Template Variables

**HTML Template:**
```html
<input #myInput type="text">
<button (click)="logInputValue()">Log Value</button>
```

**Component Class:**
```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  @ViewChild('myInput', { static: true }) myInputRef: ElementRef;

  logInputValue() {
    console.log('Value of myInput:', this.myInputRef.nativeElement.value);
  }
}
```

**Explanation:**
- In the HTML template, we define a text input element with a local template variable `#myInput`.
- In the component class, we use `ViewChild` to query the input element referenced by the local template variable `myInput`.
- We can then access properties or methods of the input element through `this.myInputRef.nativeElement`.

### Scenario 2: Accessing Angular Components with Local Template Variables

**HTML Template:**
```html
<app-child #childComponent></app-child>
<button (click)="logChildValue()">Log Child Value</button>
```

**Component Class:**
```typescript
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent {
  @ViewChild('childComponent', { static: true }) childComponent: ChildComponent;

  logChildValue() {
    console.log('Child Value:', this.childComponent.childValue);
  }
}
```

**Explanation:**
- In the HTML template, we include a child component (`app-child`) with a local template variable `#childComponent`.
- In the component class, we use `ViewChild` to query the child component referenced by the local template variable `childComponent`.
- We can then access properties or methods of the child component through `this.childComponent`.

### Scenario 3: Accessing DOM Elements with Template Reference Variable in Child Component

**Child Component HTML Template:**
```html
<input #childInput type="text">
```

**Parent Component Class:**
```typescript
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild(ChildComponent, { static: true }) childComponent: ChildComponent;
  @ViewChild('childInput', { static: true }) childInputRef: ElementRef;

  ngAfterViewInit() {
    console.log('Value of childInput:', this.childInputRef.nativeElement.value);
  }
}
```

**Explanation:**
- In the child component's HTML template, we define a text input element with a local template variable `#childInput`.
- In the parent component class, we use `ViewChild` to query the child component and the input element referenced by the local template variable.
- We can then access properties or methods of the input element through `this.childInputRef.nativeElement`.

### Summary:

- `ViewChild` can be used to access DOM elements referenced by local template variables in Angular.
- It allows us to interact with elements directly within the component class, enabling more complex interactions or manipulations.
- `ViewChild` queries can target both Angular components/directives and DOM elements referenced by local template variables.

<br><br><hr><br>
## 10. ng-content
The `ng-content` directive in Angular is used to project content from the parent component's template into the child component's template. It enables the creation of reusable components with flexible layouts, allowing the parent component to pass content dynamically into the child component. Let's explore `ng-content` with an example:

### Example:

Suppose we have a reusable card component that needs to display dynamic content such as a title and some body text. We want to be able to customize this content from the parent component.

**card.component.html (Child Component):**
```html
<div class="card">
  <div class="card-header">
    <ng-content select=".card-title"></ng-content>
  </div>
  <div class="card-body">
    <ng-content select=".card-body-content"></ng-content>
  </div>
</div>
```

In this child component template, we use `ng-content` to define slots where the parent component can pass content dynamically. The `select` attribute allows us to specify which content to project based on CSS selectors.

**parent.component.html (Parent Component):**
```html
<app-card>
  <div class="card-title">
    <h2>Title of the Card</h2>
  </div>
  <div class="card-body-content">
    <p>Body content goes here...</p>
  </div>
</app-card>
```

In the parent component template, we use the `app-card` component and provide the content we want to project into the card. We wrap the content we want to project into the slots defined by `ng-content` in the child component template.

**Explanation:**
- In the child component template, `<ng-content>` acts as placeholders where content from the parent component will be inserted.
- We use CSS selectors with the `select` attribute to specify which content should be projected into each placeholder.
- In the parent component template, we provide the content we want to project into the child component by placing it within the tags of the child component (`<app-card>` in this case).
- The content provided in the parent component template is inserted into the corresponding slots in the child component template based on the CSS selectors specified in the `ng-content` directives.

**Result:**
The content provided in the parent component's template will be projected into the slots defined by `ng-content` in the child component's template. This allows for flexible composition of components, enabling reusability and customization of their layouts and content.

** Detailed explanation with all exaples & use case are given here - <a href="https://github.com/gauripatil/angular-complete-guide/blob/main/Components-databinding-deep-dive/ngContent.md">ngContent details</a>

<br><br><hr><br>
## 11. Lifecycle hooks:
![Screenshot 2024-03-16 at 10 28 31 AM](https://github.com/gauripatil/angular-complete-guide/assets/3206551/6d7b5307-337e-4544-b01c-e7cc60f65d76)

Angular provides several lifecycle hooks that allow you to tap into different stages of a component or directive's lifecycle. These hooks provide you with the ability to perform certain actions at specific points during the component's creation, rendering, and destruction processes. Here's an explanation of each lifecycle hook:

### 1. ngOnChanges
- **Purpose:** Called when the data-bound input properties of a component change.
- **Usage:** Use this hook to perform operations whenever the input properties of the component change.
- **Signature:** `ngOnChanges(changes: SimpleChanges): void`

### 2. ngOnInit
- **Purpose:** Called once, after the first `ngOnChanges` and `ngOnInit` have run.
- **Usage:** Use this hook to perform initialization tasks for the component.
- **Signature:** `ngOnInit(): void`

### 3. ngDoCheck
- **Purpose:** Called during every change detection run, immediately after `ngOnChanges` and `ngOnInit`.
- **Usage:** Use this hook to implement custom change detection.
- **Signature:** `ngDoCheck(): void`

### 4. ngAfterContentInit
- **Purpose:** Called after Angular projects external content into the component's view.
- **Usage:** Use this hook to perform initialization tasks related to the content projected into the component.
- **Signature:** `ngAfterContentInit(): void`

### 5. ngAfterContentChecked
- **Purpose:** Called after Angular checks the content projected into the component.
- **Usage:** Use this hook to perform additional checks or operations after Angular has checked the projected content.
- **Signature:** `ngAfterContentChecked(): void`

### 6. ngAfterViewInit
- **Purpose:** Called after Angular initializes the component's views and child views.
- **Usage:** Use this hook to perform initialization tasks related to the component's view or its child views.
- **Signature:** `ngAfterViewInit(): void`

### 7. ngAfterViewChecked
- **Purpose:** Called after Angular checks the component's views and child views.
- **Usage:** Use this hook to perform additional checks or operations after Angular has checked the component's views and child views.
- **Signature:** `ngAfterViewChecked(): void`

### 8. ngOnDestroy
- **Purpose:** Called just before Angular destroys the component.
- **Usage:** Use this hook to perform cleanup tasks such as unsubscribing from observables or detaching event handlers to prevent memory leaks.
- **Signature:** `ngOnDestroy(): void`

### Summary:
- **Initialization:** `ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterContentInit`, `ngAfterViewInit` are used for initialization tasks.
- **Change Detection:** `ngOnChanges`, `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked` are involved in change detection and content projection.
- **Cleanup:** `ngOnDestroy` is used for cleanup tasks.

These lifecycle hooks give you fine-grained control over your component's behavior at different stages of its lifecycle, allowing you to manage state, perform side effects, and optimize performance effectively.

