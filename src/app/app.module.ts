import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './Common/nav-bar/nav-bar.component';
import { LoginScreenComponent } from './Screens/login-screen/login-screen.component';
import { LoginBodyComponent } from './Components/Login/login-body/login-body.component';
import { RegiterBodyComponent } from './Components/Register/regiter-body/regiter-body.component';
import { RegisterScreenComponent } from './Screens/register-screen/register-screen.component';
import { AuthedScreenComponent } from './Screens/authed-screen/authed-screen.component';
import { AuthedNavBarComponent } from './Common/authed-nav-bar/authed-nav-bar.component';
import { AuthedBodyComponent } from './Common/authed-body/authed-body.component';
import { EventosListComponent } from './Components/Eventos/eventos-list/eventos-list.component';
import { EventosScreenComponent } from './Screens/eventos-screen/eventos-screen.component';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetallesEventoModalComponent } from './Components/Eventos/detalles-evento-modal/detalles-evento-modal.component';
import { ComentariosEventoModalComponent } from './Components/Eventos/comentarios-evento-modal/comentarios-evento-modal.component';
import { EventosAsistidosComponent } from './Components/Eventos/eventos-asistidos/eventos-asistidos.component';
import { EventosOrganizadosComponent } from './Components/Eventos/eventos-organizados/eventos-organizados.component';
import { AsistidosScreenComponent } from './Screens/asistidos-screen/asistidos-screen.component';
import { OrganizadosScreenComponent } from './Screens/organizados-screen/organizados-screen.component';
import { AuthenticationService } from './Services/authentication.service';
import { ComentarEventoModalComponent } from './Components/Eventos/comentar-evento-modal/comentar-evento-modal.component';
import { AsistirEventoModalComponent } from './Components/Eventos/asistir-evento-modal/asistir-evento-modal.component';
import { EventosCrearComponent } from './Components/Eventos/eventos-crear/eventos-crear.component';
import { EventosCrearScreenComponent } from './Screens/eventos-crear-screen/eventos-crear-screen.component';
import { EditarPerfilComponent } from './Components/Perfil/editar-perfil/editar-perfil.component';
import { VerPerfilComponent } from './Components/Perfil/ver-perfil/ver-perfil.component';
import { VerPerfilScreenComponent } from './Screens/ver-perfil-screen/ver-perfil-screen.component';
import { EditarPerfilScreenComponent } from './Screens/editar-perfil-screen/editar-perfil-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginScreenComponent,
    LoginBodyComponent,
    RegiterBodyComponent,
    RegisterScreenComponent,
    AuthedScreenComponent,
    AuthedNavBarComponent,
    AuthedBodyComponent,
    EventosListComponent,
    EventosScreenComponent,
    DetallesEventoModalComponent,
    ComentariosEventoModalComponent,
    EventosAsistidosComponent,
    EventosOrganizadosComponent,
    AsistidosScreenComponent,
    OrganizadosScreenComponent,
    ComentarEventoModalComponent,
    AsistirEventoModalComponent,
    EventosCrearComponent,
    EventosCrearScreenComponent,
    EditarPerfilComponent,
    VerPerfilComponent,
    VerPerfilScreenComponent,
    EditarPerfilScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
