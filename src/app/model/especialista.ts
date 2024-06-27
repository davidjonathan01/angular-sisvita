import { Especialidad } from "./especialidad";
import { Genero } from "./genero";

export interface Especialista {
    id_especialista: number;
    id_especialidad: number;
    doc_identidad: string;
    nombres: string;
    apellidos: string;
    fec_nacimiento: Date;
    id_genero: number;
    n_licencia: string;
    anio_graduacion: number;
    activo: boolean;
    id_usuario: number;
    especialidad: Especialidad;
    genero: Genero;
  }