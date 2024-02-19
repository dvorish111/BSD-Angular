import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { FamiliesComponent } from './families/families.component';
import { ContactComponent } from './contact/contact.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PaymentComponent } from './payment/payment.component';
import { ShowDonationsComponent } from './show-donations/show-donations.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AdminFamiliesComponent } from './admin-families/admin-families.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IgxProgressBarModule } from 'igniteui-angular';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { OwlModule } from 'ngx-owl-carousel';


import 'tslib';
import { RouterModule } from '@angular/router';

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
    AdminFamiliesComponent 
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
     BrowserAnimationsModule,
     RouterModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
