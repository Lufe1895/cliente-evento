import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaPaginada } from '../Interfaces/RespuestaPaginada';
import { EventoRespuesta } from '../Interfaces/EventoRespuesta';
import { Evento } from '../Types/Evento';
import { Respuesta } from '../Interfaces/Respuesta';

@Injectable({
  providedIn: 'root'
})

export class EventosService {
  public listaEventos:RespuestaPaginada<EventoRespuesta>;
  public response:Respuesta<EventoRespuesta>;

  constructor(private clienteHttp:HttpClient) {
    this.listaEventos = {} as RespuestaPaginada<EventoRespuesta>;
    this.response = {} as Respuesta<EventoRespuesta>;
  }

  crearEvento(evento:Evento, fireSwal:(success:boolean) => void) {
    this.clienteHttp.post("http://localhost:8080/api/eventos", evento)
    .subscribe({
      next: res => {
        this.response.carga = res as EventoRespuesta;
        if (!!this.response.carga.id) {
          this.response.estatus = "Éxito";
          this.response.mensaje = "El evento se agregó satisfactoriamente."

          fireSwal(true);
        } else {
          this.response.estatus = "Error";
          this.response.mensaje = "El evento no pudo agregarse."

          fireSwal(false);
        }
      },
      error: error => {
        this.response.estatus = "Error";
        this.response.mensaje = "El evento no pudo agregarse.";
        this.response.carga = {} as EventoRespuesta;

        fireSwal(false);
      }
    });
  }

  obtenerEventosAsistidos(userId:number, setEventos:(eventos:EventoRespuesta[]) => void) {
    this.clienteHttp.get(`http://localhost:8080/api/eventos/asistidos/${ userId }`)
    .subscribe((res) => {
      setEventos(res as EventoRespuesta[]);
    })
  }

  obtenerEventosOrganizados(userId:number, setEventos:(eventos:EventoRespuesta[]) => void) {
    this.clienteHttp.get(`http://localhost:8080/api/eventos/organizados/${ userId }`)
    .subscribe((res) => {
      setEventos(res as EventoRespuesta[]);
    })
  }

  obtenerEventosPaginados(pageNumber:number, usuario:number):void {
    this.clienteHttp.get(`http://localhost:8080/api/eventos?pageNo=${ pageNumber }&user=${ usuario }`)
    .subscribe((res) => {
      this.listaEventos = res as RespuestaPaginada<EventoRespuesta>;
    });
  }
}
