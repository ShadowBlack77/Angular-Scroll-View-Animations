import { Component, ElementRef, ViewChild, HostListener } from "@angular/core";
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-section-four',
  templateUrl: './section-four.component.html',
  animations: [
    trigger('scrollAnimation', [
      state('start', style({
        opacity: 0,
        transform: 'translateY(200px)'
      })),
      state('end', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      transition('start => end', [
        animate('1s ease-in-out')
      ]),
      transition('end => start', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class SectionFourComponent {
  @ViewChild('targetElement') targetElement!: ElementRef;

  animationState = 'start';

  checkIfElementIsInViewport() {
    const element = this.targetElement.nativeElement;
    const rect = element.getBoundingClientRect();

    const isInViewport = 
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (isInViewport) {
      this.animationState = 'end';
    } else {
      // this.animationState = 'start'
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkIfElementIsInViewport();
  }

  @HostListener('window:load')
  onLoad() {
    this.checkIfElementIsInViewport();
  }
}