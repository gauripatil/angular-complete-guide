## 1. Types of directives
<details>
   <summary>
   
   <ul>
     <li>Attribute</li>
      <li>Structural</li>
   </ul>
      
   </summary>
   
![Screenshot 2024-03-24 at 12 09 02 AM](https://github.com/gauripatil/angular-complete-guide/assets/3206551/65216f5d-d952-498d-afd8-7817b0639a44)
</details>

<br><hr><br>

## 2. What is Renderer? When to use Renderer?
<details>
   <summary>
   
   <ul>
     <li>Renderer</li>
      <li>Example</li>
   </ul>
      
   </summary>
   

In Angular, the Renderer is a service provided by the `@angular/core` package that provides a way to interact with the DOM without directly accessing the DOM APIs. Using the Renderer is considered best practice in Angular because it abstracts away platform-specific details and ensures consistent behavior across different environments such as web browsers, server-side rendering (SSR), and web workers. It also helps maintain security and improves testability.


Here's an example of using the Renderer while creating a custom attribute directive in Angular:

```typescript
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    // Using Renderer to set styles
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
```

In this example:
- We import `Renderer2` from `@angular/core`.
- We inject `Renderer2` and `ElementRef` into the constructor of the directive.
- We define host listeners (`@HostListener`) to handle mouse enter and mouse leave events.
- In the `highlight()` method, we use the Renderer to set the background color of the element.
- By using the Renderer, we ensure that our directive interacts with the DOM in a platform-independent way, making our code more maintainable and secure.

When using the Renderer, Angular handles any platform-specific details internally, allowing our directive to work consistently across different environments. Additionally, using the Renderer helps prevent security vulnerabilities such as cross-site scripting (XSS) attacks by automatically sanitizing and escaping values before rendering them in the DOM.

</details>
<br><hr><br>

## 3. Why to use Renderer?

<details>
   <summary>
   
   <ul>
     <li>Platform Independence</li>
      <li>Security</li>
      <li>Performance Optimization</li>
      <li>Angular Compatibility</li>
      <li>Testability</li>
   </ul>
      
   </summary>

   
Using the Renderer in Angular attribute directives provides a platform-independent way to interact with the DOM, ensuring compatibility across different environments, including server-side rendering (SSR) and web workers. Here are some reasons why you should use the Renderer in attribute directives:

1. **Platform Independence:**
   - The Renderer abstracts away direct DOM manipulation, providing a layer of indirection that Angular can use to interact with the DOM.
   - This abstraction ensures that your code works consistently across different platforms and environments, including browsers, servers (for server-side rendering), and web workers.
   
2. **Security:**
   - Using the Renderer helps prevent security vulnerabilities such as cross-site scripting (XSS) attacks by ensuring that values are properly sanitized and escaped before being rendered in the DOM.
   - The Renderer automatically handles security concerns like sanitizing user input and preventing direct access to the underlying DOM, reducing the risk of introducing security vulnerabilities.

3. **Performance Optimization:**
   - The Renderer optimizes DOM manipulations under the hood, leveraging Angular's change detection mechanism to batch and efficiently apply changes to the DOM.
   - This optimization improves the performance of your application by reducing unnecessary DOM updates and ensuring that changes are applied in an optimal way.

4. **Angular Compatibility:**
   - Using the Renderer aligns with Angular's philosophy of separation of concerns and abstraction of platform-specific details.
   - It ensures that your code follows Angular best practices and integrates seamlessly with the Angular framework, making it easier to maintain and update in the future.

5. **Testability:**
   - The Renderer facilitates unit testing of your directive by providing a mock implementation that can be used in testing environments.
   - You can easily mock the Renderer in unit tests to isolate and test the behavior of your directive without relying on the actual DOM.

Overall, using the Renderer in attribute directives helps ensure platform independence, security, performance optimization, Angular compatibility, and testability, making your code more robust and maintainable in the long run.
</details>


## 4. HostBinding & HostListner
<details>
   <summary>
   
   <ul>
     <li>HostBinding - Purpose, Usage & example</li>
      <li>HostListner - Purpose, Usage & example</li>
   </ul>
      
   </summary>

   Certainly! `@HostBinding` and `@HostListener` are decorators provided by Angular that are commonly used in directives to bind properties or listen to events on the host element of the directive. Let's explain each with examples:

### 1. @HostBinding:
- **Purpose:** Binds a property of the host element.
- **Usage:** Used to dynamically set values for properties of the host element.
- **Example:**
  
  ```typescript
  import { Directive, HostBinding, ElementRef } from '@angular/core';

  @Directive({
    selector: '[appHighlight]'
  })
  export class HighlightDirective {
    constructor(private el: ElementRef) {}

    @HostBinding('style.backgroundColor') backgroundColor: string = 'yellow';

    onMouseEnter() {
      this.backgroundColor = 'orange';
    }

    onMouseLeave() {
      this.backgroundColor = 'yellow';
    }
  }
  ```

  ```html
  <div appHighlight (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
    Highlighted Content
  </div>
  ```

  In this example, `@HostBinding` is used to dynamically set the `backgroundColor` style property of the host element based on mouse events.

### 2. @HostListener:
- **Purpose:** Listens to events on the host element.
- **Usage:** Used to execute methods when events occur on the host element.
- **Example:**
  
  ```typescript
  import { Directive, HostListener, ElementRef } from '@angular/core';

  @Directive({
    selector: '[appClick]'
  })
  export class ClickDirective {
    constructor(private el: ElementRef) {}

    @HostListener('click') onClick() {
      alert('Element clicked!');
    }
  }
  ```

  ```html
  <button appClick>Click me</button>
  ```

  In this example, `@HostListener` listens to the click event on the host element (in this case, a button) and triggers the `onClick()` method.

### Summary:
- `@HostBinding` is used to bind properties of the host element dynamically.
- `@HostListener` is used to listen to events on the host element and execute methods accordingly.
- Both decorators are commonly used in Angular directives to interact with the host element in a declarative and intuitive way, enhancing the behavior and appearance of DOM elements.

</details>   
