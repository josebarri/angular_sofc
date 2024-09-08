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
  selector: 'app-paciente-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './paciente-create.component.html',
  styleUrl: './paciente-create.component.css'
})
export default class PacienteCreateComponent implements OnInit {
  puntos: any[] = [];
  mascotas: any[] = [];
 
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
  this.getMascotas()
  this.form = this._formBuilder.group({
    id_mascota:['', [Validators.required]]
   
  });
  // this.idbasemusical = this.route.snapshot.paramMap.get("id");
  //this.idbasemusical = this.route.snapshot.paramMap.get('id')!;



}
getMascotas(){
  this.dashboardService.getMascotas().subscribe((resp) => {
    this.mascotas= resp.data;
  console.log('mascotas', this.mascotas);
  
  });
}


cancelar(){
  this.router.navigate(['dashboard/pacientes'])
}
sendForm(){
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  } else {
   let EpsSend = this.form.getRawValue();
   let payload ={ 
    mascotaDto:{
      id_mascota:EpsSend.id_mascota
    }
  }
   this.dashboardService.posPaciente(payload).subscribe((resp) => {
    if (resp.code == 200) {
      swal.fire({
        title: "Confirmación.",
        text: "El paciente fue registrado de manera correcta!",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-success",
        },
        icon: "success",
      });
      this.router.navigate(["dashboard/pacientes"]);
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
