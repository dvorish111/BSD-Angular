import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { ContactComponent } from './contact/contact.component';
import { FamiliesComponent } from './families/families.component';

const routes: Routes = [
 { path: 'logIn',  component: LogInComponent },
 {  path: 'signUp',  component: SignUpComponent },
 {  path: 'home',  component: HomeComponent },
 {  path: 'contact',  component: ContactComponent },
 {  path: 'families',  component: FamiliesComponent },
 {  path: 'admin-interface',  component: AdminInterfaceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
