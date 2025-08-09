import { CommonModule, NgIf } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { AthMovilService } from "../../services/ath-movil.service";

@Component({
  selector: "app-retreats",
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: "./retreats.component.html",
  styleUrl: "./retreats.component.scss",
})
export class RetreatsComponent {
  // === Google Form config (goes to your linked Sheet) ===
  private FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSfS4XhXksIrcM1-W1rYybuGz2UqAg8cz85To8bh_Kmft-_zgA/formResponse";

  // Field IDs from your prefilled link
  private ENTRY_RETIRO = "entry.2129786749";
  private ENTRY_NOMBRE = "entry.1425162988";
  private ENTRY_APELLIDO = "entry.1174275998";
  private ENTRY_EDAD = "entry.914659150";
  private ENTRY_TELEFONO = "entry.1490531259";
  private ENTRY_PAGARA = "entry.548100476";
  private ENTRY_PRECIO = "entry.2137962994";

  ATH_LINK =
    "https://pagos.athmovilapp.com/pagoPorCodigo.html?133d0fe53fe0aee5f76f045eeebc2197a446f0120738dcc7a7f4ee6751b77786e45fbac59815ea43811fffa205e66306";

  // === UI State ===
  isModalOpen = false;
  isInfoModalOpen = false;
  isRegistrationFormOpen = false;
  isQRModalOpen = false;
  isZoomOpen = false;

  // NEW: distinguish reservation (no payment) vs normal registration
  isReserveFlow = false;

  selectedRetreat = "";
  formData = {
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    wantsToPay: false,
  };

  constructor(
    private http: HttpClient,
    private location: Location,
    private sanitizer: DomSanitizer,
    private ath: AthMovilService
  ) {}

  // ======== DATA (unchanged list) ========
  retreats = [
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

  // ======== UI actions ========
  openModal(retreatName: string) {
    this.selectedRetreat = retreatName;
    this.isInfoModalOpen = false;
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  openZoomModal() {
    this.isZoomOpen = true;
    history.pushState(null, "");
  }
  closeZoomModal() {
    this.isZoomOpen = false;
    if (history.state !== null) this.location.back();
  }
  @HostListener("window:popstate", ["$event"]) onPopState() {
    if (this.isZoomOpen) this.isZoomOpen = false;
  }

  openInfoModal(retreatName: string) {
    this.selectedRetreat = retreatName;
    this.isReserveFlow = false;
    this.isInfoModalOpen = true;
  }
  closeInfoModal() {
    this.isInfoModalOpen = false;
  }

  isFutureDate(monthName: string, dateRange: string): boolean {
    const today = new Date();
    const year = 2025;
    const monthMap: { [k: string]: number } = {
      Enero: 0,
      Febrero: 1,
      Marzo: 2,
      Abril: 3,
      Mayo: 4,
      Junio: 5,
      Julio: 6,
      Agosto: 7,
      Septiembre: 8,
      Octubre: 9,
      Noviembre: 10,
      Diciembre: 11,
    };
    const days = dateRange.match(/\d+/g);
    if (!days?.length) return true;
    const firstDay = parseInt(days[0], 10);
    const month = monthMap[monthName];
    const start = new Date(year, month, firstDay);
    const deadline = new Date(start);
    deadline.setDate(start.getDate() - 2);
    return today <= deadline;
  }

  // Normal registration (may pay)
  openRegistrationForm(retreatName: string) {
    this.selectedRetreat = retreatName;
    this.isReserveFlow = false;
    this.isRegistrationFormOpen = true;
    this.isInfoModalOpen = false;
  }

  // NEW: Reservation (no payment)
  openReserveForm(monthName: string, dateRange: string) {
    this.selectedRetreat = `Reservar para ${monthName.toLowerCase()} ${dateRange}`;
    this.isReserveFlow = true;
    this.formData.wantsToPay = false; // force No
    this.isRegistrationFormOpen = true;
    this.isInfoModalOpen = false;
  }

  closeRegistrationForm() {
    this.isRegistrationFormOpen = false;
  }

  // ======== Helpers ========
  private resetForm() {
    this.formData = {
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      wantsToPay: false,
    };
  }
  private isMobile(): boolean {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

  private sendToGoogleForm(p: {
    retreat: string;
    firstName: string;
    lastName: string;
    age: string;
    phone: string;
    wantsToPay: boolean;
    price: string;
  }): Promise<void> {
    const fd = new FormData();
    fd.append(this.ENTRY_RETIRO, p.retreat);
    fd.append(this.ENTRY_NOMBRE, p.firstName);
    fd.append(this.ENTRY_APELLIDO, p.lastName);
    fd.append(this.ENTRY_EDAD, p.age);
    fd.append(this.ENTRY_TELEFONO, p.phone);
    fd.append(this.ENTRY_PAGARA, p.wantsToPay ? "Si" : "No"); // exact values
    fd.append(this.ENTRY_PRECIO, p.price);

    return fetch(this.FORM_ACTION, {
      method: "POST",
      mode: "no-cors",
      body: fd,
    }).then(() => undefined);
  }

  // ======== Submit (works for both flows) ========
  submitForm() {
    const payload = {
      retreat: this.selectedRetreat,
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      age: this.formData.age,
      phone: this.formData.phone,
      wantsToPay: this.isReserveFlow ? false : this.formData.wantsToPay, // reservation => No
      price: this.getRetreatPrice(this.selectedRetreat),
    };

    this.sendToGoogleForm(payload)
      .then(() => {
        if (!this.isReserveFlow && this.formData.wantsToPay) {
          if (this.isMobile()) {
            window.location.href = this.ATH_LINK; // mobile → open ATH
          } else {
            this.isQRModalOpen = true; // desktop → show QR
          }
        } else {
          alert("Solicitud enviada ✅");
          this.closeRegistrationForm();
          this.resetForm();
        }
      })
      .catch((err) => {
        console.error(err);
        alert("No se pudo enviar. Intenta nuevamente.");
      });
  }

  // ======== Content helpers ========
  getRetreatDescription(name: string): string {
    const map: Record<string, string> = {
      "Sanación en Pentecostés": "Un retiro para renovar tu fe en Pentecostés.",
      "Retiro para hombres":
        "Un encuentro de crecimiento personal y espiritual para hombres.",
      "Todo Incluido para Jóvenes":
        "Retiro especial para jóvenes con actividades dinámicas y espirituales.",
    };
    return map[name] || "Retiro espiritual en Casa Manresa.";
  }
  getFoodInfo(name: string): string {
    return name === "Todo Incluido para Jóvenes" ? "Snacks" : "Almuerzo y Cena";
  }
  getRetreatPrice(name: string): string {
    return name === "Todo Incluido para Jóvenes" ? "80" : "90";
  }
  getRetreatVideo(name: string): SafeResourceUrl | null {
    const vids: Record<string, string> = {
      "Sanación en Pentecostés":
        "https://www.youtube.com/embed/7dXsZHMJWVM?si=3QQYjrEtorNyp8Wr",
      "Todo Incluido para Jóvenes": "https://www.youtube.com/embed/VIDEO_ID_2",
    };
    return vids[name]
      ? this.sanitizer.bypassSecurityTrustResourceUrl(vids[name])
      : null;
  }

  // (still available if you want to keep linking to a separate form)
  getGoogleFormUrl(
    activityName: string,
    monthName: string,
    dateRange: string
  ): string {
    const baseUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc4h-aFiOB8Z-WZ0_GGtib_60lBOGoHQCWHLAFnMA6TUAt9iw/viewform?usp=pp_url";
    const fieldId = "entry.1855857392";
    let label = activityName.trim();
    if (label.toUpperCase() === "DISPONIBLE") {
      label = `Reservar para ${monthName.toLowerCase()} ${dateRange}`;
    }
    return `${baseUrl}&${fieldId}=${encodeURIComponent(label)}`;
  }
}
