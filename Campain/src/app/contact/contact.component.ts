import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = new FormGroup({
      firstName:new FormControl ('', Validators.required),
      lastName:new FormControl ("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      message:new FormControl ('', Validators.required)
    });

  
  }

  onSubmit() {
    // Handle the form submission here
    if (this.contactForm.valid) {
      // Perform contact processing logic
      console.log('Contact form submitted successfully');
      console.log(this.contactForm.value);
    } else {
      // Handle invalid form submission
      console.log('Invalid form submission');
    }
  }
}

