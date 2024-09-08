import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children:[
            {
                path:'home',
                loadComponent: () =>  import('./dashboard/pages/control-flow/control-flow.component')
            },
            {
                path:'mascotas',
                loadComponent: () =>  import('./dashboard/pages/defer-options/defer-options.component')
            },
            {
                path:'pacientes',
                loadComponent: () =>  import('./dashboard/pages/pacientes/pacientes.component')
            },
            {
                path:'paciente-create',
                loadComponent: () =>  import('./dashboard/pages/paciente-create/paciente-create.component')
            },
            {
                path:'paciente/:id',
                loadComponent: () =>  import('./dashboard/pages/edit-paciente/edit-paciente.component')
            },
          
            {
                path:'user',
                
                loadComponent: () =>  import('./dashboard/pages/user/user.component')
            },
            {
                path:'user-create',
               
                loadComponent: () =>  import('./dashboard/pages/users/users.component')
            },
            {
                path:'user/:id',
               
                loadComponent: () =>  import('./dashboard/pages/edit-user/edit-user.component')
            },
            {
                path:'mascotas/:id',
               
                loadComponent: () =>  import('./dashboard/pages/edit-eps/edit-eps.component')
            },
            
            
            {
                path: '',
                redirectTo:'home',
                 pathMatch: 'full',  
            },
            {
                path:'mascotas-create',
                loadComponent: () =>  import('./dashboard/pages/eps-create/eps-create.component')
            },
            
        ]
    },
   
    // {
    //     path: "login",
    //     loadComponent:() => import('./auth/login/login.component')
    // },
{
    path: '',
    redirectTo:'/dashboard',
    pathMatch: 'full'
}

];
