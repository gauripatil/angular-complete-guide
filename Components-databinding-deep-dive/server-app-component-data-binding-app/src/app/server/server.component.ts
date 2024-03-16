import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('serverElem') element: { type: string; name: string; content: string; } | undefined;
  @Input() name: string | undefined;
  @ViewChild('heading', { static: true }) headerEle: ElementRef | undefined;
  @ContentChild('contentParagraph', { static: true }) paragraphEle: ElementRef | undefined;

  constructor() {
    console.log('onstructor called!');
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }
  
  ngOnInit() {
    console.log('ngOnInit called!');
    console.log('Text Content: ' + this.headerEle?.nativeElement.textContent);
    console.log('Text Content Of Paragraph: ' + this.paragraphEle?.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
    console.log('Text Content Of Paragraph: ' + this.paragraphEle?.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Text Content: ' + this.headerEle?.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }

}
