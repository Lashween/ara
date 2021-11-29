import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { NavModule } from './nav/nav.module';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [AppComponent, AboutComponent, ReviewsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSnackBarModule,
    NavModule,
    MatIconModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
