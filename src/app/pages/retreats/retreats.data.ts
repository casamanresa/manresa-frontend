export interface RetreatActivity {
  date: string;
  name: string;
}

export interface RetreatMonth {
  name: string;
  activities: RetreatActivity[];
}

export const RETREATS: RetreatMonth[] = [
  {
    name: "Enero",
    activities: [
      { date: "3–5", name: "CERRADO" },
      { date: "10–12", name: "CERRADO" },
      { date: "17–19", name: "Lazos de Amor Mariano" },
      {
        date: "24–26",
        name: "Encuentro con Jesús + Las Moradas del Castillo interior, Santa Teresa de Jesús (P. Y. Reyes)",
      },
      { date: "26", name: "Jornada de Auxiliares" },
    ],
  },
  {
    name: "Febrero",
    activities: [
      { date: "31 ene–2", name: "RESERVADA" },
      { date: "7–9", name: "RESERVADA" },
      {
        date: "14–16",
        name: "Diálogo Matrimonial I y Taller de novios (Seguimiento: 23 de febrero)",
      },
      {
        date: "21–23",
        name: "Introducción a los Ejercicios Espirituales de San Ignacio (P. M. Gaudio)",
      },
      { date: "24–28", name: "RESERVADA" },
    ],
  },
  {
    name: "Marzo",
    activities: [
      { date: "28 feb–2", name: "RESERVADA" },
      { date: "7–9", name: "RESERVADA" },
      { date: "14–16", name: "Sanación en Cuaresma" },
      { date: "21–23", name: "RESERVADA" },
      { date: "28–30", name: "RESERVADA" },
    ],
  },
  {
    name: "Abril",
    activities: [
      { date: "4–6", name: "Todo Incluido para Jóvenes" },
      {
        date: "11–13",
        name: "Diálogo Matrimonial I y Reencuentro Matrimonial + Taller de novios (Seguimiento: 27 de abril)",
      },
      { date: "14–20", name: "Semana Santa (con Parroquia San José)" },
      { date: "25–27", name: "Encontrando tu luz interior con Cristo" },
    ],
  },
  {
    name: "Mayo",
    activities: [
      { date: "9–11", name: "RESERVADA" },
      { date: "16–18", name: "DISPONIBLE" },
      { date: "23–25", name: "Sanación en Pentecostés" },
      {
        date: "30 mayo–1 junio",
        name: "Diálogo Matrimonial I y Taller de novios",
      },
    ],
  },
  {
    name: "Junio",
    activities: [
      { date: "6–8", name: "DISPONIBLE" },
      { date: "13–15", name: "DISPONIBLE" },
      { date: "20–22", name: "Retiro para hombres" },
      { date: "27–29", name: "DISPONIBLE" },
    ],
  },
  { name: "Julio", activities: [{ date: "", name: "CERRADO" }] },
  {
    name: "Agosto",
    activities: [
      {
        date: "1–3",
        name: "Diálogo Matrimonial I y II + Reencuentro Matrimonial",
      },
      {
        date: "3–8",
        name: "Ejercicios Espirituales Semana de profundización: método Ignaciano (P. Miguel Gaudio)",
      },
      { date: "8–10", name: "DISPONIBLE" },
      { date: "15–17", name: "DISPONIBLE" },
      {
        date: "22–24",
        name: "Conoce tu fe (dirigido a líderes parroquiales)",
      },
      { date: "29 ago–1 sept", name: "RESERVADA" },
    ],
  },
  {
    name: "Septiembre",
    activities: [
      { date: "5–7", name: "DISPONIBLE" },
      { date: "12–14", name: "La Divina Misericordia" },
      { date: "19–21", name: "Divorciados en nueva unión" },
      {
        date: "26–28",
        name: "Un recorrido por las Escuelas de espiritualidad (P. Y. Reyes)",
      },
    ],
  },
  {
    name: "Octubre",
    activities: [
      {
        date: "3–5",
        name: "Ejercicios Espirituales Parte II: método Ignaciano (P. M. Gaudio) + Retiro para Auxiliares",
      },
      { date: "10–12", name: "DISPONIBLE" },
      {
        date: "17–19",
        name: "Diálogo Matrimonial I y Taller de novios (Seguimiento: 26 de octubre)",
      },
      { date: "24–26", name: "DISPONIBLE" },
    ],
  },
  {
    name: "Noviembre",
    activities: [
      { date: "31 oct–2", name: "DISPONIBLE" },
      { date: "7–9", name: "DISPONIBLE" },
      { date: "14–16", name: "Todo Incluido para Jóvenes" },
      {
        date: "21–23",
        name: "Retiro para mujeres + Encontrando tu luz interior con Cristo",
      },
      { date: "28–30", name: "DISPONIBLE" },
    ],
  },
  {
    name: "Diciembre",
    activities: [
      {
        date: "5–7",
        name: "Diálogo Matrimonial I + Reencuentro Matrimonial + Taller de novios",
      },
      { date: "12–14", name: "Sanación en Adviento" },
      { date: "19–21", name: "DISPONIBLE" },
      { date: "27–29", name: "Navidad Juvenil" },
    ],
  },
];
