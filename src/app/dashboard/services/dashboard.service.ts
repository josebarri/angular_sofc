import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private url: string = 'http://localhost:8080/api/v1/';
private token: string = "Bearer " + localStorage.getItem("token"); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });
  constructor(private http: HttpClient,) {


   

   }
   getEstudiantes(): Observable<any> {
    return this.http.get<any>(`${this.url}estudiante`).pipe(res=>res);
  }



  
  
}
