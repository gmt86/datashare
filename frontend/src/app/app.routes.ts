import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { EspacePersonnelLayoutComponent } from './pages/espace-personnel-layout/espace-personnel-layout.component';

/**
 * Configuration des routes de l'application DataShare.
 */
export const routes: Routes = [

  // Routes avec layout standard (header + footer + gradient)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
      { path: 'download/:token', loadComponent: () => import('./pages/download/download.component').then(m => m.DownloadComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Routes avec layout espace personnel (sidebar + contenu)
  {
    path: '',
    component: EspacePersonnelLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'espace-personnel',
        loadComponent: () => import('./pages/espace-personnel/espace-personnel.component').then(m => m.EspacePersonnelComponent)
      }
    ]
  },

  // Wildcard
  { path: '**', redirectTo: 'home' }
];