# Services & Dependency Injection -

## 1. Explain Angular Service & Dependency Injection
<details>
   <summary>
   
   <ul>
     <li>Angular Service & Dependency Injection</li>
   </ul>
      
   </summary>
   
In Angular, a service is a TypeScript class that encapsulates functionality that can be shared across multiple parts of an application. Services are commonly used to perform tasks such as data fetching, business logic processing, authentication, logging, and more. They promote code reusability, modularity, and maintainability by centralizing common functionality that multiple components or modules may require.

Dependency injection (DI) is a design pattern used by Angular to manage the dependencies of a component or service. With DI, Angular's injector system automatically provides the necessary dependencies to a component or service when it is created, rather than requiring the component or service to create its dependencies directly. This makes components and services more modular and easier to test, as dependencies can be easily swapped out or mocked.

In simpler terms:

- **Service:** A service is a TypeScript class that provides a specific functionality or service to other parts of an Angular application.

- **Dependency Injection:** Dependency injection is a mechanism in Angular that automatically provides the necessary dependencies (services or other objects) to a component or service when it is created. This allows components and services to be decoupled from their dependencies, making them more modular, reusable, and testable.

In summary, services and dependency injection are fundamental concepts in Angular that promote code organization, reusability, and maintainability by allowing common functionality to be encapsulated in services and injected into components as needed.

![Screenshot 2024-03-31 at 9 42 39 PM](https://github.com/gauripatil/angular-complete-guide/assets/3206551/747a1b3a-f328-41c5-b268-e942e2ba1802)


</details>

## 2. How Angular Service & Dependency Injection works
<details>
   <summary>
   
   <ul>
     <li>Creating service</li>
     <li>Registering a service</li>
     <li>Injecting a service</li>
     <li>Dependency Injection</li>
     <li>Singleton Services</li>
     <li>Hierarchical Injection</li>
     <li>Testing Services</li>
   </ul>
      
   </summary>
   
In Angular, services are classes that are responsible for providing functionality that can be shared across components, directives, and other services within an application. They are commonly used for tasks such as data fetching, state management, authentication, logging, and more. Dependency injection (DI) is a design pattern used by Angular to provide services to components and other parts of the application.

Here's how service and dependency injection work in Angular:

### 1. Creating a Service:
You can create a service using the Angular CLI or manually by creating a TypeScript class with the `@Injectable()` decorator from `@angular/core`.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['item1', 'item2', 'item3'];
  }
}
```

### 2. Registering a Service:
Angular provides various ways to register a service, such as providing it at the root level, in a specific module, or even at the component level.

- **Root level:** By providing the service in the `@Injectable()` decorator with `providedIn: 'root'`, Angular automatically registers the service at the root injector.

- **Module level:** You can provide the service in a specific module by adding it to the `providers` array of the module's metadata.

### 3. Injecting a Service:
You can inject a service into a component, directive, or another service by including it as a constructor parameter.

```typescript
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-example',
  template: `
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `
})
export class ExampleComponent {
  items: string[];

  constructor(private dataService: DataService) {
    this.items = this.dataService.getData();
  }
}
```

### 4. Dependency Injection:
Angular's dependency injection system automatically resolves and injects the required dependencies (services) into the constructor of a component or other injectable class. It provides a centralized way to manage and inject dependencies throughout the application, making it easier to maintain and test.

### 5. Singleton Services:
By default, services registered with `providedIn: 'root'` are singleton instances. Angular maintains a single instance of the service throughout the application and shares it wherever it's injected.

### 6. Hierarchical Injection:
Angular's DI system follows a hierarchical injection pattern, where services can be injected at different levels (root, module, component) and are inherited by child components.

### 7. Testing Services:
Angular's dependency injection makes it easy to write unit tests for services by providing mock implementations or using dependency injection tokens to replace real dependencies with test doubles.

Overall, services and dependency injection are core concepts in Angular that enable efficient sharing of functionality and data across different parts of an application while promoting modularity, testability, and maintainability.
</details>

## 3. Angular service instances and various scenarios

<details>
   <summary>
   
   <ul>
     <li>Singleton Services (provided in root)</li>
     <li>Module-Level Services</li>
     <li>Component-Level Services</li>
     <li>Lazy-Loaded Modules</li>
     <li>Factory Providers</li>
     <li>Injection Token Overrides</li>
   </ul>
      
   </summary>
   
In Angular, the number of instances of a service created and how they are handled depend on how the service is provided. Angular supports different methods of providing services, each affecting the lifecycle and sharing behavior of the service instances. Here's how Angular handles service instances in various scenarios:

1. **Singleton Services (provided in root)**:
   - When a service is provided at the root level (using the `providedIn: 'root'` syntax or `@Injectable({ providedIn: 'root' })` decorator), Angular creates a single instance of the service for the entire application.
   - This instance is shared across all components, directives, and other services that inject it.

2. **Module-Level Services**:
   - When a service is provided at the module level (by adding it to the `providers` array of a module), Angular creates a single instance of the service for the entire module.
   - This instance is shared among all components, directives, and other services within that module.

3. **Component-Level Services**:
   - When a service is provided at the component level (by adding it to the `providers` array of a component's metadata), Angular creates a new instance of the service for each instance of the component.
   - Each component gets its own instance of the service, isolated from other components.

4. **Lazy-Loaded Modules**:
   - When a module is lazy-loaded, Angular creates a new instance of any services provided at the module level.
   - This ensures that lazy-loaded modules have their own separate instances of services, maintaining encapsulation and isolation.

5. **Factory Providers**:
   - Angular allows services to be provided using factory functions, which can dynamically determine how instances are created.
   - By defining a factory provider, you can customize the creation and lifecycle of service instances based on specific criteria or conditions.

6. **Injection Token Overrides**:
   - Angular provides the ability to override service instances using injection tokens.
   - This allows you to replace a service instance with a different implementation or a mock instance, useful for testing or providing alternative implementations based on runtime conditions.

Overall, Angular's dependency injection system ensures that services are created and managed in a way that promotes modularity, encapsulation, and reusability. Depending on where and how a service is provided, Angular handles service instances accordingly to maintain the desired behavior and lifecycle throughout the application.

</details>

## 4. Explain Singleton Services
<details>
<summary>
      <ul>Definition, Providing, Usage, Lifecycle, Sharing state, example</ul>
</summary>

### Singleton Services (provided in root):
- **Definition**: 
  - A singleton service is a service for which Angular maintains a single instance throughout the application's lifecycle.
  - When a service is provided at the root level, Angular ensures that only one instance of that service is created and shared across the entire application.
- **Providing at the Root Level**:
  - You can provide a service at the root level by using the `providedIn: 'root'` syntax or by decorating the service class with `@Injectable({ providedIn: 'root' })`.
  - This is often considered a best practice for services that need to be shared across multiple components, directives, and services.
- **Usage**:
  - Once provided at the root level, the service instance is available for injection into any component, directive, or service throughout the application.
  - Components or other injectables that request the service will receive the same instance of the service.
- **Lifecycle**:
  - The singleton service instance is created when it is first injected or accessed within the application and persists until the application is closed or refreshed.
  - It remains in memory for the entire lifetime of the application.
- **Sharing State**:
  - Since there is only one instance of the service, any data or state stored within the service is shared across all components and services that inject it.
  - Changes to the service's state are immediately reflected in all parts of the application that use the service.
- **Example**:
  - ```typescript
    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root'
    })
    export class DataService {
      data: any[];

      constructor() {
        this.data = [];
      }

      addData(item: any) {
        this.data.push(item);
      }

      getData() {
        return this.data;
      }
    }
    ```
  - In this example, `DataService` is a singleton service provided at the root level. It maintains a single instance of the `data` array, which can be accessed and modified by any component or service in the application.

By providing services as singletons at the root level, Angular ensures efficient sharing of functionality and state across different parts of the application while maintaining a clean and organized code structure.

</details>

## 5. Explain Module-Level Services
<details>
<summary>
      <ul>Definition, Providing, Usage, Lifecycle, Isolation, example</ul> 
</summary>

   Certainly! Let's dive deeper into point 2, which focuses on module-level services in Angular:

### Module-Level Services:
- **Definition**:
  - Module-level services are services provided within a specific Angular module.
  - When a service is provided at the module level, Angular creates a single instance of that service for the entire module.
- **Providing at the Module Level**:
  - You can provide a service at the module level by adding it to the `providers` array of the module's metadata.
  - Services provided at the module level are accessible to all components, directives, and other services within that module.
- **Usage**:
  - Once provided at the module level, the service instance is available for injection into any component, directive, or service within the same module.
  - Components or other injectables that request the service will receive the same instance of the service within that module.
- **Lifecycle**:
  - The module-level service instance is created when it is first injected or accessed within the module and persists as long as the module is loaded.
  - If the module is eagerly loaded, the service instance is created when the application starts. If the module is lazily loaded, the service instance is created when the module is first loaded.
- **Isolation**:
  - Services provided at the module level are isolated to the module in which they are provided.
  - They are not accessible to components, directives, or services in other modules unless explicitly imported and provided in those modules as well.
- **Example**:
  - ```typescript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class LoggerService {
      log(message: string) {
        console.log(message);
      }
    }
    ```
  - ```typescript
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { LoggerService } from './logger.service';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CommonModule
      ],
      providers: [LoggerService] // Provide LoggerService at the module level
    })
    export class AppModule { }
    ```
  - In this example, `LoggerService` is provided at the module level within the `AppModule`. It can be injected into any component, directive, or service within `AppModule`.

Module-level services are useful for providing functionality that is specific to a particular module and needs to be shared among multiple components or services within that module. They offer encapsulation and isolation, allowing modules to define their own set of services independently of other modules.

</details>



## 6. Explain Component-Level Services
<details>
<summary>
      <ul>Definition, Providing, Usage, Lifecycle, Isolation, example</ul> 
</summary>

   Certainly! Let's delve deeper into point 3, which focuses on component-level services in Angular:

### Component-Level Services:
- **Definition**:
  - Component-level services are services provided within a specific Angular component.
  - When a service is provided at the component level, Angular creates a new instance of that service for each instance of the component.
- **Providing at the Component Level**:
  - You can provide a service at the component level by adding it to the `providers` array of the component's metadata.
  - Services provided at the component level are scoped to the component and its child components. Each instance of the component gets its own instance of the service.
- **Usage**:
  - Once provided at the component level, the service instance is available for injection into the component and its child components.
  - Each component instance that requests the service will receive its own instance of the service.
- **Lifecycle**:
  - The component-level service instance is created when a new instance of the component is created and destroyed when the component is destroyed.
  - Each time the component is instantiated, a new instance of the service is created specifically for that instance of the component.
- **Isolation**:
  - Services provided at the component level are isolated to the component and its child components.
  - They are not accessible to other components, directives, or services outside of the component's scope.
- **Example**:
  - ```typescript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class LoggerService {
      log(message: string) {
        console.log(message);
      }
    }
    ```
  - ```typescript
    import { Component } from '@angular/core';
    import { LoggerService } from './logger.service';

    @Component({
      selector: 'app-example',
      template: '<button (click)="log()">Log Message</button>',
      providers: [LoggerService] // Provide LoggerService at the component level
    })
    export class ExampleComponent {
      constructor(private logger: LoggerService) {}

      log() {
        this.logger.log('Message logged from ExampleComponent');
      }
    }
    ```
  - In this example, `LoggerService` is provided at the component level within `ExampleComponent`. Each instance of `ExampleComponent` will have its own instance of `LoggerService`.

Component-level services are useful for providing functionality that is closely tied to a specific component and does not need to be shared with other parts of the application. They offer encapsulation and isolation, allowing components to have their own private instances of services. This can be helpful for managing component-specific state or behavior.


</details>



## 7. Explain Lazy-Loaded Modules
<details>
<summary>
      <ul>Definition, Providing, Usage, Lifecycle, example</ul> 
</summary>

   Certainly! Let's explore point 4, which pertains to lazy-loaded modules in Angular:

### Lazy-Loaded Modules:
- **Definition**:
  - Lazy loading is a technique in Angular where modules are loaded asynchronously only when they are needed, rather than loading them all upfront when the application starts.
  - Lazy-loaded modules are modules that are loaded on demand, typically when a user navigates to a specific route associated with the lazy-loaded module.
- **Module-Level Services in Lazy-Loaded Modules**:
  - When a module is lazy-loaded, Angular creates a new instance of any services provided at the module level.
  - This ensures that lazy-loaded modules have their own separate instances of services, maintaining encapsulation and isolation.
- **Usage**:
  - Services provided at the module level within a lazy-loaded module are accessible to all components, directives, and other services within that module.
  - Each lazy-loaded module instance will have its own instance of the module-level services.
- **Lifecycle**:
  - The instance of module-level services within a lazy-loaded module is created when the module is first loaded.
  - Once created, the service instance persists as long as the lazy-loaded module remains loaded.
- **Example**:
  - ```typescript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class DataService {
      getData() {
        return ['item1', 'item2', 'item3'];
      }
    }
    ```
  - ```typescript
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterModule } from '@angular/router';
    import { LazyLoadedComponent } from './lazy-loaded.component';
    import { DataService } from './data.service';

    @NgModule({
      declarations: [
        LazyLoadedComponent
      ],
      imports: [
        CommonModule,
        RouterModule.forChild([
          { path: '', component: LazyLoadedComponent }
        ])
      ],
      providers: [DataService] // Provide DataService at the module level
    })
    export class LazyLoadedModule { }
    ```
  - In this example, `DataService` is provided at the module level within `LazyLoadedModule`. When `LazyLoadedModule` is lazy-loaded, Angular creates a new instance of `DataService`.

Lazy loading is a powerful optimization technique in Angular, as it helps reduce the initial bundle size and improve application startup performance by loading only the necessary code when it is needed. Services provided within lazy-loaded modules help maintain encapsulation and isolation, ensuring that lazy-loaded modules operate independently of each other.

</details>



## 8. Explain Factory Providers
<details>
<summary>
      <ul>Definition, Usage, Syntax, example</ul> 
</summary>

   Certainly! Let's elaborate on point 5, which concerns factory providers in Angular:

### Factory Providers:
- **Definition**:
  - Factory providers are a way to dynamically create service instances using factory functions.
  - Instead of providing a service class directly, you can provide a factory function that Angular calls to create the service instance.
- **Usage**:
  - Factory providers are useful when you need to customize the creation process of service instances based on specific conditions or parameters.
  - The factory function can determine how service instances are created, potentially allowing for different instances to be returned based on runtime conditions.
- **Syntax**:
  - You define a factory provider by using the `useFactory` property in the `providers` array of a module or component metadata.
  - The `useFactory` property specifies the factory function responsible for creating service instances.
- **Example**:
  - ```typescript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class DataService {
      constructor(private prefix: string) {}

      getData() {
        return `${this.prefix}: Data`;
      }
    }
    ```
  - ```typescript
    import { NgModule } from '@angular/core';
    import { DataService } from './data.service';

    export function dataServiceFactory() {
      return new DataService('Factory');
    }

    @NgModule({
      providers: [
        { provide: DataService, useFactory: dataServiceFactory }
      ]
    })
    export class AppModule { }
    ```
  - In this example, a factory function `dataServiceFactory` is defined to create instances of the `DataService` class. The factory function returns a new instance of `DataService` with a specific prefix.

Factory providers give you flexibility in how service instances are created, allowing you to customize their instantiation process. They are particularly useful when you need to inject dependencies or configure service instances based on runtime conditions. This approach promotes modularity and testability by separating the service creation logic from its usage.

</details>



## 9. Explain Injection Token Overrides
<details>
<summary>
      <ul>Definition, Usage, Syntax, example</ul> 
</summary>

### Injection Token Overrides:
- **Definition**:
  - Injection token overrides allow you to replace the default implementation of a service with a different implementation or a mock instance.
  - This is useful for testing purposes or for providing alternative implementations of a service based on runtime conditions.
- **Usage**:
  - Angular uses injection tokens to identify dependencies when resolving them from the injector.
  - By providing a different implementation or value for an injection token, you can override the default behavior of a service.
- **Syntax**:
  - You can override the default implementation of a service by providing a different value for its injection token in the `providers` array of a module or component metadata.
  - Alternatively, you can use a `useClass`, `useExisting`, or `useValue` property to specify the alternative implementation or value.
- **Example**:
  - ```typescript
    import { Injectable, InjectionToken } from '@angular/core';

    export const LoggerServiceToken = new InjectionToken<LoggerService>('LoggerService');

    @Injectable()
    export class LoggerService {
      log(message: string) {
        console.log(message);
      }
    }
    ```
  - ```typescript
    import { NgModule } from '@angular/core';
    import { LoggerServiceToken, LoggerService } from './logger.service';
    import { MockLoggerService } from './mock-logger.service';

    @NgModule({
      providers: [
        { provide: LoggerServiceToken, useClass: MockLoggerService }
      ]
    })
    export class AppModule { }
    ```
  - In this example, the default implementation of `LoggerService` is replaced with `MockLoggerService` by providing a different value for the `LoggerServiceToken` injection token.

Injection token overrides give you fine-grained control over the dependencies of your Angular application, allowing you to replace or customize the behavior of services without modifying their implementation. This promotes flexibility and modularity, making it easier to test and maintain your codebase.

</details>

## 10. How to use services for cross-component communication
<details>
   <summary>
      <ul>
         <li>Create service</li>
         <li>Sender Component</li>
         <li>Receiver Component</li>
      </ul>
   </summary>
   In Angular, services are often used as intermediaries for cross-component communication. They provide a centralized way for components to interact with each other without directly coupling them together. Here's how you can use services for cross-component communication:

### 1. Define a Service:
Create a service that will handle the communication logic between components. This service will typically contain methods or properties to facilitate data exchange.

```typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Subject for sending data between components
  private dataSubject = new Subject<any>();

  // Observable to subscribe to for receiving data
  data$ = this.dataSubject.asObservable();

  // Method to send data to other components
  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
```

### 2. Sender Component:
Inject the service into the sender component and call the appropriate method to send data.

```typescript
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-sender',
  template: `
    <button (click)="sendData()">Send Data</button>
  `
})
export class SenderComponent {
  constructor(private dataService: DataService) {}

  sendData() {
    const dataToSend = { message: 'Hello from sender component!' };
    this.dataService.sendData(dataToSend);
  }
}
```

### 3. Receiver Component:
Inject the service into the receiver component and subscribe to the observable to receive data.

```typescript
import { Component, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receiver',
  template: `
    <div>{{ receivedData?.message }}</div>
  `
})
export class ReceiverComponent implements OnDestroy {
  receivedData: any;
  private dataSubscription: Subscription;

  constructor(private dataService: DataService) {
    // Subscribe to the data observable
    this.dataSubscription = this.dataService.data$.subscribe(data => {
      this.receivedData = data;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.dataSubscription.unsubscribe();
  }
}
```

In this setup, when the sender component calls `sendData()` method on the `DataService`, the data is sent through the `dataSubject`. Any component that is subscribed to the `data$` observable will receive this data and can react accordingly. This way, components remain decoupled and can communicate without direct dependencies on each other. Additionally, the use of observables ensures that components are updated asynchronously when new data is received.
</details>


## 11. Alternative of Service Injection Syntax
<details>
   
Injecting services (or, in general: dependencies) into components via the constructor functions is the most common way of perform such injections. You'll see this approach in most Angular projects you'll be working on.

However, there also is an alternative way of injecting dependencies: Via Angular's inject() function.

Instead of injecting LoggingService like this:
```
@Component(...)
export class AccountComponent {
  // @Input() & @Output() code as shown in the previous lecture
 
  constructor(private loggingService: LoggingService) {}
}
```
you could inject it like this, by using the inject() function:

```
import { Component, Input, Output, inject } from '@angular/core'; // <- Add inject import
 
@Component(...)
export class AccountComponent {
  // @Input() & @Output() code as shown in the previous lecture
  private loggingService?: LoggingService; // <- must be added
 
  constructor() {
    this.loggingService = inject(LoggingService);
  }
}
```
It's totally up to you, which approach you prefer. In this course (and, as mentioned, in most projects), we'll use the constructor approach.
</details>
