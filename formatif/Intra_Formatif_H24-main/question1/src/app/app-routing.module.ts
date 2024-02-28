import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CatComponent} from './cat/cat.component';
import {DogComponent} from './dog/dog.component';
import {isLoggedGuard} from "./is-logged.guard";
import {likeCatGuard} from "./like-cat.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'cat', component: CatComponent, canActivate: [isLoggedGuard, likeCatGuard]},
  {path: 'dog', component: DogComponent,canActivate: [isLoggedGuard]},
  {path: 'home', component: HomeComponent,canActivate: [isLoggedGuard]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]})
export class AppRoutingModule {
}
