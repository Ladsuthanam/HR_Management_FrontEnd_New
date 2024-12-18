import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-event-show',
  standalone: true, 
  imports: [
    CommonModule,  
    FormsModule
 
  ],
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.css'],
})
export class EventShowComponent {
  viewDate: Date = new Date();
  
  // Ensure that events are typed as CalendarEvent
  events: CalendarEvent[] = [];
  currentEvent: { title: string; date: string; time: string } = { title: '', date: '', time: '' };
  isEdit: boolean = false;

  // Save the event correctly typed as CalendarEvent
  saveEvent() {
    const newEvent: CalendarEvent = {
      title: this.currentEvent.title,
      start: new Date(`${this.currentEvent.date}T${this.currentEvent.time}`), 
    };

    if (this.isEdit) {
      const index = this.events.findIndex((e) => e.title === this.currentEvent.title);
      if (index !== -1) {
        this.events[index] = newEvent;
      }
      this.isEdit = false;
    } else {
      this.events.push(newEvent);
    }

    this.resetForm();
  }

  // Method to edit an existing event
  editEvent(event: CalendarEvent) {
    this.currentEvent.title = event.title!;
    this.currentEvent.date = event.start.toISOString().split('T')[0]; // Format date
    this.currentEvent.time = event.start.toTimeString().split(' ')[0]; // Format time
    this.isEdit = true;
  }

  // Method to delete an event
  deleteEvent(event: CalendarEvent) {
    this.events = this.events.filter((e) => e !== event);
  }

  // Reset the form fields
  resetForm() {
    this.currentEvent = { title: '', date: '', time: '' };
    this.isEdit = false;
  }

  // Method to get colors for event items
  getColor(index: number): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33C1', '#FFC300'];
    return colors[index % colors.length];
  }

  // Handle event click (for example, displaying event info)
  handleEventClick(event: CalendarEvent) {
    alert(`Event: ${event.title}\nDate: ${event.start}`);
  }
}
