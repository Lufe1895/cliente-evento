import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistencia } from '../Types/Asistencia';
import { Respuesta } from '../Interfaces/Respuesta';
import { AsistenciaRespuesta } from '../Interfaces/AsistenciaRespuesta';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  public response:Respuesta<AsistenciaRespuesta>;

  constructor(private clienteHttp: HttpClient) {
    this.response = {} as Respuesta<AsistenciaRespuesta>;
  }

  asistirEvento(asistencia:Asistencia, fireSwal:(success:boolean) => void) {
    this.clienteHttp.post("http://localhost:8080/api/asistencias", asistencia)
    .subscribe({
      next: res => {
        this.response.carga = res as AsistenciaRespuesta;
        if (!!this.response.carga.id) {
          this.response.estatus = "Éxito";
          this.response.mensaje = "La asistencia se agregó satisfactoriamente."

          fireSwal(true);
        } else {
          this.response.estatus = "Error";
          this.response.mensaje = "La asistencia no pudo agregarse."

          fireSwal(false);
        }
      },
      error: error => {
        this.response.estatus = "Error";
        this.response.mensaje = "La asistencia no pudo agregarse.";
        this.response.carga = {} as AsistenciaRespuesta;

        fireSwal(false);
      }
    });
  }
}
