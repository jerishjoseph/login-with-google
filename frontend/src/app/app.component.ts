import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      if (this.socialUser) {
        this.http
        .post("http://localhost:3000/save",this.socialUser).subscribe(
          (success) => { console.log(success); },
          (error) => { console.log(error); }
        ); 
      }
    });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
}