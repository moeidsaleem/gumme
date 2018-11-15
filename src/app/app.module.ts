import { SearchPipe } from './../pipes/search/search';

import { AddDealPage } from './../pages/add-deal/add-deal';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { HelperProvider } from '../providers/helper/helper';
import { AuthProvider } from '../providers/auth/auth';


//firestore
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { DirectivesModule } from '../directives/directives.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CategoryPage } from '../pages/category/category';
import { ProfilePage } from '../pages/profile/profile';
import { FavoritePage } from '../pages/favorite/favorite';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MomentModule } from 'angular2-moment';
import { SortPipe } from '../pipes/sort/sort';


// Declartion
@NgModule({
  declarations: [
    MyApp,
    FavoritePage,
    HomePage,
    TabsPage,
    CategoryPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    AddDealPage,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    DirectivesModule,
    MomentModule,
    IonicModule.forRoot(MyApp,{
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAnCvBpgYkw9VEk5imjWuQNv0HNyHRKcMQ",
      authDomain: "gummee-dfa2e.firebaseapp.com",
      databaseURL: "https://gummee-dfa2e.firebaseio.com",
      projectId: "gummee-dfa2e",
      storageBucket: "gummee-dfa2e.appspot.com",
      messagingSenderId: "925797755692"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CategoryPage,
    ProfilePage,
    FavoritePage,
    LoginPage,
    RegisterPage,
    AddDealPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    HelperProvider,
    AuthProvider,
    InAppBrowser,
    AndroidPermissions,
    Camera
  ]
})
export class AppModule {}
