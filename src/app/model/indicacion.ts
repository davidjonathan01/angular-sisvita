import { Tratamiento } from './tratamiento';

export interface Indicacion {
    id_indicacion: number;
    id_tratamiento: number;
    orden: number;
    descripcion: string;

    tratamiento: Tratamiento;
}
