export interface AuditelEntrantesDTO {
  auditoria: {
    id_audicion?: number;
    expediente: number;
    fecha: Date;
    puntuacionTotalAuditoria: number;
    tipo: string;
    idColectivo: number;
    idCoordinadorEmpleado: number;
    idDepartamento: number;
    idEmpleado: number;
  };
  auditelEntrante: {
    id?: number;
    amabilidad: number;
    capacidad_encontrar_alternativa: number;
    cercania_humana: number;
    claridad_explicaciones: number;
    completa_expediente_correctamente: number;
    despedida_corporativa: number;
    duracion_adaptada_dificultad: number;
    empatica_cliente: number;
    escucha_activa: number;
    evita_tono_monotono: number;
    formulas_cortesia: number;
    gestion_conflictos: number;
    gestion_silencios: number;
    gestiona_optimizacion_costes: number;
    indica_pasosaseguir: number;
    muestra_buena_imagen: number;
    ofrece_agilmente_solucion: number;
    ofrece_taller_concertado: number;
    personalizacion_cliente: number;
    realiza_argumentario_percance: number;
    realiza_preguntas_estimulo: number;
    recepcion_llamada: number;
    saludo_corporativo: number;
    satisfaccion_cliente: number;
    seguridad_respuestas: number;
    usa_lenguaje_adecuado: number;
    vocalizacion_correcta: number;
  };
}
