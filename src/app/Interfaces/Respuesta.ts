export interface Respuesta<T> {
    estatus:string;
    mensaje:string;
    carga:T;
}