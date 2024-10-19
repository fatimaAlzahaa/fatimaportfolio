import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/services'; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all services
  getAllServices(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Update a service
  updateService(id: string, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, serviceData);
  }

  // Create a new service
  createService(serviceData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, serviceData);
  }

  // Delete a service
  deleteService(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
