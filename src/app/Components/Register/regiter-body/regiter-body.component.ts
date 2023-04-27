import { Component, ViewChild, ElementRef } from '@angular/core';
import { Registrar } from 'src/app/Types/Registrar';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regiter-body',
  templateUrl: './regiter-body.component.html',
  styleUrls: ['./regiter-body.component.css']
})
export class RegiterBodyComponent {
  @ViewChild("nombre") nombreElement!:ElementRef;
  @ViewChild("correo") correoElement!:ElementRef;
  @ViewChild("imagen") imagenElement!:ElementRef;
  @ViewChild("password1") password1Element!:ElementRef;
  @ViewChild("password2") password2Element!:ElementRef;
  private error:string;

  constructor(private service:AuthenticationService, private router:Router) {
    this.error = '';
  }

  registrar() {
    let registro:Registrar = {} as Registrar;

    if (this.password1Element.nativeElement.value != this.password2Element.nativeElement.value) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    registro.nombre = this.nombreElement.nativeElement.value;
    registro.correo = this.correoElement.nativeElement.value;
    registro.foto = this.imagenElement.nativeElement.value;
    registro.nombre = this.nombreElement.nativeElement.value;
    registro.contrasena = this.password1Element.nativeElement.value;

    this.service.registrar(registro, (message:string, succes:boolean) => {
      this.error = message;
      if (succes) this.router.navigate(['/authed/eventos']);
    });
  }

  get errores() {
    return this.error;
  }
}
