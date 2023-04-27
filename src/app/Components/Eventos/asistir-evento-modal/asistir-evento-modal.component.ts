import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginRespuesta } from 'src/app/Interfaces/LoginRespuesta';
import { AsistenciasService } from 'src/app/Services/asistencias.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Asistencia } from 'src/app/Types/Asistencia';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistir-evento-modal',
  templateUrl: './asistir-evento-modal.component.html',
  styleUrls: ['./asistir-evento-modal.component.css']
})
export class AsistirEventoModalComponent {
  public numPersonas:number;
  public eventoId:number;

  constructor(private modalService:NgbModal, 
      private authService:AuthenticationService, 
      private service:AsistenciasService,
      private router:Router) {
    this.numPersonas = 0;
    this.eventoId = 0;
  }

  asistir() {
    let asistencia:Asistencia = {} as Asistencia;
    const usuario:LoginRespuesta = this.authService.obtenerUsuarioLoggeado();

    if (!usuario.id) this.router.navigate(['/login']);

    asistencia.eventoId = this.eventoId;
    asistencia.usuarioId = usuario.id;
    asistencia.numPersonas = this.numPersonas;
    
    this.service.asistirEvento(asistencia, (success:boolean) => {
      Swal.fire(success ? "Asistencia realizada" : "Error",
        success ? "La asistencia se guardó correctamente." : "Error al crear asistencia.",
        success ? 'success': 'error').then(() => {
          location.reload();
        });
      this.cerrarModal();
    });
  }

  disminuir() {
    this.numPersonas = this.numPersonas - 1 >= 0 ? --this.numPersonas : this.numPersonas;
  }

  aumentar() {
    this.numPersonas = this.numPersonas + 1 > 15 ? this.numPersonas : ++this.numPersonas;
  }

  cerrarModal() {
    this.modalService.dismissAll();
  }

  get getNumPersonas() {
    return this.numPersonas;
  }
}
