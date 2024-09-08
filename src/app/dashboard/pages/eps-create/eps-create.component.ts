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
  selector: 'app-eps-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './eps-create.component.html',
  styleUrl: './eps-create.component.css'
})
export default class EpsCreateComponent implements OnInit{
  puntos: any[] = [];
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
    this.getDueños()
    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      raza: [null, [Validators.required]],
      especie: [null, [Validators.required]],
      fnac_mascota:[null, [Validators.required]],
      id_Dueño:['', [Validators.required]],
      
      
    });
    // this.idbasemusical = this.route.snapshot.paramMap.get("id");
    //this.idbasemusical = this.route.snapshot.paramMap.get('id')!;



  }
  getDueños(){
    this.dashboardService.getDueno().subscribe((resp) => {
      this.puntos= resp.data;
    console.log('dueños', this.puntos);
    
    });
  }
  cancelar(){
    this.router.navigate(['dashboard/mascotas'])
  }
  sendForm(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
     let EpsSend = this.form.getRawValue();
     let payload ={  
      nombre_mascota: EpsSend.nombre,
      raza: EpsSend.raza,
      especie:EpsSend.especie,
      fnac_mascota: EpsSend.fnac_mascota,
      duenoDto: {
         id_Dueño: EpsSend.id_Dueño,
       }

     }
     this.dashboardService.posMascotas(payload).subscribe((resp) => {
      if (resp.code == 200) {
        swal.fire({
          title: "Confirmación.",
          text: "La mascota fue registrada de manera correcta!",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
          icon: "success",
        });
        this.router.navigate(["dashboard/mascotas"]);
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
