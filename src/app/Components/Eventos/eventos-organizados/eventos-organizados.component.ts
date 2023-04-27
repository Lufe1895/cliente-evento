import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoRespuesta } from 'src/app/Interfaces/EventoRespuesta';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EventosService } from 'src/app/Services/eventos.service';
import { Converters } from 'src/app/Utils/Converters';
import { DetallesEventoModalComponent } from '../detalles-evento-modal/detalles-evento-modal.component';
import { ComentariosService } from 'src/app/Services/comentarios.service';
import { ComentariosEventoModalComponent } from '../comentarios-evento-modal/comentarios-evento-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-organizados',
  templateUrl: './eventos-organizados.component.html',
  styleUrls: ['./eventos-organizados.component.css']
})
export class EventosOrganizadosComponent implements OnInit {
  private eventos:EventoRespuesta[];

  constructor(private service: EventosService, 
      private authService:AuthenticationService,
      private modalService:NgbModal,
      private comService:ComentariosService,
      private router:Router) {
    this.eventos = [];
  }

  openDetallesModal(evento:EventoRespuesta) {
    const modalRef = this.modalService.open(DetallesEventoModalComponent);
    modalRef.componentInstance.evento = evento;
  }

  openComentariosModal(eventoId:number) {
    this.comService.obtenerComentariosPaginados(eventoId, 0);
    const modalRef = this.modalService.open(ComentariosEventoModalComponent);
    modalRef.componentInstance.eventoId = eventoId;
  }

  ngOnInit(): void {
    const usuario:LoginRespuesta = this.authService.obtenerUsuarioLoggeado();

    if (!usuario.id) this.router.navigate(['/login']);

    this.service.obtenerEventosOrganizados(usuario.id, this.setEventos);
  }

  setEventos = (eventos:EventoRespuesta[]):void => {
    this.eventos = eventos;
  }

  get Eventos() {
    return this.eventos;
  }

  get converter() {
    return Converters;
  }
}
