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
   this.getEps()
  }

crear(){
  this.router.navigate(['dashboard/eps-create'])
}

editEps(ideps: any) {
  this.router.navigate(["dashboard/eps", ideps]);
  
}

deleteEps(idEps:any){
  let payload={
   
      id_eps: idEps
   
  }
  swal.fire({
    title: "Alerta",
    text: "¿confirma que quiere eliminar eps?!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.dashboardService.storePoint(payload).subscribe((resp)=>{
        if(resp.code == 200){
          this.getEps()
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

  getEps(){
    this.dashboardService.getEpss().subscribe((resp) => {
      this.puntos= resp.data;
    console.log('mis eps', this.puntos);
    
    });
  }
}
