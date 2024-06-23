import { Paciente } from "./paciente";
import { Test } from "./test";
export interface Evaluacion {
    id_evaluacion: number;
    id_paciente: number;
    id_test: number;
    respuestas: string;
    fec_realizacion: Date;
    paciente: Paciente;
    test: Test;
}