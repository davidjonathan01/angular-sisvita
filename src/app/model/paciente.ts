export interface Paciente{
    id_paciente: number;
    doc_identidad: string;
    nombres: string;
    apellidos:string;
    fec_nacimiento: Date;
    id_genero: number;
    direccion: string;
    num_telefono: number;
    id_condicion: number;
    anio_ingreso: number;
    id_carrera: number;
    id_usuario: number;
    ubigeo: string;
}