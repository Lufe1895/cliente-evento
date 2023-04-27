import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ComentariosService } from 'src/app/Services/comentarios.service';
import { Comentario } from 'src/app/Types/Comentario';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentar-evento-modal',
  templateUrl: './comentar-evento-modal.component.html',
  styleUrls: ['./comentar-evento-modal.component.css']
})
export class ComentarEventoModalComponent {
  @ViewChild("comentario") comentarioElement!: ElementRef;

  public user: LoginRespuesta;
  public eventoId: number;
  private calificacion: number;

  constructor(private modalService: NgbModal, 
      private service: ComentariosService, 
      private authService: AuthenticationService,
      private router:Router) {
    this.eventoId = 0;
    this.calificacion = 1;
    this.user = {} as LoginRespuesta;
  }

  comentar() {
    this.user = this.authService.obtenerUsuarioLoggeado();

    if (!this.user.id) this.router.navigate(['/login']);

    let comentario: Comentario = {} as Comentario;
    comentario.usuarioId = this.user.id;
    comentario.eventoId = this.eventoId;
    comentario.comentario = this.comentarioElement.nativeElement.value;
    comentario.calificacion = this.calificacion;

    this.service.realizarComentario(comentario, (success:boolean) => {
      Swal.fire(success ? "Comentario realizado" : "Error",
        success ? "El comentario se guardó correctamente." : "Error al realizar comentario.",
        success ? 'success': 'error');
      this.cerrarModal();
    });
  }

  disminuir() {
    this.calificacion = this.calificacion - 1 > 0 ? --this.calificacion : this.calificacion;
  }

  aumentar() {
    this.calificacion = this.calificacion + 1 > 5 ? this.calificacion : ++this.calificacion;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

  get getCalificacion() {
    return this.calificacion;
  }
}
