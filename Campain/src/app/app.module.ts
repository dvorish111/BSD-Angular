// import { NgModule } from '@angular/core';
// // import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LogInComponent } from './log-in/log-in.component';
// import { HomeComponent } from './home/home.component';
// import { FamiliesComponent } from './families/families.component';
// import { ContactComponent } from './contact/contact.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { PaymentComponent } from './payment/payment.component';
// import { ShowDonationsComponent } from './show-donations/show-donations.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// // import { FormsModule } from '@angular/forms';
// import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';
// import { NavBarComponent } from './nav-bar/nav-bar.component';
// // import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { AdminFamiliesComponent } from './admin/admin-families/admin-families.component';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { IgxProgressBarModule } from 'igniteui-angular';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// // import { CarouselModule } from 'ngx-owl-carousel-o';
// // import { OwlModule } from 'ngx-owl-carousel';

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { IgxProgressBarModule } from "igniteui-angular";
import { CarouselModule } from "ngx-owl-carousel-o";
import { AdminFamiliesComponent } from "./admin/admin-families/admin-families.component";
import { AdminInterfaceComponent } from "./admin/admin-interface/admin-interface.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactComponent } from "./contact/contact.component";
import { FamiliesComponent } from "./families/families.component";
import { HomeComponent } from "./home/home.component";
import { LogInComponent } from "./log-in/log-in.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { PaymentComponent } from "./payment/payment.component";
import { ShowDonationsComponent } from "./show-donations/show-donations.component";
import { SignUpComponent } from "./sign-up/sign-up.component";


import 'tslib';
import { NewCampaignApprovalComponent } from './admin/new-campaign-approval/new-campaign-approval.component';
import { NewCampaignComponent } from './admin/new-campaign/new-campaign.component';
import { ConfirmPasswordComponent } from './admin/confirm-password/confirm-password.component';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar.component';
import { ExportingDonationsAndContributionsComponent } from './admin/exporting-donations-and-contributions/exporting-donations-and-contributions.component';
import { ExportsDonatedComponent } from './admin/exports-donated/exports-donated.component';
import { DonationsComponent } from './admin/donations/donations.component';
import { AddingDonorsComponent } from './admin/adding-donors/adding-donors.component';
import { UpdateManagerDetailsComponent } from './admin/update-manager-details/update-manager-details.component';
import { AddManagerComponent } from './admin/add-manager/add-manager.component';
import { ChangeDonatedComponent } from './admin/change-donated/change-donated.component';
import { CampaignManagementComponent } from './admin/campaign-management/campaign-management.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import{ErrorPageComponent} from './error-page/error-page.component';
import { DesignOptionsComponent } from './admin/design-options/design-options.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    FamiliesComponent,
    ContactComponent,
    SignUpComponent,
    PaymentComponent,
    ShowDonationsComponent,
    AdminInterfaceComponent,
    NavBarComponent,
    AdminFamiliesComponent,
    NewCampaignApprovalComponent,
    NewCampaignComponent,
    ConfirmPasswordComponent,
    AdminNavBarComponent,
    ExportingDonationsAndContributionsComponent,
    ExportsDonatedComponent,
// <<<<<<< HEAD
    DonationsComponent,
    AddingDonorsComponent,
    UpdateManagerDetailsComponent,
    AddManagerComponent,
    ChangeDonatedComponent,
    CampaignManagementComponent,
// =======
    DonationsComponent ,
FooterComponent,
ErrorPageComponent,
DesignOptionsComponent
// >>>>>>> 3070642922a7eb749ab8af11388148c79ec4fd1c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
     MatButtonModule,
     MatInputModule,
     MatCardModule,
     MatSelectModule,
     MatSnackBarModule,
     MatDialogModule,
     MatButtonToggleModule,
     MatIconModule,
     IgxProgressBarModule,
     CarouselModule,
     RouterModule
    
    
  ],

  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
