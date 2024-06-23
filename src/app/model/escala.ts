import { Test } from "./test";
export interface Escala{
    id_escala: number;
    nombre: string;
    descripcion: string;
    id_test: number;
    puntaje_min: number;
    puntaje_max: number;
    test: Test;
}