import { Injectable } from '@angular/core';
import { RespuestaPaginada } from '../Interfaces/RespuestaPaginada';
import { ComentarioRespuesta } from '../Interfaces/ComentarioRespuesta';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../Types/Comentario';
import { Respuesta } from '../Interfaces/Respuesta';

@Injectable({
  providedIn: 'root'
})

export class ComentariosService {
  public listaComentarios:RespuestaPaginada<ComentarioRespuesta>;
  public response:Respuesta<ComentarioRespuesta>;
  
  constructor(private clienteHttp:HttpClient) {
    this.listaComentarios = { payload: [] as ComentarioRespuesta[] } as RespuestaPaginada<ComentarioRespuesta>;
    this.response = {} as Respuesta<ComentarioRespuesta>;
  }

  realizarComentario(comentario:Comentario, fireSwal:(success:boolean) => void) {
    this.clienteHttp.post("http://localhost:8080/api/comentarios", comentario)
    .subscribe({
      next: res => {
        this.response.carga = res as ComentarioRespuesta;
        if (!!this.response.carga.id) {
          this.response.estatus = "Éxito";
          this.response.mensaje = "El comentario se agregó satisfactoriamente."

          fireSwal(true);
        } else {
          this.response.estatus = "Error";
          this.response.mensaje = "El comentario no pudo agregarse."

          fireSwal(false);
        }
      },
      error: error => {
        this.response.estatus = "Error";
        this.response.mensaje = "El comentario no pudo agregarse.";
        this.response.carga = {} as ComentarioRespuesta;

        fireSwal(false);
      }
    });
  }

  obtenerComentariosPaginados(event:number, pageNumber:number):void {
    this.clienteHttp.get(`http://localhost:8080/api/comentarios/${ event }?pageNo=${ pageNumber }&pageSize=5`)
    .subscribe((res) => {
      this.listaComentarios = res as RespuestaPaginada<ComentarioRespuesta>;
    });
  }

  get respuesta() {
    return this.response;
  }
}
