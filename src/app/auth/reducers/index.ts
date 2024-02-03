import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
}

// export const reducers: ActionReducerMap<AuthState> = {
// };
//export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];

export const authReducer = createReducer(
  //have to send inital state
  initialAuthState,
  //use ngrx store on method tell store that on authactions.login take a state and action,
  // then modify by returning a new state with the actions update info
  on(AuthActions.loginAction, (state, action) => {
    return {
      user:action.user
    }
  }),
  on(AuthActions.logoutAction, (state, action) => {
    return {
      //use null to keep user in state but set to null, undefined removes user from state altogether
      user: undefined
    }
  })

);