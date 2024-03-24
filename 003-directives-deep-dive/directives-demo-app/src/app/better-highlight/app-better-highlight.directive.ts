import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class AppBetterHighlightDirective  implements OnInit{

  constructor(private renderer: Renderer2, private eleRef: ElementRef){ }
  
  ngOnInit(): void {
    this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
  }

  

}
