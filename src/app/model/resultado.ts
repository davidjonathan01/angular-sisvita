import { Escala } from "./escala";
import { Especialista } from "./especialista";
import { Estado } from "./estado";
import { Evaluacion } from "./evaluacion";
export interface Resultado{
    id_resultado: number;
    id_evaluacion: number;
    id_especialista: number;
    id_estado: number;
    id_escala: number | null;
    fec_interpretacion: Date | null;
    observacion: string | null;
    informe: string | null;
    recomendacion: string | null;
    
    evaluacion: Evaluacion;
    especialista:Especialista;
    escala:Escala;
    estado:Estado;   
}