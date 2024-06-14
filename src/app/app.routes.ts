import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RealizarTestComponent } from './component/realizar-test/realizar-test.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { SpecialistDashboardComponent } from './component/specialist-dashboard/specialist-dashboard.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'realizar-test', component: RealizarTestComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'specialist-dashboard', component: SpecialistDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent}
];

// Exportación de las rutas
export { routes };