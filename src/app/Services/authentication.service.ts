import { Injectable, OnInit } from '@angular/core';
import { LoginRespuesta } from '../Interfaces/LoginRespuesta';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Types/Login';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Registrar } from '../Types/Registrar';
import { Respuesta } from '../Interfaces/Respuesta';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements CanActivate, OnInit {
  public usuario: LoginRespuesta;
  public mensajes: Respuesta<LoginRespuesta>;
  public logged: boolean;
  public notLogged: boolean;

  constructor(private clienteHttp: HttpClient, private router: Router) {
    this.usuario = {} as LoginRespuesta;
    this.mensajes = {} as Respuesta<LoginRespuesta>;
    this.logged = false;
    this.notLogged = true;
  }

  ngOnInit(): void {
    this.comprobarSesion();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isNotLogged()) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/authed/eventos');
    }
    return this.isLogged();
  }

  obtenerUsuarioLoggeado() {
    this.usuario = JSON.parse(localStorage.getItem('sesion') || "{}");

    return this.usuario;
  }

  almacenarEnLocalStorage(usuario: LoginRespuesta, callback: () => void) {
    localStorage.setItem('sesion', JSON.stringify(usuario));
    callback();
  }

  iniciarSesion(login: Login, callback: () => void): void {
    if (login.correo === '' || login.contrasena === '') {
      this.mensajes.estatus = "Error"
      this.mensajes.mensaje = "Debe ingresar un correo y una contraseña.";
    }

    this.clienteHttp.post("http://localhost:8080/api/usuarios/login", login)
      .subscribe({
        next: res => {
          this.usuario = res as LoginRespuesta;

          if (!!this.usuario.id) {
            this.logged = true;
            this.notLogged = false;

            this.mensajes.estatus = "Éxito"
            this.mensajes.mensaje = "Usuario autenticado con éxito.";
            this.mensajes.carga = { ...this.usuario } as LoginRespuesta;

            this.almacenarEnLocalStorage(this.usuario, callback);
          } else {
            this.mensajes.estatus = "Error"
            this.mensajes.mensaje = "Usuario no autenticado.";
            this.mensajes.carga = {} as LoginRespuesta;
          }
        },
        error: error => {
          this.mensajes.estatus = "Error"
          this.mensajes.mensaje = "Los datos enviados no son válidos.";
          this.mensajes.carga = {} as LoginRespuesta;
        }
      });
  }

  registrar(registrar: Registrar, hecho: (error: string, succes: boolean) => void): void {

    this.clienteHttp.post("http://localhost:8080/api/usuarios", registrar)
      .subscribe({
        next: (res: any) => {
          this.usuario = res as LoginRespuesta;
          if (!!this.usuario.id) {
            localStorage.setItem('sesion', JSON.stringify(this.usuario));
            this.logged = true;
            this.notLogged = false;
            hecho('', true);
          } else {
            hecho('Este correo ya está asociado a otro perfil.', false);
          }
        },
        error: err => {
          hecho('Este correo ya está asociado a otro perfil.', false);
        }
      });
  }

  comprobarSesion(): boolean {
    this.usuario = JSON.parse(localStorage.getItem('sesion') || "{}");

    if (!!this.usuario.id) {
      localStorage.setItem('sesion', JSON.stringify(this.usuario));
      this.logged = true;
      this.notLogged = false;
    }
    return this.logged;
  }

  cerrarSesion(redireccionar: () => void): void {
    localStorage.removeItem('sesion');
    this.logged = false;
    this.notLogged = true;
    redireccionar();
  }

  isLogged(): boolean {
    return this.logged;
  }

  isNotLogged(): boolean {
    return this.notLogged;
  }

  get mensaje(): Respuesta<LoginRespuesta> {
    return this.mensajes;
  }
}
