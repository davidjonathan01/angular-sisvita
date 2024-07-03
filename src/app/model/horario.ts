import { Time } from "@angular/common";
import { Dia } from "./dia";
import { Taller } from "./taller";

export interface Horario {
    id_horario: number;
    id_taller: number;
    id_dia: number;
    horario_inicio: Time;
    horario_fin: Time;

    taller: Taller;
    dia: Dia;
}
