import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-retreat-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './retreat-registration.component.html',
})
export class RetreatRegistrationComponent {
  formData = {
    name: '',
    phone: '',
    pagaConAth: false,
  };

  constructor(private http: HttpClient) {}

  submitForm() {
    if (this.formData.pagaConAth) {
      this.http
        .post<{ url: string }>('http://localhost:8000/api/ath-movil/checkout', {
          name: this.formData.name,
          amount: 90,
          description: 'Pago retiro espiritual',
        })
        .subscribe((res) => {
          if (res.url) {
            window.location.href = res.url;
          }
        });
    } else {
      alert('Formulario enviado correctamente sin pago.');
    }
  }
}
