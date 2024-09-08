import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {DashboardService} from '../../services/dashboard.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from "sweetalert2";

@Component({
  selector: 'app-edit-eps',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './edit-eps.component.html',
  styleUrl: './edit-eps.component.css'
})
export default class EditEpsComponent implements OnInit{
  ideps: string='';
  form!: FormGroup;
  puntos: any[] = [];
  constructor(
    private dashboardService:DashboardService, private route: ActivatedRoute, public router: Router,
    private _formBuilder: FormBuilder
  ){
    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required]],
      raza: [null, [Validators.required]],
      especie: [null, [Validators.required]],
      fnac_mascota:[null, [Validators.required]],
      id_Dueño:[null, [Validators.required]],
    });
  }
  
  ngOnInit(): void {
     this.ideps = this.route.snapshot.paramMap.get("id")!;
     this.EpsById()
     this.getDueños()
     
    

  }
  getDueños(){
    this.dashboardService.getDueno().subscribe((resp) => {
      this.puntos= resp.data;
    console.log('dueños', this.puntos);
    
    });
  }
  EpsById(): void {
      this.dashboardService.mascotaId(this.ideps).subscribe(data => {
       console.log(data);
       this.form.patchValue({
        nombre: data.data.nombre_mascota,
        raza: data.data.raza,
        especie: data.data.especie,
        fnac_mascota: data.data.fnac_mascota,
        id_Dueño: data.data.duenoDto.id_Dueño
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
        id_mascota:this.ideps, 
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
          text: "La mascota fue actualizada de manera correcta!",
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
  cancelar(){
    this.router.navigate(['dashboard/mascotas'])
  }
 
}
