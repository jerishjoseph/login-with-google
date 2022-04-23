import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1033223641183-qs8ek79s1l9g1fspugiuare6embnip75.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}