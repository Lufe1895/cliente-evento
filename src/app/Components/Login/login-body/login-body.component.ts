import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { Respuesta } from 'src/app/Interfaces/Respuesta';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Login } from 'src/app/Types/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html',
  styleUrls: ['./login-body.component.css']
})

export class LoginBodyComponent implements OnInit {
  @ViewChild("correo") correoElement!:ElementRef;
  @ViewChild("contrasena") contrasenaElement!:ElementRef;

  private loginDTO:Login;
  private respuesta:Respuesta<LoginRespuesta>;

  constructor(private service:AuthenticationService, private router:Router) {
    this.loginDTO = {} as Login;
    this.respuesta = {} as Respuesta<LoginRespuesta>;
  }

  ngOnInit(): void {
    this.respuesta = this.service.mensaje;
  }

  iniciarSesion():void {
    this.loginDTO.correo = this.correoElement.nativeElement.value;
    this.loginDTO.contrasena = this.contrasenaElement.nativeElement.value;

    this.service.iniciarSesion(this.loginDTO, ():void => {
      this.router.navigate(['/authed/eventos']);
    });
  }

  get errores():string {
    return this.respuesta.mensaje;
  }
}
