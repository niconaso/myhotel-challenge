import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environment/environment';
import { Review } from '@modules/reviews/models';
import { ReviewService } from '@modules/reviews/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'comments',
    'createdAt',
  ];

  dataSource: MatTableDataSource<Review> = new MatTableDataSource<Review>();
  dateFormat: string = environment.dateFormat;

  private subscriptions: Subscription = Subscription.EMPTY;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private readonly _reviewService: ReviewService) {}

  ngOnInit(): void {
    this._reviewService.getAll().subscribe((reviews) => {
      this.dataSource.data = reviews;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
