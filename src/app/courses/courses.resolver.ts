import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { tap, first, finalize, filter } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.action";
import { areCoursesLoaded } from "./courses.selectors";
   
//this resolver ensures that each time we navigate to courses page, we dispatch the loadAllCoursesAction, which has to be completed in order to load courses page.
    export const CoursesResolver: ResolveFn<any> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<{}> => {
        const store = inject(Store<AppState>);
        let isLoading = false;
        return store.pipe(
            //The select operator is used to select a slice of state (areCoursesLoaded) from the Redux store.
            select(areCoursesLoaded),
            //perform side effects based on the emissions from the areCoursesLoaded observable
            tap(coursesLoaded => {
                if (!isLoading && !coursesLoaded) {
                    isLoading = true;
                    store.dispatch(loadAllCourses());
                }
            }),
            // filters out emissions where coursesLoaded is false
            filter(coursesLoaded => coursesLoaded),
            // used to ensure that the observable doesn't stay open after the initial check for loaded courses.
            first(),
            //ensures that when observable completes, flag is always set back to false.
            finalize(() => (isLoading = false))
        );
    };