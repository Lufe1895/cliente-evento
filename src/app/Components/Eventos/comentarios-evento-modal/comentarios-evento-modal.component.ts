import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComentarioRespuesta } from 'src/app/Interfaces/ComentarioRespuesta';
import { RespuestaPaginada } from 'src/app/Interfaces/RespuestaPaginada';
import { ComentariosService } from 'src/app/Services/comentarios.service';

@Component({
  selector: 'app-comentarios-evento-modal',
  templateUrl: './comentarios-evento-modal.component.html',
  styleUrls: ['./comentarios-evento-modal.component.css']
})
export class ComentariosEventoModalComponent {
  public comentariosPaginados:RespuestaPaginada<ComentarioRespuesta>;
  public eventoId:number;
  private pageNumber: number;

  constructor(private service:ComentariosService, private modalService:NgbModal) {
    this.comentariosPaginados = {} as RespuestaPaginada<ComentarioRespuesta>;
    this.pageNumber = 0;
    this.eventoId = 0;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

  incrementPageNumber(): void {
    this.service.obtenerComentariosPaginados(this.eventoId, ++this.pageNumber);
  }

  decrementPageNumber(): void {
    this.service.obtenerComentariosPaginados(this.eventoId, this.pageNumber - 1 > -1 ? --this.pageNumber : this.pageNumber);
  }

  get pagina():RespuestaPaginada<ComentarioRespuesta> {
    return this.service.listaComentarios;
  }

  get comentarios():ComentarioRespuesta[] {
    return this.service.listaComentarios.payload;
  }

  get isFirst(): boolean {
    return this.pageNumber == 0;
  }
}
