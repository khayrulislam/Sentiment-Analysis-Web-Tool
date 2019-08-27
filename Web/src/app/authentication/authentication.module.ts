import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatCardModule} from '@angular/material/card';
import { RecoveryPassComponent } from './recovery-pass/recovery-pass.component';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [ SignInComponent, SignUpComponent, RecoveryPassComponent, AuthComponent, AccountComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatCardModule
  ]
})
export class AuthenticationModule { }
