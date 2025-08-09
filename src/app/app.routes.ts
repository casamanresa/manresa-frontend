import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './shared/news/news.component';
import { RetreatsComponent } from './pages/retreats/retreats.component';
import { RegisterComponent } from './shared/register/register.component';
import { UsersComponent } from './shared/users/users.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventsComponent } from './pages/events-component/events-component.component';
import { RetreatRegistrationComponent } from './retreat-registration/retreat-registration.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre-manresa', component: AboutComponent },
  { path: 'retiros', component: RetreatsComponent },
  { path: 'noticias', component: NewsComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'eventos', component: EventsComponent },
  { path: 'registrarse', component: RetreatRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
