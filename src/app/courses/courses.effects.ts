import { CoursesHttpService } from './services/courses-http.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { allCoursesLoaded } from './course.action';
import {concatMap, map} from 'rxjs/operators';

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            //ensures that we only send 1 request at a time to the backend, gets all courses from our courses service
            concatMap(action => this.coursesHttpService.findAllCourses()),
            //maps the courses that we get from concat map to allCoursesLoaded action
            map(courses => allCoursesLoaded({courses}))
        )
    )

    saveCourse$ = createEffect(
        () => this.actions$.pipe(
            //recognizes all actions of type courseUpdated
            ofType(CourseActions.courseUpdated),
            //then uses the http service and passes in the 2 args, the items id and changes 
            concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
        ),
        //no action dispatched so we must add dispatch: false to compile code
        {dispatch: false}
    )

    constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService){

    }
}