import { AuthInterceptor } from './Interceptors/http.interceptor';
import { TokenService } from './token.service';
import { UserService } from './user/user.service';
import { SearchPipe } from './search-pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetService } from './pets/pet.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PetProfilComponent } from './pets/pet-profil/pet-profil.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { CreatePetComponent } from './pets/create-pet/create-pet.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SearchPipe,
    PetProfilComponent,
    PetListComponent,
    CreatePetComponent,
    CreateUserComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
providers: [
    PetService,
    UserService,
    TokenService,
    AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
