import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'number',
    'firstAndLastName',
    'email',
    'comments',
    'rating',
    'createdAt',
    'actions',
  ];

  dataSource: MatTableDataSource<Review> = new MatTableDataSource<Review>();
  dateFormat: string = environment.dateFormat;
  pageSizeOptions: number[] = environment.pagination.pageSizes;

  private subscriptions: Subscription = Subscription.EMPTY;

  /**
   * Creates an instance of ReviewsComponent.
   * @param {ReviewService} _reviewService
   * @memberof ReviewsComponent
   */
  constructor(private readonly _reviewService: ReviewService) {}

  ngOnInit(): void {
    // TODO: find a better way to update the DataSource.
    this._reviewService.getAll().subscribe((reviews) => {
      this.dataSource.data = reviews;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
