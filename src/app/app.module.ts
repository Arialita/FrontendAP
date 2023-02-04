import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { EditarProyectoComponent } from './components/editar/editar-proyecto/editar-proyecto.component';
import { EditarHabilidadComponent } from './components/editar/editar-habilidad/editar-habilidad.component';
import { InterceptorService } from './services/interceptor.service';
import { EditarTrabajoComponent } from './components/editar/editar-trabajo/editar-trabajo.component';
import { DatePipe } from '@angular/common';
import { EditarEducacionComponent } from './components/editar/editar-educacion/editar-educacion.component';

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
    FooterComponent,
    LoginComponent,
    PortfolioComponent,
    EditarProyectoComponent,
    EditarHabilidadComponent,
    EditarTrabajoComponent,
    EditarEducacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
