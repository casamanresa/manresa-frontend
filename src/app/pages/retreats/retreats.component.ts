import { CommonModule, NgIf } from "@angular/common";
import { Component, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Location } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { AthMovilService } from "../../services/ath-movil.service";
import { RETREATS, RetreatMonth } from "./retreats.data";

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
  retreats: RetreatMonth[] = RETREATS;

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
  isReserveFlow = false;
  isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

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
          if (this.isMobile) {
            alert(
              `Antes de completar el pago en ATH Móvil, por favor escribe en el mensaje: "${this.selectedRetreat}"`
            );
            window.location.href = this.ATH_LINK;
          } else {
            this.isQRModalOpen = true;
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
