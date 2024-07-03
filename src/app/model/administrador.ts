import { Persona } from './persona';
import { Usuario } from './usuario';

export interface Administrador {
    id_administrador: number;
    id_persona: number;
    id_usuario: number;

    persona: Persona;
    usuario: Usuario;
}
