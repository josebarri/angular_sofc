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
  constructor(
    private dashboardService:DashboardService, private route: ActivatedRoute, public router: Router,
    private _formBuilder: FormBuilder
  ){
    this.form = this._formBuilder.group({
      id_eps: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      fecha:[null, [Validators.required]],
      telefono:[null, [Validators.required]],
    });
  }
  
  ngOnInit(): void {
     this.ideps = this.route.snapshot.paramMap.get("id")!;
     console.log('este moises gay', this.ideps);
     this.EpsById()
    

  }
  EpsById(): void {
    let payload={
      id_eps:this.ideps

    }
      this.dashboardService.EpsById(payload).subscribe(data => {
       console.log(data.data);
       this.form.patchValue({
        id_eps: data.data.id_eps,
        nombre: data.data.nombre,
        direccion: data.data.direccion,
        fecha: data.data.fecha,
        telefono: data.data.telefono
      });
      });

  }
  sendForm(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
     let EpsSend: any = this.form.getRawValue();
     this.dashboardService.InsertEps(EpsSend).subscribe((resp) => {
      if (resp.code == 200) {
        swal.fire({
          title: "Confirmación.",
          text: "La Eps fue actualizada de manera correcta!",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-success",
          },
          icon: "success",
        });
        this.router.navigate(["dashboard/estudiantes"]);
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
    this.router.navigate(['dashboard/estudiantes'])
  }
 
}
