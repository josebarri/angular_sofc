import { Component, OnInit, inject   } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import swal from "sweetalert2";
@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export default class PacientesComponent implements OnInit {
  constructor(
    private dashboardService:DashboardService, private router: Router) { }
    puntos: any[] = [];


    ngOnInit(): void {
      this.getPacientes()
     }

     crear(){
      this.router.navigate(['dashboard/paciente-create'])
    }
    
    editEps(ideps: any) {
      this.router.navigate(["dashboard/paciente", ideps]);
      
    }
    
    deleteEps(idEps:any){
      
      swal.fire({
        title: "Alerta",
        text: "¿confirma que quiere eliminar el paciente?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dashboardService.deletePaciente(idEps).subscribe((resp)=>{
            if(resp.code == 200){
              this.getPacientes()
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
    
      getPacientes(){
        this.dashboardService.getPaciente().subscribe((resp) => {
          this.puntos= resp.data;
        console.log('mis mascotas', this.puntos);
        
        });
      }
}
