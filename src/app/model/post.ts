import { Paciente } from './paciente';

export interface Post {
    id_post: number;
    id_paciente: number;
    descripcion: string;
    fec_publicacion: Date;
    fec_edicion: Date;
    anonimo: boolean;

    paciente: Paciente;
}
