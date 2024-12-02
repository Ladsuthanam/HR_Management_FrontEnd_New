import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import bootstrap from 'bootstrap';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  itemName: string = '';
  items: string[] = []; // Array to store saved items

  saveItem() {
    if (this.itemName.trim()) {
      this.items.push(this.itemName); // Add the item to the array
      console.log('Item Saved:', this.itemName);
      this.itemName = ''; // Clear the input field
    } else {
      alert('Please enter an item name.');
    }
  }

  
  closeModal() {
    const modalElement = document.getElementById('addItemModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Requires Bootstrap JS
      modal.hide(); // Programmatically hide the modal
    }
  }

}
