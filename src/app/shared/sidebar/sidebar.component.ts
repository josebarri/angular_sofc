import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd, Event } from '@angular/router';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private appService: AppService  ,private router: Router) {}

logout(){
  this.appService.logout()
}

}
