// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { aboutService } from '../../services/about_services';
// import { ProjectService } from '../../services/project_sevices';
// import { ServicesService } from '../../services/services_services';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//   AllAbout: any[] = [];
//   AllProject: any[] = [];
//   AllService: any[] = [];

//   myForm: FormGroup = new FormGroup({});
//   projectForm: FormGroup = new FormGroup({});
//   serviceForm: FormGroup = new FormGroup({});
//   selectedAbout: any = null; // Track the currently selected "about" item for editing
//   selectedProject: any = null;
//   selectedservice: any = null; // Track the currently selected project for editing
//   selectedImage: File | null = null;
//   errorMessage: string = ''; // To display error messages, if any

//   constructor(
//     private _aboutService: aboutService,
//     private formBuilder: FormBuilder,
//     private projectService: ProjectService,
//     private serviceService:  ServiceService,
//   ) {}

//   // Initialize the forms
//   initializeForm() {
//     this.myForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       currentWork: ['', Validators.required],
//       skillsTitle: ['', Validators.required],
//       skills: ['', Validators.required],
//       resumeText: ['', Validators.required]
//     });
//     this.projectForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       repoLink: ['', Validators.required],
//       technologies: ['', Validators.required],
//       image: ['', Validators.required],
//       date: ['', Validators.required],
//     });
//     this.serviceForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       icon: ['', Validators.required],

//     });
//   }

//   // About section
//   AboutUrl: string = 'http://localhost:3000/api/about/';

//   getImageAboutPath(image: string): string {
//     return this.AboutUrl + image;
//   }

//   // Fetch all "about" data
//   getAbout() {
//     this._aboutService.getAbout().subscribe((res: any[]) => {
//       if (Array.isArray(res)) {
//         this.AllAbout = res;
//       } else {
//         this.AllAbout = [res]; // Wrap the single object in an array
//       }
//       console.log(this.AllAbout);
//     }, (err: any) => {
//       console.error('Error fetching about data:', err);
//     });
//   }

//   // Fetch all project data
//   getProject() {
//     this.projectService.getAllProjects().subscribe((res) => {
//       if (Array.isArray(res)) {
//         this.AllProject = res;
//       } else {
//         this.AllProject = [res]; // Wrap the single object in an array
//       }
//       console.log(this.AllProject);
//     }, (err: any) => {
//       console.error('Error fetching project data:', err);
//     });
//   }

//   // Edit "about" data
//   editAbout(data: any) {
//     this.selectedAbout = data;
//     this.myForm.patchValue({
//       title: data.title,
//       description: data.description,
//       currentWork: data.currentWork,
//       skillsTitle: data.skillsTitle,
//       skills: data.skills,
//       resumeText: data.resumeText
//     });
//   }

//   // Edit project data
//   editProject(project: any) {
//     this.selectedProject = project; // Ensure the project is correctly set
//     this.projectForm.patchValue({
//       title: project.title,
//       description: project.description,
//       repoLink: project.link,
//       technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
//       image: project.image,
//       date: project.date,
//     });
//   }

//   // Submit updated "about" data
//   onSubmit() {
//     if (this.myForm.valid) {
//       const updatedData = { ...this.selectedAbout, ...this.myForm.value };
//       this._aboutService.updateAbout(updatedData).subscribe((response: any) => {
//         console.log('Update success:', response);
//         this.getAbout(); // Refresh the data
//         this.resetForm(); // Reset the form
//       }, (err: any) => {
//         console.error('Error updating about data:', err);
//       });
//     } else {
//       console.log('Form is invalid');
//     }
//   }

//   // Submit updated project data
//   onSubmitproject() {
//     if (this.projectForm.valid) {
//       const updatedProject = { ...this.selectedProject, ...this.projectForm.value };

//       this.projectService.updateProjectt(updatedProject).subscribe(
//         (response: any) => {
//           console.log('Project updated successfully:', response);
//           this.getProject(); // Refresh the project data
//           this.resetProjectForm(); // Reset the form
//         },
//         (error: any) => {
//           console.error('Error updating project:', error);
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       Object.keys(this.projectForm.controls).forEach(key => {
//         const controlErrors = this.projectForm.get(key)?.errors;
//         if (controlErrors != null) {
//           console.log(`Key: ${key}, Errors:`, controlErrors);
//         }
//       });
//     }
//   }

//   onSubmitService(): void {
//     if (this.serviceForm.valid) {
//       const updatedService = { ...this.selectedservice, ...this.serviceForm.value };

//       this.ServiceService.updateService(updatedService).subscribe(
//         (response: any) => {
//           console.log('Service updated successfully:', response);
//           this.getservice(); // Refresh the service data
//           this.resetserviceForm(); // Reset the form
//         },
//         (error: any) => {
//           console.error('Error updating service:', error);
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       Object.keys(this.serviceForm.controls).forEach(key => {
//         const controlErrors = this.serviceForm.get(key)?.errors;
//         if (controlErrors != null) {
//           console.log(`Key: ${key}, Errors:`, controlErrors);
//         }
//       });
//     }
//   }


//   // Reset "about" form
//   resetForm() {
//     this.selectedAbout = null;
//     this.myForm.reset();
//   }

//   // Reset project form
//   resetProjectForm() {
//     this.selectedProject = null;
//     this.projectForm.reset();
//   }
//   resetserviceForm() {
//     this.selectedservice = null;
//     this.serviceForm.reset();
//   }

//   // Delete a project
//   deleteProject(id: string): void {
//     if (confirm('Are you sure you want to delete this project?')) {
//       this.projectService.deleteProject(id).subscribe(() => {
//         this.AllProject = this.AllProject.filter(project => project._id !== id);
//       }, (error: any) => {
//         console.error('Error deleting project:', error);
//         this.errorMessage = 'Failed to delete the project. Please try again later.';
//       });
//     }
//   }
//   // loadServices(): void {
//   //   this.ServiceService.getAllServices().subscribe(
//   //     (data) => {
//   //       this.ServiceService = data;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching services:', error);
//   //     }
//   //   );
//   // }
//   getservice() {
//     this.ServiceService.getAllServices().subscribe((res) => {
//       if (Array.isArray(res)) {
//         this.AllService = res;
//       } else {
//         this.AllService = [res]; // Wrap the single object in an array
//       }
//       console.log(this.AllService);
//     }, (err: any) => {
//       console.error('Error fetching service data:', err);
//     });
//   }
//   editService(service: any): void {
//     this.selectedservice = service.id;
//     this.serviceForm.patchValue({
//       title: service.title,
//       description: service.description,
//       icon: service.icon
//     });
//   }


//   // Lifecycle hook
//   ngOnInit(): void {
//     this.getAbout();
//     this.getProject();
//     this.initializeForm();
//     this.getService();
//      // Initializes both About and Project forms
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { aboutService } from '../../services/about_services';
import { ProjectService } from '../../services/project_sevices';
import { ServicesService } from '../../services/services_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  AllAbout: any[] = [];
  AllProject: any[] = [];
  AllService: any[] = [];

  myForm: FormGroup = new FormGroup({});
  projectForm: FormGroup = new FormGroup({});
  serviceForm: FormGroup = new FormGroup({});
  selectedAbout: any = null;
  selectedProject: any = null;
  selectedService: any = null;
  selectedImage: File | null = null;
  errorMessage: string = '';

  constructor(
    private _aboutService: aboutService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private servicesService: ServicesService,
  ) {}

  // Initialize the forms
  initializeForm() {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      currentWork: ['', Validators.required],
      skillsTitle: ['', Validators.required],
      skills: ['', Validators.required],
      resumeText: ['', Validators.required]
    });
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      repoLink: ['', Validators.required],
      technologies: ['', Validators.required],
      image: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.serviceForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  // Fetch all "about" data
  getAbout() {
    this._aboutService.getAbout().subscribe((res: any[]) => {
      this.AllAbout = Array.isArray(res) ? res : [res];
      console.log(this.AllAbout);
    }, (err: any) => {
      console.error('Error fetching about data:', err);
    });
  }

  // Fetch all project data
  getProject() {
    this.projectService.getAllProjects().subscribe((res: any[]) => {
      this.AllProject = Array.isArray(res) ? res : [res];
      console.log(this.AllProject);
    }, (err: any) => {
      console.error('Error fetching project data:', err);
    });
  }

  // Fetch all service data
  getService() {
    this.servicesService.getAllServices().subscribe((res: any[]) => {
      this.AllService = Array.isArray(res) ? res : [res];
      console.log(this.AllService);
    }, (err: any) => {
      console.error('Error fetching service data:', err);
    });
  }

  // Edit "about" data
  editAbout(data: any) {
    this.selectedAbout = data;
    this.myForm.patchValue({
      title: data.title,
      description: data.description,
      currentWork: data.currentWork,
      skillsTitle: data.skillsTitle,
      skills: data.skills,
      resumeText: data.resumeText
    });
  }

  // Edit project data
  editProject(project: any) {
    this.selectedProject = project;
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      repoLink: project.repoLink,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
      image: project.image,
      date: project.date,
    });
  }

    deleteProject(id: string): void {
      if (confirm('Are you sure you want to delete this project?')) {
        this.projectService.deleteProject(id).subscribe(() => {
          this.AllProject = this.AllProject.filter(project => project._id !== id);
        }, (error: any) => {
          console.error('Error deleting project:', error);
          this.errorMessage = 'Failed to delete the project. Please try again later.';
        });
      }
    }

  editService(service: any) {
    this.selectedService = service;
    this.serviceForm.patchValue({
      title: service.title,
      description: service.description,
      icon: service.icon
    });
  }
  

  // Submit updated "about" data
  onSubmit() {
    if (this.myForm.valid) {
      const updatedData = { ...this.selectedAbout, ...this.myForm.value };
      this._aboutService.updateAbout(updatedData).subscribe((response: any) => {
        console.log('About updated successfully:', response);
        this.getAbout();
        this.resetForm();
      }, (err: any) => {
        console.error('Error updating about data:', err);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Submit updated project data
  onSubmitProject() {
    if (this.projectForm.valid) {
      const updatedProject = { ...this.selectedProject, ...this.projectForm.value };
      const projectId = this.selectedProject._id; // Assuming `_id` is the property storing the project's ID
      this.projectService.updateProject(projectId, updatedProject).subscribe(
        (response: any) => {
          console.log('Project updated successfully:', response);
          this.getProject();
          this.resetProjectForm();
        },
        (error: any) => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


  // Submit updated service data
  onSubmitService() {
    if (this.serviceForm.valid) {
      const updatedService = { ...this.selectedService, ...this.serviceForm.value };
      this.selectedService.updatedService(updatedService).subscribe(
        (response: any) => {
          console.log('Service updated successfully:', response);
          this.getService();
          this.resetServiceForm();
        },
        (error: any) => {
          console.error('Error updating service:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Reset forms
  resetForm() {
    this.selectedAbout = null;
    this.myForm.reset();
  }

  resetProjectForm() {
    this.selectedProject = null;
    this.projectForm.reset();
  }

  resetServiceForm() {
    this.selectedService = null;
    this.serviceForm.reset();
  }

  // Lifecycle hook
  ngOnInit(): void {
    this.initializeForm();
    this.getAbout();
    this.getProject();
    this.getService();
  }
}
