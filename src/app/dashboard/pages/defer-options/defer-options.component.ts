import { Component, OnInit, inject   } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from "sweetalert2";

@Component({
  selector: 'app-defer-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defer-options.component.html',
  styleUrl: './defer-options.component.css'
})
export default class DeferOptionsComponent implements OnInit {
  constructor(
    private dashboardService:DashboardService, private router: Router) { }
  puntos: any[] = [];

  
  ngOnInit(): void {
   this.getMascotas()
  }

crear(){
  this.router.navigate(['dashboard/mascotas-create'])
}

editEps(ideps: any) {
  this.router.navigate(["dashboard/mascotas", ideps]);
  
}

deleteEps(idEps:any){
  
  swal.fire({
    title: "Alerta",
    text: "¿confirma que quiere eliminar la mascota?!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.dashboardService.deleteMascota(idEps).subscribe((resp)=>{
        if(resp.code == 200){
          this.getMascotas()
          swal.fire({
            title: "Deleted!",
            text: resp.message,
            icon: "success"
          });
          
        }else{
          swal.fire({
            title: "Error",
            text: resp.message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
        }
      })
      
    }
  });
}

  getMascotas(){
    this.dashboardService.getMascotas().subscribe((resp) => {
      this.puntos= resp.data;
    });
  }
  getMascotasExport() {
    this.dashboardService.getExportarMascotas().subscribe((response: Blob) => { 
      const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mascotas.xlsx'; 
      a.click();
     
      window.URL.revokeObjectURL(url);
    });
  }
}
