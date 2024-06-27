import { Especialista } from "./especialista";
import { Resultado } from "./resultado";
import { Test } from "./test";

export interface Invitacion{
    id_invitacion: number;
    id_especialista: number;
    id_resultado: number;
    id_test: number;
    fec_invitacion: Date;
    especialista:Especialista;
    resultado:Resultado;
    test: Test;
}