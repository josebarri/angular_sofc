import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('documentUpload') documentInputRef!: ElementRef;
  puntos: any[] = [];
  nombre: string = "";
  idbasemusical!: string;
  form!: FormGroup;
  fileToUpload: any;
  fileUrl: string = "";
  fileName: string = "";
  btnDocument: boolean = true;
  adjunto: any = {};
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
  handleUploadDocumentClick() {
    const documentElement = this.documentInputRef.nativeElement;
    documentElement.click();
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


sendExcel(){
  if (!this.fileToUpload) {
    return;
  } 
    const formData = new FormData();
    formData.append('file',this.fileToUpload);
   this.dashboardService.posIportExcel(formData).subscribe((resp) => {
    if (resp.code == 200) {
      swal.fire({
        title: "Confirmación.",
        text: "se registro de manera excitosa!",
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


onFileSelected(event: any) {
    
  const file = event.target.files[0]; 
  this.fileToUpload = file;
  const fileName = file.name;
  this.fileName = file.name;  
  
  const fileExtension = fileName.split('.').pop().toLowerCase();
  
  this.adjunto = {nombre: fileName, ext: fileExtension};
  const reader = new FileReader();
  reader.onload = (event: any) => {
    const contenido = event.target.result;
    this.fileUrl = contenido;
  };
  reader.readAsDataURL(file);
 
  this.btnDocument = false;
 

  if (fileExtension === 'pdf')
  {
    this.btnDocument = false;
  }
  if (fileExtension === 'xls' || fileExtension === 'xlsx')
  {
    this.btnDocument = false;
  }
console.log('esto es el archivo',this.fileToUpload);
  
}
cleanFile(){
  this.fileToUpload = null; 
  this.adjunto = {};
  this.btnDocument = true;
  this.fileUrl = "";
  if (this.documentInputRef) this.documentInputRef.nativeElement.value = null;
}
}

