import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  contactName: string = '';
  contactEmail: string = '';
  contactMessage: string = '';

  onSubmit() {
    console.log('Name:', this.contactName);
    console.log('Email:', this.contactEmail);
    console.log('Message:', this.contactMessage);

    // Here you can add functionality to send the form data to the server or display a success message
  }

}
