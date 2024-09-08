import {DashboardService} from '../../services/dashboard.service';
import { Component, OnInit, inject   } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.css'
})
export default class ControlFlowComponent implements OnInit {
  constructor(
    private dashboardService:DashboardService, private router: Router) { }
  puntos: any[] = [];
  puntos1: any[] = [];
  puntos2: any[] = [];

  
  ngOnInit(): void {
   this.getMascotas()
   this.getDueños()
   this.getPaciente()
  }
  getMascotas(){
    this.dashboardService.getMascotas().subscribe((resp) => {
      this.puntos= resp.data;
    console.log('mis mascotas', this.puntos);
    
    });
  }
  getDueños(){
    this.dashboardService.getDueno().subscribe((resp) => {
      this.puntos1= resp.data;
    console.log('mis dueños', this.puntos1);
    
    });
  }
  getPaciente(){
    this.dashboardService.getPaciente().subscribe((resp) => {
      this.puntos2= resp.data;
    console.log('mis pacientes', this.puntos2);
    
    });
  }
}
