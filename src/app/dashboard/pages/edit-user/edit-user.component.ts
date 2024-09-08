import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {DashboardService} from '../../services/dashboard.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from "sweetalert2";
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export default class EditUserComponent implements OnInit {
  iddueño: string='';
  form!: FormGroup;
  tipoident: any[] = [];
  ubicacion: any[] = [];
  constructor(
    private dashboardService:DashboardService, private route: ActivatedRoute, public router: Router,
    private _formBuilder: FormBuilder
  ){
    this.form = this._formBuilder.group({
      nombreDueño: [null, [Validators.required]],
      apellidoDueño: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      num_identificacion:[null, [Validators.required]],
      idIdentificacion:[null, [Validators.required]],
      idUbicacion:[null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.iddueño = this.route.snapshot.paramMap.get("id")!;
    this.EpsById()
    this.getTipoIdent()
    this.getUbicacion()
    
   

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
EpsById(): void {
    this.dashboardService.DuenoId(this.iddueño).subscribe(data => {
     console.log(data);
     this.form.patchValue({
      nombreDueño: data.data.nombreDueño,
      apellidoDueño: data.data.apellidoDueño,
      telefono: data.data.telefono,
      num_identificacion: data.data.num_identificacion,
      idIdentificacion: data.data.tipoIdentificacionDto.idIdentificacion,
      idUbicacion: data.data.ubicacionDto.idUbicacion
    });
    });

}
sendForm(){
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  } else {
    let EpsSend = this.form.getRawValue();
    let payload ={ 
      id_Dueño:this.iddueño, 
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
        text: "el propietario fue actualizado de manera correcta!",
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
cancelar(){
  this.router.navigate(['dashboard/user'])
}
}
