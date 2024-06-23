export interface Resultado {
    id_resultado: number;
    id_evaluacion: number;
    id_especialista: number;
    puntaje: number;
    id_escala: number;
    id_estado: number;
    interpretacion: string;
    fec_interpretacion: Date;
  }