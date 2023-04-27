import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoRespuesta } from 'src/app/Interfaces/EventoRespuesta';
import { Converters } from 'src/app/Utils/Converters';

@Component({
  selector: 'app-detalles-evento-modal',
  templateUrl: './detalles-evento-modal.component.html',
  styleUrls: ['./detalles-evento-modal.component.css']
})

export class DetallesEventoModalComponent {
  public evento:EventoRespuesta;

  constructor(private modalService:NgbModal) {
    this.evento = {} as EventoRespuesta;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

  get converter() {
    return Converters;
  }
}
