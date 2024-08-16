import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private url: string = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient) {


   

   }
   getEstudiantes(): Observable<any> {
    return this.http.get<any>(`${this.url}estudiante`).pipe(res=>res);
  }



  
  
}
