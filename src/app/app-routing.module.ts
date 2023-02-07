import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { EditarEducacionComponent } from './components/editar/editar-educacion/editar-educacion.component';
import { EditarHabilidadComponent } from './components/editar/editar-habilidad/editar-habilidad.component';
import { EditarPersonaComponent } from './components/editar/editar-persona/editar-persona.component';
import { EditarProyectoComponent } from './components/editar/editar-proyecto/editar-proyecto.component';
import { EditarRedesComponent } from './components/editar/editar-redes/editar-redes.component';
import { EditarTrabajoComponent } from './components/editar/editar-trabajo/editar-trabajo.component';
import { LoginComponent } from './components/login/login.component';
import { EducacionComponent } from './components/sections/educacion/educacion.component';
import { HabilidadComponent } from './components/sections/habilidad/habilidad.component';
import { ProyectoComponent } from './components/sections/proyecto/proyecto.component';
import { TrabajoComponent } from './components/sections/trabajo/trabajo.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: PortfolioComponent,
    children: [
      { path: '', component: ProyectoComponent },
      { path: 'trabajo', component: TrabajoComponent },
      { path: 'educacion', component: EducacionComponent },
      { path: 'habilidad', component: HabilidadComponent },
    ]
  },
  { path: 'editar/proyecto/:id', component: EditarProyectoComponent, canActivate: [GuardGuard] },
  { path: 'editar/habilidad/:id', component: EditarHabilidadComponent, canActivate: [GuardGuard] },
  { path: 'editar/trabajo/:id', component: EditarTrabajoComponent, canActivate: [GuardGuard] },
  { path: 'editar/educacion/:id', component: EditarEducacionComponent, canActivate: [GuardGuard] },
  { path: 'editar/redes', component: EditarRedesComponent, canActivate: [GuardGuard] },
  { path: 'editar/usuario', component: EditarPersonaComponent, canActivate: [GuardGuard] },
  { path: 'editar/usuario/:img', component: EditarPersonaComponent, canActivate: [GuardGuard] },
  { path: 'nuevo/proyecto', component: EditarProyectoComponent, canActivate: [GuardGuard] },
  { path: 'nuevo/trabajo', component: EditarTrabajoComponent, canActivate: [GuardGuard] },
  { path: 'nuevo/educacion', component: EditarEducacionComponent, canActivate: [GuardGuard] },
  { path: 'nuevo/habilidad', component: EditarHabilidadComponent, canActivate: [GuardGuard] },
  { path: 'contacto', component: ContactFormComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
