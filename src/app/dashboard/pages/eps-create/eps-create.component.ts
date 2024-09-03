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

  public EpsSend: any = {
    id_eps: '',
    nombre: '',
    direccion: '',
    fecha: '',
    telefono: '',
  }
  
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
    this.form = this._formBuilder.group({
      id_eps: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      fecha:[null, [Validators.required]],
      telefono:[null, [Validators.required]],
      
      
    });
    // this.idbasemusical = this.route.snapshot.paramMap.get("id");
    //this.idbasemusical = this.route.snapshot.paramMap.get('id')!;



  }
  cancelar(){
    this.router.navigate(['dashboard/estudiantes'])
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
          text: "La Eps fue registrada de manera correcta!",
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

}
