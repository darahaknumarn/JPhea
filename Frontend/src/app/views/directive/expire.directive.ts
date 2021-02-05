import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appExpire]'
})
export class ExpireDirective {
  @Input() date: string;
  constructor(private el: ElementRef) {
      console.log(this.date);
      el.nativeElement.style.background = 'yellow';
      
   }

}
