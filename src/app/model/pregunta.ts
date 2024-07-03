import { Test } from "./test";

export interface Pregunta {
    id_pregunta: number;
    id_test: number;
    interrogante: string;
    orden: number;
    descripcion: string | null;

    test: Test;
  }