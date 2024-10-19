// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-services',
//   templateUrl: './services.component.html',
//   styleUrl: './services.component.css'
// })
// export class ServicesComponent {
//   services = [
//     {
//       title: 'Web Development',
//       description: 'I build responsive and performance websites using the latest web technologies.',
//       icon: 'fas fa-code' // FontAwesome icon class
//     },
//     {
//       title: 'Graphic Design',
//       description: 'Crafting visually stunning and intuitive user interfaces that blend creativity with functionality, ensuring an engaging and seamless experience for every user.',
//       icon: 'fas fa-paint-brush'
//     },

//     {
//       "title": "IT & Networks",
//       "description": "Delivering robust, scalable, and secure cloud infrastructure solutions tailored to optimize your business's growth and operational efficiency.",
//       "icon": "fas fa-network-wired"  // Updated icon to represent networks more accurately
//     },
//     {
//       title: 'Database Management',
//       description: 'Ensuring data integrity and performance with database management.',
//       icon: 'fas fa-database'
//     },

//   ];
// }

import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services_services'; // Make sure the path is correct

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] = []; // Array to store the fetched services

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServices(); // Load services when the component initializes
  }

  // Method to load services from the backend
  loadServices(): void {
    this.servicesService.getAllServices().subscribe(
      (data) => {
        this.services = data; // Assign the fetched data to the services array
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }
  
}
