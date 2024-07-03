import { Especialista } from "./especialista";

export interface Recurso {
    id_recurso: number;
    id_especialista: number;
    titulo: string;
    contenido: string;
    fec_publicacion: Date;
    fec_edicion: Date;

    especialista: Especialista;
}
