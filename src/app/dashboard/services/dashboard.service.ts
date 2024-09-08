import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private urlExportar: string= 'http://localhost:1020/mascota/exportar-excel';
private urlMascota: string = 'http://localhost:1020/mascota';
private urlDueño: string = 'http://localhost:1020/dueno';
private urlPaciente: string = 'http://localhost:1020/paciente';
private urlTipoIdenti: string = 'http://localhost:1020/tipoIdent';
private urlUbicacion: string = 'http://localhost:1020/ubicacion';

private token: string = "Bearer " + localStorage.getItem("token"); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiIyQDIuY29tIiwidWlkIjoic00yMV8yMl9JNTUiLCJyb2wiOjEsImlhdCI6MTY1MjcyNzExNSwiZXhwIjoxNjg0Mjg0NzE1fQ.mjpOc7b_BnB6ITkzqO9KigWQM7i6ln5OBXDLkcC5Tys';
private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });
  constructor(private http: HttpClient,) {


   

   }
   getMascotas(): Observable<any> {
    return this.http.get<any>(`${this.urlMascota}`).pipe(res=>res);
  }
  deleteMascota(id: any): Observable<any> {
    return this.http.delete<any>(`${this.urlMascota}/${id}`).pipe(res=>res);
  }
  posMascotas(formData: any): Observable<any> {
    return this.http.post<any>(`${this.urlMascota}`, formData).pipe(res=>res);
  }
  mascotaId(id: any): Observable<any> {
    return this.http.get<any>(`${this.urlMascota}/${id}`).pipe(res=>res);
  }
  getExportarMascotas(): Observable<any> {
    return this.http.get<any>(`${this.urlExportar}`).pipe(res=>res);
  }



  getDueno(): Observable<any> {
    return this.http.get<any>(`${this.urlDueño}`).pipe(res=>res);
  }
  deleteDueno(id: any): Observable<any> {
    return this.http.delete<any>(`${this.urlDueño}/${id}`).pipe(res=>res);
  }
  posDueno(formData: any): Observable<any> {
    return this.http.post<any>(`${this.urlDueño}`, formData).pipe(res=>res);
  }
  DuenoId(id: any): Observable<any> {
    return this.http.get<any>(`${this.urlDueño}/${id}`).pipe(res=>res);
  }



  getPaciente(): Observable<any> {
    return this.http.get<any>(`${this.urlPaciente}`).pipe(res=>res);
  }
  deletePaciente(id: any): Observable<any> {
    return this.http.delete<any>(`${this.urlPaciente}/${id}`).pipe(res=>res);
  }
  posPaciente(formData: any): Observable<any> {
    return this.http.post<any>(`${this.urlPaciente}`, formData).pipe(res=>res);
  }
  PacienteId(id: any): Observable<any> {
    return this.http.get<any>(`${this.urlPaciente}/${id}`).pipe(res=>res);
  }

  getTipoIdent(): Observable<any> {
    return this.http.get<any>(`${this.urlTipoIdenti}`).pipe(res=>res);
  }

  getUbicacion(): Observable<any> {
    return this.http.get<any>(`${this.urlUbicacion}`).pipe(res=>res);
  }
  
  
}
