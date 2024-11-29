import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { RouterLink, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, FormsModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'HRM_System_FrodEnd';
}
