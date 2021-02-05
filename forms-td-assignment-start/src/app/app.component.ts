import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultSub = 'advance';
  @ViewChild('f') form:NgForm;
  formData = {
    email: '',
    subscription: '',
    password: ''
  }
  submitted = false;

 subscriptionTypes = [
    {name: 'Basic',value: "basic"},
    {name: 'Advanced',value: "advanced"},
    {name: 'Pro', value: "pro"}
  ];


  onSubmit(){
    this.submitted = true;
    this.formData.email = this.form.value.email;
    this.formData.subscription = this.form.value.subscription;
    this.formData.password = this.form.value.password;
    this.form.reset();
  }

}
