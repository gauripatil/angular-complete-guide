If you're in an Angular 17 project (and only then!), you can also use an alternative syntax for outputting conditional content:

###ngIf vs @if
Instead of using *ngIf, you can use a built-in @if template control flow statement.
```
@if (someCondition) {
  <p>Only visible if 'someCondition' is true</p>
}
```
would replace
```
<p *ngIf="someCondition">Only visible if 'someCondition' is true</p>
```
The advantage of the new syntax is that it can be slightly more efficient under the hood and that it does not rely on NgIf or the CommonModule being imported / available.

Using it is entirely optional! It's also worth noting that this new syntax is only available in "Developer Preview" right now and therefore may change in the future!

###ngFor vs @for
If you're in an Angular 17 project (and only then!), you can also use an alternative syntax for outputting conditional content:

Instead of using *ngFor, you can use a built-in @for template control flow statement.
```
@for (item of items; track item.id) {
  <li>{{ item.title }}</li>
}
```
would replace

```
<li *ngFor="let item of items">{{ item.title }}</li>
```

The advantage of the new syntax is that it can be slightly more efficient under the hood and that it does not rely on NgFor or the CommonModule being imported / available.

The track item.id part is required when using this new syntax - it ensures that Angular can efficiently track and re-render (if needed) the list items.
