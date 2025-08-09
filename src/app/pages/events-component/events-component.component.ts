import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-events-component',
  imports: [NgIf],
  templateUrl: './events-component.component.html',
  styleUrl: './events-component.component.scss'
})
export class EventsComponent {
  isZoomOpen = false;

  events = [
    {
      name: 'Abril',
      activities: [{ date: '6', name: '¡Cáminalo por Manresa!' }]
    },
    {
      name: 'Junio',
      activities: [{ date: '29', name: 'Misa de aniversario' }]
    },
    {
      name: 'Agosto',
      activities: [{ date: '23', name: 'Cena bailable' }]
    },
    {
      name: 'Octubre - Noviembre',
      activities: [{ date: '21 oct - 3 nov', name: 'Crucero Peregrinación' }]
    },
    {
      name: 'Diciembre',
      activities: [{ date: '27 dic - 6 ene 2026', name: 'Manresa iluminada en Navidad' }]
    }
  ];

  openZoomModal() {
    this.isZoomOpen = true;
    history.pushState({ zoom: true }, ''); // Push a fake state into the history
  }

  closeZoomModal() {
    this.isZoomOpen = false;
    history.back(); // Go back to previous history state
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    if (this.isZoomOpen) {
      this.isZoomOpen = false;
      event.preventDefault();
    }
  }
}
