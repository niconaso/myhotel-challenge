import {
  AfterViewInit,
  Component,
  ElementRef,
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
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * MatSort reference
   *
   * @type {MatSort}
   * @memberof ReviewsComponent
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * MatPaginator reference
   *
   * @type {MatPaginator}
   * @memberof ReviewsComponent
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('inputSearch') inputSearch!: ElementRef;
  /**
   * Columns to display in the table
   *
   * @type {string[]}
   * @memberof ReviewsComponent
   */
  displayedColumns: string[] = [
    'number',
    'firstAndLastName',
    'email',
    'comments',
    'rating',
    'createdAt',
    'actions',
  ];

  /**
   * MatTable data source
   *
   * @type {MatTableDataSource<Review>}
   * @memberof ReviewsComponent
   */
  dataSource: MatTableDataSource<Review> = new MatTableDataSource<Review>();

  /**
   * Format to apploy on dates
   *
   * @type {string}
   * @memberof ReviewsComponent
   */
  dateFormat: string = environment.dateFormat;
  pageSizeOptions: number[] = environment.pagination.pageSizes;

  /**
   * Gathers all the observables to be subscribed
   *
   * @private
   * @type {Subscription}
   * @memberof ReviewsComponent
   */
  private subscriptions: Subscription = Subscription.EMPTY;

  /**
   * Creates an instance of ReviewsComponent.
   * @param {ReviewService} _reviewService
   * @memberof ReviewsComponent
   */
  constructor(private readonly _reviewService: ReviewService) {}

  ngOnInit(): void {
    // TODO: find a better way to update the DataSource.
    this._reviewService
      .getAll()
      .subscribe((reviews: Review[]) => (this.dataSource.data = reviews));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.listenForSearchFiltering();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private listenForSearchFiltering() {
    fromEvent<KeyboardEvent>(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        map<KeyboardEvent, string>(
          (event) => (event.target as HTMLInputElement).value
        ),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => (this.dataSource.filter = searchTerm));
  }
}
