import { Component, OnInit, inject   } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from "sweetalert2";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit {
  constructor(
    private dashboardService:DashboardService, private router: Router) { }
    puntos: any[] = [];

  
    ngOnInit(): void {
     this.getDueños()
    }

    crear(){
      this.router.navigate(['dashboard/user-create'])
    }
    
    editEps(ideps: any) {
      this.router.navigate(["dashboard/user", ideps]);
      
    }
    
    deleteEps(idEps:any){
      
      swal.fire({
        title: "Alerta",
        text: "¿confirma que quiere eliminar el propietario?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dashboardService.deleteDueno(idEps).subscribe((resp)=>{
            if(resp.code == 200){
              this.getDueños()
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
    
      getDueños(){
        this.dashboardService.getDueno().subscribe((resp) => {
          this.puntos= resp.data;
        console.log('mis mascotas', this.puntos);
        
        });
      }
}
