export interface Estudiante {
    id_estudiante: number; //db.Column(db.Integer, primary_key=True, autoincrement=True)
    doc_identidad: string; //db.Column(db.String(20), nullable=False, unique=True)
    nombres: string;//db.Column(db.String(150), nullable=False)
    apellidos: string;//db.Column(db.String(200), nullable=False)
    fec_nacimiento: Date;//db.Column(db.Date, nullable=False)
    id_genero: number;//db.Column(db.Integer, db.ForeignKey('genero.id_genero'), nullable=False)
    email: string;//db.Column(db.String(150), nullable=False)
    direccion: string;///db.Column(db.String(150), nullable=False)
    num_telefono: number;//db.Column(db.Numeric(9), nullable=False)
    anio_ingreso: number;//db.Column(db.Integer, nullable=False)
    id_carrera: number;//db.Column(db.Integer, db.ForeignKey('carrera.id_carrera'), nullable=False)
    contrasenia: string;
}

