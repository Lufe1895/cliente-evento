export interface RespuestaPaginada<T> {
    pageNumber:number;
    pageSize:number;
    totalElements:number;
    totalPages:number;
    isLast:boolean;
    payload:T[];
}