import { metaReducers } from './reducers/index';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, isDevMode} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';

import {EffectsModule} from '@ngrx/effects';
import {EntityDataModule} from '@ngrx/data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from './auth/auth.guard';
import { reducers } from './reducers';


const routes: Routes = [
  {
    //we can create modules for components to only load them when a user hits that route
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {
      //metaReducer is processed before normal reducers are
      metaReducers,
      runtimeChecks: {
        //ensures that state never gets mutated
        strictStateImmutability: true,
        //ensures that we do not mutate actions
        strictActionImmutability: true,
        //ensure actions can be saved by devtools to be replayed later on
        strictActionSerializability: true,
        //ensures that state inside the store can be serialized somewhere such as local storage
        strictStateSerializability: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    //Add below to time travel debugger, stores router state (url, paramas, data etc.)
    //under the key router, with the state
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
