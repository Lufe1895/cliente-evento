import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EventosService } from 'src/app/Services/eventos.service';
import { Evento } from 'src/app/Types/Evento';
import { AppConstants } from 'src/app/Utils/AppConstants';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos-crear',
  templateUrl: './eventos-crear.component.html',
  styleUrls: ['./eventos-crear.component.css']
})
export class EventosCrearComponent {
  @ViewChild("nombre") nombreElement!: ElementRef;
  @ViewChild("descripcion") descripcionElement!: ElementRef;
  @ViewChild("imagen") imagenElement!: ElementRef;
  @ViewChild("lugar") lugarElement!: ElementRef;
  @ViewChild("categoria") categoriaElement!: ElementRef;
  @ViewChild("fecha") fechaElement!: ElementRef;
  @ViewChild("inicio") inicioElement!: ElementRef;
  @ViewChild("aforo") aforoElement!: ElementRef;
  @ViewChild("cover") coverElement!: ElementRef;

  constructor(private service:EventosService, 
      private authService:AuthenticationService,
      private router:Router) {}

  crearEvento() {
    let evento: Evento = {} as Evento;
    const usuario:LoginRespuesta = this.authService.obtenerUsuarioLoggeado();

    if (!usuario.id) this.router.navigate(['/login']);

    evento.usuarioId = usuario.id;
    evento.rol = 'Principal';
    evento.nombre = this.nombreElement.nativeElement.value;
    evento.descripcion = this.descripcionElement.nativeElement.value;
    evento.imagen = this.imagenElement.nativeElement.value;
    evento.lugar = this.lugarElement.nativeElement.value;
    evento.categoria = this.categoriaElement.nativeElement.value;
    evento.fecha = this.fechaElement.nativeElement.value;
    evento.hora = this.inicioElement.nativeElement.value;
    evento.aforo = this.aforoElement.nativeElement.value;
    evento.cover = this.coverElement.nativeElement.value;

    this.service.crearEvento(evento, (success:boolean) => {
      Swal.fire(success ? "Evento guardado" : "Error",
        success ? "El evento se guardó correctamente." : "Error al crear evento.",
        success ? 'success': 'error').then(() => {
          if (success) this.router.navigate(['/authed/organizados'])
        });
    });
  }

  get categorias() {
    return AppConstants.CATEGORIAS_EVENTO;
  }
}
