import { Time } from "@angular/common";
import { Paciente } from "./paciente";
import { Especialista } from "./especialista";
import { Estado } from "./estado";
import { Modalidad } from "./modalidad";

export interface Cita {
    id_cita: number;
    id_paciente: number;
    id_especialista: number;
    motivo: string;
    id_estado: number;
    id_modalidad: number;
    fec_programada: Date;
    hora_inicio: Time;
    hora_fin: Time;

    paciente: Paciente;
    especialista: Especialista;
    estado: Estado;
    modalidad: Modalidad;
}
