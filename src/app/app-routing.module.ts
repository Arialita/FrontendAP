import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EducacionComponent } from './components/sections/educacion/educacion.component';
import { HabilidadComponent } from './components/sections/habilidad/habilidad.component';
import { ProyectoComponent } from './components/sections/proyecto/proyecto.component';
import { TrabajoComponent } from './components/sections/trabajo/trabajo.component';

const routes: Routes = [
  {path:'home', component: TrabajoComponent},
  {path:'educacion', component: EducacionComponent},
  {path:'proyectos', component: ProyectoComponent},
  {path:'habilidades', component: HabilidadComponent},
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
