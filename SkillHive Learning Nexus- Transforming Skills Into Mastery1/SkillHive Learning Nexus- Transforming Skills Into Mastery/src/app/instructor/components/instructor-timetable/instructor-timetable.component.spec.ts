import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-view-assigned-courses',
  templateUrl: './instructor-timetable.component.html',
  styleUrls: ['./instructor-timetable.component.css'],
})
export class ViewAssignedCoursesComponent implements OnInit {
  courses: Course[] = [];
  instructorId = '12345';  // Replace with dynamic ID if needed

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAssignedCourses();
  }

  loadAssignedCourses() {
    this.http.get<Course[]>('http://localhost:3000/courses').subscribe(
      (allCourses) => {
        this.courses = allCourses.filter(course => course.instructor === this.instructorId);
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
