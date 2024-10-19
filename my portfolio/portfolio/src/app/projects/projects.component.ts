

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project_sevices';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  project: any; // To hold the project data
  errorMessage: string = ''; // To display error messages
  projectId: string; // To hold the project ID

projectUrl: string = 'http://localhost:3000/';

getImageProjectPath(image: string): string {
  return this.projectUrl+image;
}

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = this.route.snapshot.paramMap.get('id') || ''; // Get project ID from route
  }

  ngOnInit(): void {
    this.loadProject();
  }

  // Method to load the project details
  loadProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      (data) => {
        this.project = data;
      },
      (error) => {
        console.error('Error fetching project:', error);
        this.errorMessage = 'Failed to load project details. Please try again later.';
      }
    );
  }

  // Method to delete the project
  deleteProject(): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(this.projectId).subscribe(
        () => {
          alert('Project deleted successfully.');
          this.router.navigate(['/dashboard']); // Redirect to dashboard after deletion
        },
        (error) => {
          console.error('Error deleting project:', error);
          this.errorMessage = 'Failed to delete the project. Please try again later.';
        }
      );
    }
  }

  // Method to handle form submission for updating the project
  onSubmit(updatedProjectData: any): void {
    this.projectService.updateProject(this.projectId, updatedProjectData).subscribe(
      () => {
        alert('Project updated successfully.');
        this.loadProject(); // Reload project details after updating
      },
      (error) => {
        console.error('Error updating project:', error);
        this.errorMessage = 'Failed to update the project. Please try again later.';
      }
    );
  }


}

