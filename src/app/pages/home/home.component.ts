import { Component } from '@angular/core';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { BodyComponent } from '../../shared/components/body/body.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
}
