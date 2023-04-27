import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoRespuesta } from 'src/app/Interfaces/EventoRespuesta';
import { RespuestaPaginada } from 'src/app/Interfaces/RespuestaPaginada';
import { EventosService } from 'src/app/Services/eventos.service';
import { DetallesEventoModalComponent } from '../detalles-evento-modal/detalles-evento-modal.component';
import { Converters } from 'src/app/Utils/Converters';
import { ComentariosEventoModalComponent } from '../comentarios-evento-modal/comentarios-evento-modal.component';
import { ComentariosService } from 'src/app/Services/comentarios.service';
import { ComentarEventoModalComponent } from '../comentar-evento-modal/comentar-evento-modal.component';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { AsistirEventoModalComponent } from '../asistir-evento-modal/asistir-evento-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css']
})
export class EventosListComponent implements OnInit {
  private pageNumber: number;

  constructor(private service: EventosService, 
      private comService:ComentariosService, 
      private modalService: NgbModal, 
      private usuariosService:AuthenticationService,
      private router:Router) {
    this.pageNumber = 0;
  }

  openAsistenciaModal(eventoId:number) {
    const modalRef = this.modalService.open(AsistirEventoModalComponent);
    modalRef.componentInstance.eventoId = eventoId;
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

  openComentarModal(eventoId:number) {
    const modalRef = this.modalService.open(ComentarEventoModalComponent);
    modalRef.componentInstance.eventoId = eventoId;
  }

  incrementPageNumber(): void {
    const usuario:LoginRespuesta = this.usuariosService.obtenerUsuarioLoggeado();

    if (!usuario.id) this.router.navigate(['/login']);

    this.service.obtenerEventosPaginados(++this.pageNumber, usuario.id);
  }

  decrementPageNumber(): void {
    const usuario:LoginRespuesta = this.usuariosService.obtenerUsuarioLoggeado();

    if (!usuario.id) this.router.navigate(['/login']);

    this.service.obtenerEventosPaginados(this.pageNumber - 1 > -1 ? --this.pageNumber : this.pageNumber, usuario.id);
  }

  ngOnInit(): void {
    const usuario:LoginRespuesta = this.usuariosService.obtenerUsuarioLoggeado();

    if (!usuario.id) this.router.navigate(['/login']);

    this.service.obtenerEventosPaginados(this.pageNumber, usuario.id);
  }

  get pagina(): RespuestaPaginada<EventoRespuesta> {
    return this.service.listaEventos;
  }

  get eventos(): EventoRespuesta[] {
    return this.service.listaEventos.payload;
  }

  get isFirst(): boolean {
    return this.pageNumber == 0;
  }

  get converter() {
    return Converters;
  }
}
