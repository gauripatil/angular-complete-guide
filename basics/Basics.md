If you're in an Angular 17 project (and only then!), you can also use an alternative syntax for outputting conditional content:

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

