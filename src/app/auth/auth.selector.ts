import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

//Feature selectors takes the name of the prop we access in the global state <type of state we are getting back>
//this selectAuthState is type safe way of writing     state => state["auth"],
export const selectAuthState = createFeatureSelector<AuthState>("auth")

//memorized function - keeps memory of previous execution and only executes if the inputs of the function have not been calculated before.
//As long as our input state doesn't change then output won't be recalculated
export const isLoggedIn = createSelector(
    //fetches the global app data and then => slice of state from the store we need
    //So access the global app state and taking only auth state
    selectAuthState,
    //takes all the slices of states that we selected so first auth => !!negate.user produces our select
    auth => !!auth.user
);

export const isLoggedOut = createSelector(
    //can combine selectors with create selector
    isLoggedIn,
    //result of applying isLoggedIn to the stores state
    loggedIn => !loggedIn
)