import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { isLoggedIn } from "./auth.selector";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private store: Store<AppState>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> {
        
        //canActivate method returns true if isLoggedIn is true and allows user access
        return this.store.pipe(
            select(isLoggedIn),
            //tap is a side effect that takes loggedIn that we get from select(isLoggedIn) and if loggedIn is not true sends user to login screen
            tap(loggedIn => {
                if(!loggedIn){
                    this.router.navigateByUrl('/login');
                }
            })
        )
    }

}