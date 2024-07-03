import { Especialista } from './especialista';
import { Modalidad } from './modalidad';
import { Estado } from './estado';

export interface Taller {
    id_taller: number;
    nombre: string;
    id_especialista: number;
    n_vacantes: number;
    fec_inicio: Date;
    fec_fin: Date;
    id_modalidad: number;
    id_estado: number;

    especialista: Especialista;
    modalidad: Modalidad;
    estado: Estado;
}
