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
                path:'estudiantes',
                
                loadComponent: () =>  import('./dashboard/pages/defer-options/defer-options.component')
            },
          
            {
                path:'user/:id',
                
                loadComponent: () =>  import('./dashboard/pages/user/user.component')
            },
            {
                path:'user-list',
               
                loadComponent: () =>  import('./dashboard/pages/users/users.component')
            },
            
            {
                path: '',
                redirectTo:'home',
                 pathMatch: 'full',  
            }
            
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
