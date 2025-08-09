import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AthMovilService } from '../../services/ath-movil.service';

@Component({
  selector: 'app-retreats',
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './retreats.component.html',
  styleUrl: './retreats.component.scss',
})
export class RetreatsComponent {
  isModalOpen = false; // Registration Modal (existing)
  isInfoModalOpen = false;

  selectedRetreat = '';
  formData = {
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    wantsToPay: false,
  };

  constructor(
    private http: HttpClient,
    private location: Location,
    private sanitizer: DomSanitizer,
    private ath: AthMovilService

  ) {
    // Initialize 'ath' here if needed, e.g., by assigning a service or object
    // The AthMovilService is already injected via the constructor, no need for manual initialization
  }

  // Full list of retreats
  retreats = [
    {
      name: 'Enero',
      activities: [
        { date: '3–5', name: 'CERRADO' },
        { date: '10–12', name: 'CERRADO' },
        { date: '17–19', name: 'Lazos de Amor Mariano' },
        {
          date: '24–26',
          name: 'Encuentro con Jesús + Las Moradas del Castillo interior, Santa Teresa de Jesús (P. Y. Reyes)',
        },
        { date: '26', name: 'Jornada de Auxiliares' },
      ],
    },
    {
      name: 'Febrero',
      activities: [
        { date: '31 ene–2', name: 'RESERVADA' },
        { date: '7–9', name: 'RESERVADA' },
        {
          date: '14–16',
          name: 'Diálogo Matrimonial I y Taller de novios (Seguimiento: 23 de febrero)',
        },
        {
          date: '21–23',
          name: 'Introducción a los Ejercicios Espirituales de San Ignacio (P. M. Gaudio)',
        },
        { date: '24–28', name: 'RESERVADA' },
      ],
    },
    {
      name: 'Marzo',
      activities: [
        { date: '28 feb–2', name: 'RESERVADA' },
        { date: '7–9', name: 'RESERVADA' },
        { date: '14–16', name: 'Sanación en Cuaresma' },
        { date: '21–23', name: 'RESERVADA' },
        { date: '28–30', name: 'RESERVADA' },
      ],
    },
    {
      name: 'Abril',
      activities: [
        { date: '4–6', name: 'Todo Incluido para Jóvenes' },
        {
          date: '11–13',
          name: 'Diálogo Matrimonial I y Reencuentro Matrimonial + Taller de novios (Seguimiento: 27 de abril)',
        },
        { date: '14–20', name: 'Semana Santa (con Parroquia San José)' },
        { date: '25–27', name: 'Encontrando tu luz interior con Cristo' },
      ],
    },
    {
      name: 'Mayo',
      activities: [
        { date: '9–11', name: 'RESERVADA' },
        { date: '16–18', name: 'DISPONIBLE' },
        { date: '23–25', name: 'Sanación en Pentecostés' },
        {
          date: '30 mayo–1 junio',
          name: 'Diálogo Matrimonial I y Taller de novios',
        },
      ],
    },
    {
      name: 'Junio',
      activities: [
        { date: '6–8', name: 'DISPONIBLE' },
        { date: '13–15', name: 'DISPONIBLE' },
        { date: '20–22', name: 'Retiro para hombres' },
        { date: '27–29', name: 'DISPONIBLE' },
      ],
    },
    {
      name: 'Julio',
      activities: [{ date: '', name: 'CERRADO' }],
    },
    {
      name: 'Agosto',
      activities: [
        {
          date: '1–3',
          name: 'Diálogo Matrimonial I y II + Reencuentro Matrimonial',
        },
        {
          date: '3–8',
          name: 'Ejercicios Espirituales Semana de profundización: método Ignaciano (P. Miguel Gaudio)',
        },
        { date: '8–10', name: 'DISPONIBLE' },
        { date: '15–17', name: 'DISPONIBLE' },
        {
          date: '22–24',
          name: 'Conoce tu fe (dirigido a líderes parroquiales)',
        },
        { date: '29 ago–1 sept', name: 'RESERVADA' },
      ],
    },
    {
      name: 'Septiembre',
      activities: [
        { date: '5–7', name: 'DISPONIBLE' },
        { date: '12–14', name: 'La Divina Misericordia' },
        { date: '19–21', name: 'Divorciados en nueva unión' },
        {
          date: '26–28',
          name: 'Un recorrido por las Escuelas de espiritualidad (P. Y. Reyes)',
        },
      ],
    },
    {
      name: 'Octubre',
      activities: [
        {
          date: '3–5',
          name: 'Ejercicios Espirituales Parte II: método Ignaciano (P. M. Gaudio) + Retiro para Auxiliares',
        },
        { date: '10–12', name: 'DISPONIBLE' },
        {
          date: '17–19',
          name: 'Diálogo Matrimonial I y Taller de novios (Seguimiento: 26 de octubre)',
        },
        { date: '24–26', name: 'DISPONIBLE' },
      ],
    },
    {
      name: 'Noviembre',
      activities: [
        { date: '31 oct–2', name: 'DISPONIBLE' },
        { date: '7–9', name: 'DISPONIBLE' },
        { date: '14–16', name: 'Todo Incluido para Jóvenes' },
        {
          date: '21–23',
          name: 'Retiro para mujeres + Encontrando tu luz interior con Cristo',
        },
        { date: '28–30', name: 'DISPONIBLE' },
      ],
    },
    {
      name: 'Diciembre',
      activities: [
        {
          date: '5–7',
          name: 'Diálogo Matrimonial I + Reencuentro Matrimonial + Taller de novios',
        },
        { date: '12–14', name: 'Sanación en Adviento' },
        { date: '19–21', name: 'DISPONIBLE' },
        { date: '27–29', name: 'Navidad Juvenil' },
      ],
    },
  ];

  openModal(retreatName: string) {
    this.selectedRetreat = retreatName;
    this.isInfoModalOpen = false;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.formData = {
      firstName: '',
      lastName: '',
      age: '',
      phone: '',
      wantsToPay: false,
    };
  }

  isZoomOpen = false;

  openZoomModal() {
    this.isZoomOpen = true;
    history.pushState(null, '');
  }

  closeZoomModal() {
    this.isZoomOpen = false;
    // Go back one step in history
    if (history.state !== null) {
      this.location.back();
    }
  }

  enviarPago() {
    const payload = {
      amount: +this.getRetreatPrice(this.selectedRetreat),
      metadata1: `Retiro ${this.selectedRetreat}`,
      metadata2: 'Casa Manresa',
      description: `Inscripción a retiro ${this.selectedRetreat}`,
      phoneNumber: this.formData.phone   // ATH Móvil del participante
    };

    this.ath.createPayment(payload).subscribe({
      next: ({ ecommerceId }) => {
        // Redirige al esquema ATH Móvil para que el usuario confirme la transacción
        window.location.href = `athm://pay?ecommerceId=${ecommerceId}`;
        // Aquí podrías abrir un modal “Esperando confirmación…” y hacer polling
      },
      error: err => {
        console.error(err);
        alert('No se pudo iniciar el pago con ATH Móvil.');
      }
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.isZoomOpen) {
      this.isZoomOpen = false;
    }
  }

  submitForm() {
    const data = { retreat: this.selectedRetreat, ...this.formData };
    console.log('Formulario enviado:', data);

    if (this.formData.wantsToPay) {
      this.enviarPago();           // ⚙️ llama al nuevo método
    }

    this.closeModal();
  }
    

  getGoogleFormUrl(
    activityName: string,
    monthName: string,
    dateRange: string
  ): string {
    const baseUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSc4h-aFiOB8Z-WZ0_GGtib_60lBOGoHQCWHLAFnMA6TUAt9iw/viewform?usp=pp_url';
    const fieldId = 'entry.1855857392';
    let label = activityName.trim();
    if (label.toUpperCase() === 'DISPONIBLE') {
      label = `Reservar para ${monthName.toLowerCase()} ${dateRange}`;
    }

    const encoded = encodeURIComponent(label);
    return `${baseUrl}&${fieldId}=${encoded}`;
  }

  isRegistrationFormOpen = false;

  openRegistrationForm(retreatName: string) {
    this.selectedRetreat = retreatName;
    this.isRegistrationFormOpen = true;
    this.isInfoModalOpen = false;
  }

  closeRegistrationForm() {
    this.isRegistrationFormOpen = false;
  }

  isFutureDate(monthName: string, dateRange: string): boolean {
    const today = new Date();
    const year = 2025; // Fixed year for the calendar
    const monthMap: { [key: string]: number } = {
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
    if (!days || days.length === 0) return true;

    const firstDay = parseInt(days[0]); // FIRST DAY now, not last day!
    const month = monthMap[monthName];

    // Build the start date
    const retreatStartDate = new Date(year, month, firstDay);

    // Allow registration until 2 days before
    const registrationDeadline = new Date(retreatStartDate);
    registrationDeadline.setDate(retreatStartDate.getDate() - 2);

    return today <= registrationDeadline;
  }

  openInfoModal(retreatName: string) {
    this.selectedRetreat = retreatName;
    this.isInfoModalOpen = true;
  }

  closeInfoModal() {
    this.isInfoModalOpen = false;
  }

  getRetreatDescription(name: string): string {
    const descriptions: { [key: string]: string } = {
      'Sanación en Pentecostés': 'Un retiro para renovar tu fe en Pentecostés.',
      'Retiro para hombres':
        'Un encuentro de crecimiento personal y espiritual para hombres.',
      'Todo Incluido para Jóvenes':
        'Retiro especial para jóvenes con actividades dinámicas y espirituales.',
      // Add more retreat-specific descriptions here if you want
    };

    return descriptions[name] || 'Retiro espiritual en Casa Manresa.';
  }

  getFoodInfo(name: string): string {
    // Assume all retreats include meals unless specified otherwise
    if (name === 'Todo Incluido para Jóvenes') {
      return 'Snacks';
    } else {
      return 'Almuerzo y Cena';
    }
  }

  getRetreatPrice(name: string): string {
    if (name === 'Todo Incluido para Jóvenes') {
      return '80';
    } else {
      return '90';
    }
  }

  getRetreatVideo(name: string): SafeResourceUrl | null {
    const videos: { [key: string]: string } = {
      'Sanación en Pentecostés':
        'https://www.youtube.com/embed/7dXsZHMJWVM?si=3QQYjrEtorNyp8Wr',
      'Todo Incluido para Jóvenes': 'https://www.youtube.com/embed/VIDEO_ID_2',
      // Add more retreat names with their YouTube embedded links
    };

    if (videos[name]) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(videos[name]);
    }
    return null;
  }


  /** Método para probar CORS con el backend */
testCors() {
  fetch('https://manresa-backend.onrender.com/api/cors-check')
    .then(r => {
      if (!r.ok) throw new Error(`Status ${r.status}`);
      return r.json();
    })
    .then(data => {
      console.log('✔️ CORS OK:', data);
      alert(`Backend dice: ${data.message}`);
    })
    .catch(e => {
      console.error('❌ Error CORS:', e);
      alert(`Error de CORS o ruta: ${e.message}`);
    });
}

}
