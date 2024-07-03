import { Resultado } from './resultado';
import { Estado } from './estado';

export interface Tratamiento {
    id_tratamiento: number;
    id_resultado: number;
    objetivo: string;
    fec_asignacion: Date;
    fec_inicio: Date;
    fec_fin: Date;
    id_estado: number;
    observaciones: string;

    resultado: Resultado;
    estado: Estado;
}
