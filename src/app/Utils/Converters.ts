export class Converters {
    public static formatDate(fecha:string): string {
        const aux: string[] = fecha.split("-");
        const meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        return `${aux[2]} de ${meses[Number(aux[1]) - 1]} de ${aux[0]}`;
    }

    public static formatCosto(costo:number):string {
        return costo.toFixed(2);
    }
}