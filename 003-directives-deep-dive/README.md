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
