import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

//NGRX entity pack makes it simple to store our entities in the store using entity format containing 
//a dictionary of entities stored by there ID and a seperate array that defines the natural entity order.
export interface CourseState extends EntityState<Course>{
    allCoursesLoaded: boolean
}

//makes it easier for us to do crud opertaions to data in our store
export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
    //use this to tell adapter what the id field is if it isn't id
    //selectId: course => course.courseId
});

//add flag all courses loaded initial state as false
export const initialCoursesState = adapter.getInitialState({allCoursesLoaded:false});

export const coursesReducer = createReducer(
    initialCoursesState, 
    //on all courses loaded action
    on(CourseActions.allCoursesLoaded,
        //use the adapters set all method to set the course state data to our courses fetched from the server, then mark coursesLoaded as true
        (state, action) => adapter.setAll(action.courses, {...state, allCoursesLoaded: true})),
    on(CourseActions.courseUpdated,
        (state, action) => adapter.updateOne(action.update, state))
    
);

//exporting this selectAll so that we can get all courses in our selector class
export const {selectAll} = adapter.getSelectors();
