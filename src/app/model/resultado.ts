import { Escala } from "./escala";
import { Especialista } from "./especialista";
import { Estado } from "./estado";
import { Evaluacion } from "./evaluacion";
export interface Resultado{
    id_resultado: number;
    id_evaluacion: number;
    id_especialista: number;
    puntaje: number;
    id_escala: number;
    id_estado: number;
    observacion: string;
    fec_interpretacion: Date;
    escala:Escala;
    estado:Estado;
    evaluacion: Evaluacion;
    especialista:Especialista;
}