import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selector';
import { loginAction, logoutAction } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router,
      private store: Store<AppState>) {

    }

    ngOnInit() {

      //this is so that on each refresh, if local storage contains a user profile, we will dispatch
      //an action to get the user profile back into the store and stay logged in since
      //the stores data will not last through a refresh
      const userProfile = localStorage.getItem('user');
      if(userProfile){
        this.store.dispatch(loginAction({user: JSON.parse(userProfile)}))
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });
      
      //These observables are made true or false based on wheter or not the data store contains user credentials or not
      this.isLoggedIn$ = this.store
        .pipe(
          //two exclamations means if following statement is true set to true else then false
          //using select instead of map will eliminate sending the same value over and over again 
          //map(state => !!state["auth"].user)
          //select only repeats calc of output if input changes and removes and duplicates passed to view
          select(isLoggedIn)

        );
      this.isLoggedOut$ = this.store
          .pipe(
            //select(state => !state['auth'].user)
            select(isLoggedOut)
          );

    }

    logout() {
      this.store.dispatch(logoutAction())
    }

}
