import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  title: string = "Contact Me";
  description: string = "I'd love to hear from you! Feel free to drop me a message.";
  phone: string = "01551398141";
  email: string = "example@example.com";
  address: string = "Giza, Egypt";

  submitForm() {
    
    console.log("Form submitted!");
  }

}
