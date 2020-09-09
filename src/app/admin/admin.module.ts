import { AuthInterceptor } from './shared/services/auth.interceptor';
import { AuthGuard } from './shared/services/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Provider } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ItemsPageComponent } from './pages/items-page/items-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component'
import { AuthService } from './shared/services/auth.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchItemsPipe } from './shared/pipes/search-items.pipe';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

const AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

const routes: Routes = [
  {path: '', component: AdminLayoutComponent, children: [
    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'items', component: ItemsPageComponent, canActivate: [AuthGuard]},
    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
    {path: 'edit/:id', component: EditPageComponent, canActivate: [AuthGuard]},
    {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]}
  ]}
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ItemsPageComponent,
    CreatePageComponent,
    SearchItemsPipe,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AUTH_INTERCEPTOR_PROVIDER
  ]
})
export class AdminModule {}
