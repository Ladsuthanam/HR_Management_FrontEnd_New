import { Component,EventEmitter, Input, Output} from '@angular/core';
import {trigger,state,style,animate,transition,} from '@angular/animations';
import { from } from 'rxjs';

@Component({
  selector: 'app-slide-panel',
  imports: [],
  templateUrl: './slide-panel.component.html',
  styleUrl: './slide-panel.component.css',
  animations: [
    trigger('fadeSlideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SlidePanelComponent {
  @Input() isOpen = false;
  @Input() headerText = 'Slide Panel Header';
  @Output() onClose = new EventEmitter();

  onClosePanel() {
    this.onClose.emit(false);
  }

}
