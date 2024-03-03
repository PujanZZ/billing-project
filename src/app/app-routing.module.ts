import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionExpiredComponent } from './shared/components/session-expired/session-expired.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

/** Main Parent Routes*/
const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', canActivate: [], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', canActivate: [], loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'session-expired', component: SessionExpiredComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
