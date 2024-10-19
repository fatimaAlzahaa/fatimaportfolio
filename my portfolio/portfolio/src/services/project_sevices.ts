// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// declare var $:any

// @Injectable({
//   providedIn: 'root'
// })
// export class projectService {

//   private url = 'http://localhost:3000/api/about/';
//   constructor(private _HttpClient:HttpClient) { }

//   getproject():Observable<any>{
//     return this._HttpClient.get(this.url)
//   }

//   addNewproject(data :any):Observable<any>{
//     return this._HttpClient.post(this.url , data)
//   }

//   deleteproject(id:any):Observable<any>{
//     // console.log(url+subjects/${id.id});
//     return this._HttpClient.delete(this.url+`/${id.id}`)
//   }
//   updateproject(id:any , data:object):Observable<any>{
//     return this._HttpClient.put(this.url+`/${id.id}` , data)
//   }


// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';
  constructor(private http: HttpClient) {}

  // Fetch all projects
  getAllProjects(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Fetch a project by ID
  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new project
  createProject(projectData: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('technologies', projectData.technologies);
    formData.append('link', projectData.link);
    formData.append('image', image);

    return this.http.post<any>(this.apiUrl, formData);
  }

  // Update an existing project
  updateProject(id: string, projectData: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('technologies', projectData.technologies);
    formData.append('link', projectData.link);
    if (image) {
      formData.append('image', image);
    }

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  updateProjectt(updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedData._id}`; // Assuming you use the ID to update a specific record
    return this.http.put(url, updatedData); // Use PUT for updates
  }

  // Delete a project
  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
