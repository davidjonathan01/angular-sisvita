import { Paciente } from './paciente';
import { Taller } from './taller';

export interface Asistencia {
    id_asistencia: number;
    fecha: Date;
    id_taller: number;
    id_paciente: number;

    taller: Taller;
    paciente: Paciente;
}
