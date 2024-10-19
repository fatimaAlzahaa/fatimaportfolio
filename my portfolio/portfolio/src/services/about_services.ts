// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// declare var $:any

// @Injectable({
//   providedIn: 'root'
// })
// export class aboutService {

//   private url = 'http://localhost:3000/api/about/';
//   constructor(private _HttpClient:HttpClient) { }

//   getAbout():Observable<any>{
//     return this._HttpClient.get(this.url)
//   }

//   addNewAbout(data :any):Observable<any>{
//     return this._HttpClient.post(this.url , data)
//   }

//   deleteAbout(id:any):Observable<any>{
//     // console.log(url+subjects/${id.id});
//     return this._HttpClient.delete(this.url+`/${id.id}`)
//   }
//   updateAbout(id:any , data:object):Observable<any>{
//     return this._HttpClient.put(this.url+`/${id.id}` , data)
//   }
//   // getAllAbout(): Observable<any> {
//   //   return this._HttpClient.get<any>(this.url);
//   // }

// }
// about_services.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class aboutService {
  private Url: string = 'http://localhost:3000/api/about/';

  constructor(private http: HttpClient) {}

  // Method to get data from the about API
  getAbout(): Observable<any> {
    return this.http.get<any>(this.Url);
  }

  // Method to add new about data
  addNewAbout(newData: any): Observable<any> {
    const url = `${this.Url}`; // Use the base URL
    return this.http.post(url, newData); // Use POST to add new data
  }

  updateAbout(updatedData: any): Observable<any> {
    const url = `${this.Url}/${updatedData._id}`; // Assuming you use the ID to update a specific record
    return this.http.put(url, updatedData); // Use PUT for updates
  }
}
