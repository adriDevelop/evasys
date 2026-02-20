import { Routes } from '@angular/router';
import { Login } from './pages/content/login/login';
import { ErrorComponent } from './shared/components/error-component/error-component';

export const routes: Routes = [
  { path: '', component: Login },
  {
    path: 'empleados',
    loadChildren: () => import('./pages/content/content.routes').then((r) => r.CONTENT_ROUTES),
  },
  { path: '**', component: ErrorComponent },
];
