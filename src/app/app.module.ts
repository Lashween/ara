import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { LoginModule } from './auth/login/login.module';
import { NavModule } from './nav/nav.module';
import { AboutComponent } from './about/about.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [AppComponent, AboutComponent, ReviewsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    NavModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
