import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';  
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-holly-day-page',
  standalone: true, 
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './holly-day-page.component.html',
  styleUrls: ['./holly-day-page.component.css']
})
export class HollyDayPageComponent implements OnInit {
  holidayForm: FormGroup;
  holidays: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.holidayForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchHolidays();
  }

  // Fetch holidays from the server
  // Fetch holidays from the server
  fetchHolidays(): void {
    this.http.get<any[]>('http://localhost:5162/api/HollyDay/GetAll').subscribe(
      (data) => {
        this.holidays = data.map((holiday) => ({
          ...holiday,
          isEditing: false,
        }));
      },
      (error) => console.error('Error fetching holidays:', error)
    );
  }

  // Add a new holiday
  addHoliday(): void {
    if (this.holidayForm.valid) {
      this.http.post('http://localhost:5162/api/HollyDay', this.holidayForm.value).subscribe(
        () => {
          this.holidayForm.reset();
          this.fetchHolidays(); // Refresh the holidays list
        },
        (error) => console.error('Error adding holiday:', error)
      );
    }
  }

  // Save the edited holiday and exit editing mode
  saveHoliday(id: number, name: string, date: string): void {
    this.http.put(`http://localhost:5162/api/HollyDay?Id=${id}`, { name, date }).subscribe(
      () => {
        const holiday = this.holidays.find((h) => h.id === id);
        if (holiday) {
          holiday.isEditing = false; // Exit editing mode
        }
      },
      (error) => console.error('Error saving holiday:', error)
    );
  }
  editHoliday(id: number): void {
    const holiday = this.holidays.find((h) => h.id === id);
    if (holiday) {
      holiday.isEditing = true;
    }
  }
  // Delete a holiday
  deleteHoliday(id: number): void {
    this.http.delete(`http://localhost:5162/api/HollyDay?Id=${id}`).subscribe(
      () => {
        this.holidays = this.holidays.filter((h) => h.id !== id);
      },
      (error) => console.error('Error deleting holiday:', error)
    );
  }
}
