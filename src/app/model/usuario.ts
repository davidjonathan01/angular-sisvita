import { Tipo_Usuario } from "./tipo_usuario";

export interface Usuario{
    id_usuario: number;
    email: string;
    contrasenia: string;
    id_tipo_usuario: number;

    tipo_usuario: Tipo_Usuario
}