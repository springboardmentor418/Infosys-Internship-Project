import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService, Candidate } from '../../services/candidate.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-enrolled-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.css'],
})
export class EnrolledCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  user: Candidate | null = null;
  isCoursesDropdownVisible = false;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedInUserId = this.candidateService.getLoggedInCandidateId();

    if (loggedInUserId) {
      this.candidateService
        .getCandidateById(loggedInUserId)
        .pipe(
          switchMap((candidate) => {
            this.user = candidate;
            return this.candidateService.getEnrolledCoursesByCandidate(loggedInUserId);
          }),
          catchError((err) => {
            console.error('Error:', err);
            return of([]); // Return an empty array on error
          })
        )
        .subscribe((enrolledCourses) => {
          this.enrolledCourses = enrolledCourses;
          console.log('Enrolled Courses:', this.enrolledCourses);
        });
    } else {
      console.error('No logged-in candidate found.');
      this.enrolledCourses = [];
    }
  }
}
