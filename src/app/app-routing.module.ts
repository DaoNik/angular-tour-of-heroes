import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { FocusComponent } from './focus/focus.component';
import { HeroFormComponent } from './hero-form/hero-form/hero-form.component';
import { bookRoutes } from './book/book-routing.module';
import { FormComponentComponent } from './form-component/form-component.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard]},
  {path: 'focus', component: FocusComponent, canActivate: [AuthGuard]},
  {path: 'form', component: HeroFormComponent, canActivate: [AuthGuard]},
  {path: 'book', children: [...bookRoutes], canActivate: [AuthGuard]},
  {path: 'form-component',
  component: FormComponentComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
