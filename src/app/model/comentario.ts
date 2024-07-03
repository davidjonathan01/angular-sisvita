import { Post } from "./post";
import { Paciente } from "./paciente";

export interface Comentario {
    id_comentario: number;
    id_post: number;
    id_paciente: number;
    descripcion: string;
    fec_publicacion: Date;
    fec_edicion: Date;
    anonimo: boolean;

    paciente: Paciente;
    post: Post;
}
