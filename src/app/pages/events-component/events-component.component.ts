import { NgIf, NgFor } from "@angular/common";
import { Component, HostListener } from "@angular/core";

type EventPhoto = {
  src: string; // e.g. 'assets/events/caminalo/01.jpg'
  alt?: string;
};

type Activity = {
  date: string;
  name: string;
  photos?: EventPhoto[];
};

type EventMonth = {
  name: string;
  activities: Activity[];
};

@Component({
  selector: "app-events-component",
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: "./events-component.component.html",
  styleUrl: "./events-component.component.scss",
})
export class EventsComponent {
  // ===== Top calendar zoom =====
  isZoomOpen = false;

  // ===== Activity gallery modal =====
  isGalleryOpen = false;
  gallery: EventPhoto[] = [];
  currentIndex = 0;

  // ===== Data (edit paths to your real images) =====
  events: EventMonth[] = [
    {
      name: "Abril",
      activities: [
        {
          date: "6",
          name: "¡Cáminalo por Manresa!",
        },
      ],
    },

    {
      name: "Agosto",
      activities: [
        {
          date: "17",
          name: "Misa de aniversario",
          photos: [
            { src: "assets/aniversario.jpeg", alt: "Misa de aniversario 1" },
          ],
        },
        {
          date: "23",
          name: "Cena bailable",
          photos: [{ src: "assets/cena.jpeg", alt: "Cena bailable 1" }],
        },
      ],
    },
    {
      name: "Octubre - Noviembre",
      activities: [
        {
          date: "21 oct - 3 nov",
          name: "Crucero Peregrinación",
          photos: [
            { src: "assets/crucero.jpeg", alt: "Crucero Peregrinación 1" },
          ],
        },
      ],
    },
    {
      name: "Diciembre",
      activities: [
        {
          date: "27 dic - 6 ene 2026",
          name: "Manresa iluminada en Navidad",
        },
      ],
    },
  ];

  // ===== Top calendar image zoom =====
  openZoomModal() {
    this.isZoomOpen = true;
    history.pushState({ zoom: true }, "");
  }
  closeZoomModal() {
    this.isZoomOpen = false;
    history.back();
  }

  // ===== Activity gallery =====
  openGallery(photos: EventPhoto[], startIndex = 0) {
    if (!photos?.length) return;
    this.gallery = photos;
    this.currentIndex = Math.max(0, Math.min(startIndex, photos.length - 1));
    this.isGalleryOpen = true;
    history.pushState({ gallery: true }, "");
  }
  closeGallery() {
    this.isGalleryOpen = false;
    this.gallery = [];
    this.currentIndex = 0;
    history.back();
  }

  prev() {
    if (!this.gallery.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.gallery.length) % this.gallery.length;
  }
  next() {
    if (!this.gallery.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.gallery.length;
  }

  // ===== Browser back button handling =====
  @HostListener("window:popstate", ["$event"])
  onPopState(event: PopStateEvent) {
    if (this.isGalleryOpen) {
      this.isGalleryOpen = false;
      this.gallery = [];
      this.currentIndex = 0;
      event.preventDefault();
    } else if (this.isZoomOpen) {
      this.isZoomOpen = false;
      event.preventDefault();
    }
  }
}
