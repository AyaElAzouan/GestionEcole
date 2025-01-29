import { Routes } from '@angular/router';





////new design
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserCompteComponent } from './user-compte/user-compte.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';



import { LogoutComponent } from './logout/logout.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { profGuard } from './guards/prof.guard';
import { DetailProfessorComponent } from './detail-professor/detail-professor.component';
import { DetailMatiereComponent } from './detail-matiere/detail-matiere.component';
import { RegisterComponent } from './register/register.component';
import { DetailsMatiereComponent } from './admin/details-matiere/details-matiere.component';
import { ProfComponent } from './admin/prof/prof/prof.component';
import { GestioProfComponent } from './secretaire/gestio-prof/gestio-prof.component';
import { CreateEtuComponent } from './secretaire/create-etu/create-etu.component';
import { GestionEtuComponent } from './secretaire/gestion-etu/gestion-etu.component';
import { DetailEtuComponent } from './secretaire/detail-etu/detail-etu.component';
import { CreateMatiereComponent } from './secretaire/create-matiere/create-matiere.component';
import { GestionMatiereComponent } from './secretaire/gestion-matiere/gestion-matiere.component';
import { MesEtudiantComponent } from './professeur/mes-etudiant/mes-etudiant.component';
import { MesMatiereComponent } from './professeur/mes-matiere/mes-matiere.component';






export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  
    pathMatch: 'full'
 },
 
 

{ path: 'logout',   component: LogoutComponent },
{path: 'login', component: LoginUserComponent},
{path: 'register', component: RegisterComponent},



       
//PROF
    {
      path: '',
      component: UserLayoutComponent,
      children: [
        { path: 'mes-etudiants',   component: MesEtudiantComponent },
        { path: 'mes-matieres',   component: MesMatiereComponent },

      ]
    },
    //SECRETAIRE
    {
      path: '',
      component: UserLayoutComponent,
      children: [
        {path: 'gestion-prof', component: GestioProfComponent},
        { path: 'detail-prof/:id',   component: DetailProfessorComponent },
        { path: 'create-etu',   component: CreateEtuComponent },
        { path: 'gestion-etu',   component: GestionEtuComponent },
        { path: 'detail-etu/:id',   component: DetailEtuComponent },
        { path: 'create-matiere',   component: CreateMatiereComponent },
        { path: 'gestion-matiere',   component: GestionMatiereComponent },
        { path: 'detail-matiere/:id',   component: DetailMatiereComponent },
      ]
    },
   //admin 
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {path: 'dashboard', component: DashboardComponent},
        { path: 'user-compte',   component: UserCompteComponent },
        { path: 'admin-matiere-details',   component: DetailsMatiereComponent },
        {path: 'prof', component: ProfComponent},

        
      ]
    },
   

];




// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',  // Redirection vers la page de login
//     pathMatch: 'full'
//  },
//  {
//       path: '',
//       component: AdminLayoutComponent,
//       canActivateChild: [adminGuard],
//       children: [
//         {
//           path: '',
//           redirectTo: 'landing',
//           pathMatch: 'full'
//         },
//             {path: 'alerts', component: AlertsComponent},
//     { path: 'generate',   component: GenerateEdtComponent },
//     { path: 'read-edt-adm',   component: ReadEdtAdminComponent },
//     { path: 'add-prof',   component: AjoutProfComponent },
//     { path: 'select',   component: ContactComponent },
//     { path: 'parameters',   component: ParametersComponent },
//     { path: 'detail-prof/:id',   component: DetailProfessorComponent },
//     { path: 'detail-matiere/:id',   component: DetailMatiereComponent },
    


//     { path: 'typography',     component: TypographyComponent },
//     { path: 'icons',          component: IconsComponent },
//     { path: 'maps',           component: MapsComponent },
//     { path: 'notifications',  component: NotificationsComponent },
//     { path: 'upgrade',        component: UpgradeComponent },
//       ]
//     },
//     {
//       path: '',
//       component: UserLayoutComponent,
//       canActivateChild: [profGuard],
//       children: [
//         {
//           path: '',
//           redirectTo: 'login',
//           pathMatch: 'full'
//         },
//             {path: 'alerts', component: AlertsComponent},
//             { path: 'notifications',  component: NotificationsComponent },
//             { path: 'read-edt-prof',  component: ReadEdtProfComponent },

//       ]
//     },
//     {
//       path: '',
//       component: UserLayoutComponent,
//       canActivateChild: [authGuard],
//       children: [
//             { path: 'user-compte',   component: UserCompteComponent },
//             { path: 'logout',   component: LogoutComponent },
//       ]
//     },
 
//     {
//       path: '',
//       children: [
//         {path: 'dashboard', component: DashboardComponent},
//         {path: 'login', component: LoginUserComponent},
//         {path: 'register', component: RegisterUserComponent},
//         {path: 'toastr', component: ToastralertComponent},
//         {path: 'espace-etudiant', component: EspaceEtudiantComponent},
//       ]
//     }

// ];



