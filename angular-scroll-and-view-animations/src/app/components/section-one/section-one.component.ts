import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  animations: [
    trigger('scrollAnimation', [
      state('start', style({
        opacity: 0
      })),
      state('end', style({
        opacity: 1
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
export class SectionOneComponent {
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
      console.log('Jest na ekranie');
      this.animationState = 'end';
    } else {
      console.log('Nie jest na ekranie');
      // this.animationState = 'start';
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