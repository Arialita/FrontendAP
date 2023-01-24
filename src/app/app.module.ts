import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TrabajoComponent } from './components/sections/trabajo/trabajo.component';
import { EducacionComponent } from './components/sections/educacion/educacion.component';
import { ProyectoComponent } from './components/sections/proyecto/proyecto.component';
import { HabilidadComponent } from './components/sections/habilidad/habilidad.component';
import { HeaderComponent } from './components/header/header.component';
import { TabsComponent } from './components/home/tabs/tabs.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrabajoComponent,
    EducacionComponent,
    ProyectoComponent,
    HabilidadComponent,
    TabsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
