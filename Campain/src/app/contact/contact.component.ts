import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactService } from '../Services/contact.service';
//import { Contact } from '../Classes/otherObject/contact';
//import{Contact}from '../Classes/otherObject/contact';
//import{Contact}from'../Classes/otherObject/contact';
import{Contact1}from '../Classes/otherObject/Contact1';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  contact:Contact1={
    firstName:'',
    lastName:'',
    email:'',
    message:''
  };

  constructor(private fb: FormBuilder, private http: HttpClient,private contactService:ContactService) {
    this.contactForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
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
//   this.contact= {
    //   firstName:this.contactForm.get('firstName')!=null?this.contactForm.get('firstName').value: "",
    //   lastName: "",
    //   email:"",
    //   message:""
    // };
    

   
      this.contactService.sendEmail(this.contact).subscribe
        ({
          next: (success:boolean) => {
           
            console.log(success);
  
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
  }
}