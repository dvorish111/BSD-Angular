import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';
import { ContactComponent } from './contact/contact.component';
import { FamiliesComponent } from './families/families.component';
import { PaymentComponent } from './payment/payment.component';
import { NewCampaignComponent } from './admin/new-campaign/new-campaign.component';
import { ExportsDonatedComponent } from './admin/exports-donated/exports-donated.component';
import { DonationsComponent } from './admin/donations/donations.component';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { DonationsComponent } from './admin/donations/donations.component';


const routes: Routes = [
  { path: '',  component: HomeComponent },
 { path: 'logIn',  component: LogInComponent },
 {  path: 'signUp',  component: SignUpComponent },
 {  path: 'home',  component: HomeComponent },
 {  path: 'contact',  component: ContactComponent },
 {  path: 'families',  component: FamiliesComponent },
 {  path: 'payment/:amount',  component: PaymentComponent },
 {  path: 'payment/:donatesId/:amount/:sumDonationsByDonated',  component: PaymentComponent },
 {  path: 'admin-interface/:name',  component: AdminInterfaceComponent },
 

//  {  path: 'admin-interface/:name/new-campain',  component: NewCampaignComponent },

{ path: 'admin-interface/:name', component: AdminInterfaceComponent,
  children: [
    { path: 'new-campain', component: NewCampaignComponent },
    { path: 'donations', component: DonationsComponent },
    { path: 'exports-donated', component: ExportsDonatedComponent },
  ]
},
// { path: '',  component: HomeComponent },
{ path: '**',  component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
