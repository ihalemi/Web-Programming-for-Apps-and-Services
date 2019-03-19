import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EmployeesComponent } from './employees-component/employees-component';
import { PositionsComponent } from './positions-component/positions-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'employees', component: EmployeesComponent }, 
  { path: 'positions', component: PositionsComponent }, 
  { path: '', redirectTo: "/home", pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
