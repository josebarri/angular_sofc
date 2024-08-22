import { Component, OnInit, inject   } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-defer-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defer-options.component.html',
  styleUrl: './defer-options.component.css'
})
export default class DeferOptionsComponent implements OnInit {
  constructor(private dashboardService:DashboardService, private router: Router) { }
  puntos: any[] = [];

  
  ngOnInit(): void {
   this.getEps()
  }

crear(){
  this.router.navigate(['dashboard/eps-create'])
}

  getEps(){
    this.dashboardService.getEpss().subscribe((resp) => {
      this.puntos= resp.data;
    console.log('mis eps', this.puntos);
    
    });
  }
}
