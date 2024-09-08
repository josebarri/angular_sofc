import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import {DashboardService} from '../../services/dashboard.service';
import { Router,ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from "sweetalert2";
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export default class UsersComponent implements OnInit{
  puntos: any[] = [];
  tipoident: any[] = [];
  ubicacion: any[] = [];
  nombre: string = "";
  idbasemusical!: string;
  form!: FormGroup;
constructor(
  private dashboardService:DashboardService, private route: ActivatedRoute, public router: Router,
  private _formBuilder: FormBuilder
){
  console.log(this.nombre);
  
  
}

ngOnInit(): void {
  this.getTipoIdent()
    this.getUbicacion()
  this.form = this._formBuilder.group({
    nombreDueño: [null, [Validators.required]],
    apellidoDueño: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    num_identificacion:[null, [Validators.required]],
    idIdentificacion:['', [Validators.required]],
    idUbicacion:['', [Validators.required]],
  });
  // this.idbasemusical = this.route.snapshot.paramMap.get("id");
  //this.idbasemusical = this.route.snapshot.paramMap.get('id')!;



}
getTipoIdent(){
  this.dashboardService.getTipoIdent().subscribe((resp) => {
    this.tipoident= resp.data;
  console.log('identidad', this.tipoident);
  
  });
}
getUbicacion(){
  this.dashboardService.getUbicacion().subscribe((resp) => {
    this.ubicacion= resp.data;
  console.log('ubicaciones', this.ubicacion);
  
  });
}

cancelar(){
  this.router.navigate(['dashboard/user'])
}
sendForm(){
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  } else {
   let EpsSend = this.form.getRawValue();
   let payload ={ 
    nombreDueño: EpsSend.nombreDueño,
    apellidoDueño: EpsSend.apellidoDueño,
    telefono:EpsSend.telefono,
    num_identificacion: EpsSend.num_identificacion,
    tipoIdentificacionDto: {
      idIdentificacion: EpsSend.idIdentificacion,
    },
    ubicacionDto:{
      idUbicacion:EpsSend.idUbicacion
    }
  }
   this.dashboardService.posDueno(payload).subscribe((resp) => {
    if (resp.code == 200) {
      swal.fire({
        title: "Confirmación.",
        text: "El propietario fue registrado de manera correcta!",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
        },
        icon: "success",
      });
      this.router.navigate(["dashboard/user"]);
    } else {
      swal.fire({
        title: "Error.",
        text: resp.message,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
        },
        icon: "error",
      });
    }
   })
}
}

}
