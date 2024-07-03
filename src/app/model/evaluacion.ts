import { Escala } from "./escala";
import { Paciente } from "./paciente";
import { Test } from "./test";
import { Idioma } from "./idioma";
export interface Evaluacion {
    id_evaluacion: number;
    id_paciente: number;
    id_test: number;
    respuestas: string;
    fec_realizacion: Date;
    puntaje: number;
    id_escala: number;

    paciente: Paciente;
    test: Test;
    escala: Escala;
    idioma: Idioma;
}