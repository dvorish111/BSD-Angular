import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactService } from '../Services/contact.service';
//import { Contact } from '../Classes/otherObject/contact';
//import{Contact}from '../Classes/otherObject/contact';
//import{Contact}from'../Classes/otherObject/contact';
import{Contact}from '../Classes/OtherObject/Contact';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  contact:Contact={
    firstName:'',
    lastName:'',
    email:'',
    message:''
  };

  constructor(private fb: FormBuilder, private http: HttpClient,private contactService:ContactService, private snackBar: MatSnackBar) {
    this.contactForm = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      message: new FormControl("", Validators.required)
    });


  }

  onSubmit() {
    // Handle the form submission here
    if (this.contactForm.valid) {
      this.sendEmail()
      // Perform contact processing logic
      console.log('Contact form submitted successfully');
      console.log(this.contactForm.value);
    } else {
      // Handle invalid form submission
      console.log('Invalid form submission');
    }
  }


  sendEmail() {
    if (this.contactForm.valid) {
this.contact.firstName=this.contactForm.value.firstName;
this.contact.lastName=this.contactForm.value.lastName;
this.contact.email=this.contactForm.value.email;
this.contact.message=this.contactForm.value.message;

    

   
      this.contactService.sendEmail(this.contact).subscribe
        ({
          next: (success:boolean) => {
           
            console.log(success);
            this.contactForm.reset();
            this.contactForm.markAsUntouched(); // סימון הטופס כלא נגע
            
            // מחיקת הולידציות
            Object.keys(this.contactForm.controls).forEach(key => {
              this.contactForm!.get(key)!.setErrors(null);
            });
            const snackBarRef = this.snackBar.open("Your message has been successfully received! We will make every effort to get back to you promptly. Thank you for reaching out!", 'Close', {
              duration: 5000,
              panelClass: "success-dialog"              
            });   
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
  }




  




}