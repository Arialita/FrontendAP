import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { EditarEducacionComponent } from './components/editar/editar-educacion/editar-educacion.component';
import { EditarHabilidadComponent } from './components/editar/editar-habilidad/editar-habilidad.component';
import { EditarPersonaComponent } from './components/editar/editar-persona/editar-persona.component';
import { EditarProyectoComponent } from './components/editar/editar-proyecto/editar-proyecto.component';
import { EditarTrabajoComponent } from './components/editar/editar-trabajo/editar-trabajo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EducacionComponent } from './components/sections/educacion/educacion.component';
import { HabilidadComponent } from './components/sections/habilidad/habilidad.component';
import { ProyectoComponent } from './components/sections/proyecto/proyecto.component';
import { TrabajoComponent } from './components/sections/trabajo/trabajo.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { InterceptorService } from './services/interceptor.service';
import { EditarRedesComponent } from './components/editar/editar-redes/editar-redes.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrabajoComponent,
    EducacionComponent,
    ProyectoComponent,
    HabilidadComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PortfolioComponent,
    EditarProyectoComponent,
    EditarHabilidadComponent,
    EditarTrabajoComponent,
    EditarEducacionComponent,
    EditarPersonaComponent,
    EditarRedesComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
