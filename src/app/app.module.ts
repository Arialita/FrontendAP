import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TrabajoComponent } from './components/sections/trabajo/trabajo.component';
import { EducacionComponent } from './components/sections/educacion/educacion.component';
import { ProyectoComponent } from './components/sections/proyecto/proyecto.component';
import { HabilidadComponent } from './components/sections/habilidad/habilidad.component';
import { ContactoComponent } from './components/home/contacto/contacto.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrabajoComponent,
    EducacionComponent,
    ProyectoComponent,
    HabilidadComponent,
    ContactoComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
