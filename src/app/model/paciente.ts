import { Carrera } from "./carrera";
import { Condicion } from "./condicion";
import { Persona } from "./persona";
import { Usuario } from "./usuario";
import { Ubigeo } from "./ubigeo";

export interface Paciente{
    id_paciente: number;
    id_ubigeo: number;
    id_condicion: number;
    id_carrera: number;
    id_persona: number;
    id_usuario: number;

    ubigeo: Ubigeo;
    condicion: Condicion;
    carrera: Carrera;
    persona: Persona;
    usuario: Usuario;
}