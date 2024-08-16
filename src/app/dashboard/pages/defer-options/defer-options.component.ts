import { Component, OnInit  } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
@Component({
  selector: 'app-defer-options',
  standalone: true,
  imports: [],
  templateUrl: './defer-options.component.html',
  styleUrl: './defer-options.component.css'
})
export default class DeferOptionsComponent implements OnInit {
  constructor(private dashboardService:DashboardService) { }
  puntos: any[] = [];

  
  ngOnInit(): void {
   this.getEstudent()
  }



  getEstudent(){
    this.dashboardService.getEstudiantes().subscribe((resp) => {
      this.puntos= resp;
    console.log('mis estudiantes', this.puntos);
    
    });
  }
}
