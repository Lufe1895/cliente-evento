import { Component, OnInit } from '@angular/core';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  private usuario:LoginRespuesta;

  constructor(private router:Router, private service:AuthenticationService) {
    this.usuario = {} as LoginRespuesta;
  }

  ngOnInit(): void {
    this.usuario = this.service.obtenerUsuarioLoggeado();

    if (!this.usuario.id) this.router.navigate(['/login']);

    console.log(this.usuario);
    
  }

  get Usuario():LoginRespuesta {
    return this.usuario;
  }
}
