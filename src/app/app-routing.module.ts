import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginScreenComponent } from './Screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './Screens/register-screen/register-screen.component';
import { AuthedScreenComponent } from './Screens/authed-screen/authed-screen.component';
import { EventosScreenComponent } from './Screens/eventos-screen/eventos-screen.component';
import { AsistidosScreenComponent } from './Screens/asistidos-screen/asistidos-screen.component';
import { OrganizadosScreenComponent } from './Screens/organizados-screen/organizados-screen.component';
import { AuthenticationService } from './Services/authentication.service';
import { EventosCrearScreenComponent } from './Screens/eventos-crear-screen/eventos-crear-screen.component';
import { VerPerfilScreenComponent } from './Screens/ver-perfil-screen/ver-perfil-screen.component';
import { EditarPerfilScreenComponent } from './Screens/editar-perfil-screen/editar-perfil-screen.component';

const routes:Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: 'register', component: RegisterScreenComponent },
  { 
    path: 'authed', 
    component: AuthedScreenComponent,
    /* canActivate: [AuthenticationService],*/
    children: [
      { path:'eventos', component: EventosScreenComponent },
      { path:'asistidos', component: AsistidosScreenComponent },
      { path:'organizados', component: OrganizadosScreenComponent },
      { path:'crear-evento', component: EventosCrearScreenComponent },
      { path:'perfil', component: VerPerfilScreenComponent },
      { path:'editar-perfil', component: EditarPerfilScreenComponent },
    ]
  },
  { path: '', component: LoginScreenComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static logged:boolean = false;
  constructor(public service:AuthenticationService) {
  }

  static isLogged():boolean {
    return this.logged;
  }

  static isNotLogged():boolean {
    return !this.logged;
  }
}
