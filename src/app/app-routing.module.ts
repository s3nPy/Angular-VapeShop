import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: HomePageComponent},
    {path: 'catalog', component: CatalogPageComponent, pathMatch: 'full'},
    {path: 'catalog/:id', component: ItemPageComponent},
    {path: 'basket', component: BasketPageComponent},
    {path: 'about', component: AboutPageComponent},
  ]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
