import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:1020/auth';
  constructor(private http: HttpClient) {

}


login(correo: string, password: string)
  {
    let data = {
      "correo":correo,
      "password":password
    };

    return this.http.post<any>(`${this.url}`,data);
    
     
  }

  

}
