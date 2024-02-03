import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export const loadAllCourses = createAction(
    // [origin of action] what happens
    "[Courses Resolver] Load All Courses"
)

//load all courses is called and then all courses loaded is called as a side effect
export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded",
  //payload that the action contains
  props<{courses: Course[]}>()
);

export const courseUpdated = createAction(
  "[Edit Course Dialog] Course Updated",
  props<{update: Update<Course>}>()
)