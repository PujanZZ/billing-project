import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    SessionExpiredComponent,
    NavbarComponent,
    SidebarComponent,
    NotFoundComponent,
  ],
  declarations: [SessionExpiredComponent, NavbarComponent, SidebarComponent, NotFoundComponent]
})

export class SharedModule {

  /*** This static forRoot block (provides and configures services) is
  * used in case of when we want use some services in one or more components.
  */
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}

