import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  formSuccess = false;

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    emailjs
      .sendForm(
        'service_xnetjzs', // ✅ Your Service ID
        'template_a92wuwl', // ✅ Your Template ID
        form,
        'R-OBmCZ5TE3vdhJyW' // ✅ Your Public Key
      )
      .then(
        () => {
          this.formSuccess = true;
          form.reset();
          setTimeout(() => (this.formSuccess = false), 4000);
        },
        (error) => {
          console.error('FAILED...', error);
          alert('No se pudo enviar el mensaje. Intenta nuevamente.');
        }
      );
  }
}
