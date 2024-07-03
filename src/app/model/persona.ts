import { Genero } from "./genero";

export interface Persona{
    id_persona: number;
    doc_identidad: string;
    nombres: string;
    apellidos: string;
    fec_nacimiento: Date;
    id_genero: number;
    num_telefono: string;
    
    genero: Genero;
}