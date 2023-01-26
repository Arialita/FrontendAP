import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EducacionComponent } from './components/sections/educacion/educacion.component';
import { HabilidadComponent } from './components/sections/habilidad/habilidad.component';
import { ProyectoComponent } from './components/sections/proyecto/proyecto.component';
import { TrabajoComponent } from './components/sections/trabajo/trabajo.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {
    path:'home',
    component: PortfolioComponent,
    children:[
      {path:'', component:ProyectoComponent},
      {path:'trabajo', component: TrabajoComponent},
      {path:'educacion', component: EducacionComponent},
      {path:'habilidades', component: HabilidadComponent}]
  },
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
