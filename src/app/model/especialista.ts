import { Especialidad } from "./especialidad";
import { Genero } from "./genero";
import { Persona } from "./persona";
import { Usuario } from "./usuario";

export interface Especialista {
    id_especialista: number;
    id_especialidad: number;
    n_licencia: string;
    activo: boolean;
    id_persona: number;
    id_usuario: number;

    especialidad: Especialidad;
    usuario: Usuario;
    persona:Persona;
  }