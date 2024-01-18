import { createAction, props } from "@ngrx/store"
import { User } from "./model/user.model"

export const loginAction = createAction(
    //first define where action is coming from second is the event/command that the action corresponds to
    "[Login Page] User Login",
    props<{user: User}>()
);

export const logoutAction = createAction(
    "[Sidebar] Logout"
);