import { Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrarEstudianteComponent } from './component/registrar-paciente/registrar-paciente.component';
import { SpecialistDashboardComponent } from './component/specialist-dashboard/specialist-dashboard.component';
import { RegistrarPacienteComponent } from './component/registrar-paciente/registrar-paciente.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'specialist-dashboard', component: SpecialistDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'registrar-paciente', component: RegistrarPacienteComponent}

];

// Exportación de las rutas
export { routes };
