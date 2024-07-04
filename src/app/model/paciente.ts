import { Carrera } from "./carrera";
import { Condicion } from "./condicion";
import { Persona } from "./persona";
import { Usuario } from "./usuario";
import { Ubigeo } from "./ubigeo";
import { Genero } from "./genero";

export interface Paciente{
    id_paciente: number;
    id_ubigeo: number;
    id_condicion: number;
    id_carrera: number | null;
    id_persona: number;
    id_usuario: number;

    ubigeo: Ubigeo;
    condicion: Condicion;
    genero: Genero;
    carrera: Carrera;
    persona: Persona;
    usuario: Usuario;
}