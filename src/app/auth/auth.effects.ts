import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthEffects {

    //login observable that omits only login actions through pipe and using of type
    //tap is used to add side effects
    //create effect takes the observable returned by the function and subscribes to it so we
    //don't have to do it manually, create effect also has built in error handling
    login$ = createEffect(() => 
    this.actions$
        .pipe(
            ofType(AuthActions.loginAction),
            tap(action => {
                //using of type allows for type safe usage, since it can only by of type login action
                //compiler knows .user exist
                localStorage.setItem('user', JSON.stringify(action.user))
            })
        ),
        {dispatch: false}
    );

    logout$ = createEffect(() => 
            this.actions$
                .pipe(
                    ofType(AuthActions.logoutAction),
                    tap(action => {
                        localStorage.removeItem('user');
                        this.route.navigateByUrl('/login');
                    })
                ), 
                {dispatch: false}
    );

    constructor(private actions$: Actions, private route: Router){}

}