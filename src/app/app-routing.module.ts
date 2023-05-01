import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddDataComponent } from './components/add-data/add-data.component';

const routes: Routes = [  
  {path: '', redirectTo: 'home-page',pathMatch: 'full'},
  { path: 'home-page', component: HomePageComponent },
  { path: 'add-data', component: AddDataComponent },
  { path: 'update/:id', component: AddDataComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
