import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./reducers/course.reducers";

import * as fromCourses from './reducers/course.reducers';

export const selectCoursesState = createFeatureSelector<CourseState>("courses");

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

//gets courses state, and returns true if allCoursesLoaded is true false otherwise
export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
)