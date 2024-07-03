import { Time } from "@angular/common";
import { Especialista } from "./especialista";
import { Dia } from "./dia";

export interface Jornada {
    id_jornada: number;
    id_especialista: number;
    id_dia: number;
    hora_inicio: Time;
    hora_fin: Time;

    especialista: Especialista;
    dia: Dia;
}
