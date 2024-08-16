import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/auth/';
  constructor(private http: HttpClient) {

}


login(correo: string, password: string)
  {
    let data = {
      "username":correo,
      "password":password
    };

    return this.http.post<any>(`${this.url}login`,data);
    
     
  }

  

}
