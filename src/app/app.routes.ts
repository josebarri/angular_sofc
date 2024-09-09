import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [


    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        canActivate:[authGuard],
        children:[
            {
                path:'home',
                loadComponent: () =>  import('./dashboard/pages/control-flow/control-flow.component'),
                canActivate:[authGuard]
            },
            {
                path:'mascotas',
                loadComponent: () =>  import('./dashboard/pages/defer-options/defer-options.component'),
                canActivate:[authGuard]
            },
            {
                path:'pacientes',
                loadComponent: () =>  import('./dashboard/pages/pacientes/pacientes.component'),
                canActivate:[authGuard]
            },
            {
                path:'paciente-create',
                loadComponent: () =>  import('./dashboard/pages/paciente-create/paciente-create.component'),
                canActivate:[authGuard]
            },
            {
                path:'paciente/:id',
                loadComponent: () =>  import('./dashboard/pages/edit-paciente/edit-paciente.component'),
                canActivate:[authGuard]
            },
          
            {
                path:'user',
                
                loadComponent: () =>  import('./dashboard/pages/user/user.component'),
                canActivate:[authGuard]
            },
            {
                path:'user-create',
               
                loadComponent: () =>  import('./dashboard/pages/users/users.component'),
                canActivate:[authGuard]
            },
            {
                path:'user/:id',
               
                loadComponent: () =>  import('./dashboard/pages/edit-user/edit-user.component'),
                canActivate:[authGuard]
            },
            {
                path:'mascotas/:id',
               
                loadComponent: () =>  import('./dashboard/pages/edit-eps/edit-eps.component'),
                canActivate:[authGuard]
            },
            
            
            {
                path: '',
                redirectTo:'home',
                 pathMatch: 'full',  
            },
            {
                path:'mascotas-create',
                loadComponent: () =>  import('./dashboard/pages/eps-create/eps-create.component'),
                canActivate:[authGuard]
            },
            
        ]
    },
   
     {
         path: "login",
        loadComponent:() => import('./auth/login/login.component')
     },
{
    path: '',
    redirectTo:'/dashboard',
    pathMatch: 'full'
}

];
