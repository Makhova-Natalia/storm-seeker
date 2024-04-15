import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent:
      () => import('./features/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'favorites',
    loadComponent:
      () => import('./features/favorites/favorites.component').then((c) => c.FavoritesComponent)
  }
];
