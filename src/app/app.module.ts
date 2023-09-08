import { ErrorHandler, NgModule, isDevMode } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserModule } from './modules/user/user.module';
import { DurationDirective } from './common/directives/duration.directive';
import { NgxStripeModule } from 'ngx-stripe';
import { ExportAsModule } from 'ngx-export-as';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { FullCalendarModule } from '@fullcalendar/angular'

import { NgApexchartsModule } from 'ng-apexcharts';

import { FilePondModule, registerPlugin } from "ngx-filepond";

import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { environment } from 'src/environments/environment';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ErrorhandlerInterceptor } from './interceptors/errorhandler.interceptor';

const config: SocketIoConfig = { url: environment.domain, options: {} };

@NgModule({
  
  declarations: [
    AppComponent,
    DurationDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    UserModule,
    ExportAsModule,
    FullCalendarModule,
    NgApexchartsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxStripeModule.forRoot('pk_test_51NZz4dSBX5PVkKd6v6YWKJB84R2GTAjasR9N0q51mvtzilANgHlwI9ai9G0Q5JuUb2cC3vvS9l2tsRWKJUj5ecQz00UnHVSInS'),
    FilePondModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorhandlerInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
