import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environment/environment';
import { GetReviews } from '@modules/reviews/actions';
import { Review } from '@modules/reviews/models';
import { ReviewState } from '@modules/reviews/states';
import { Select, Store } from '@ngxs/store';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(ReviewState.getReviewList)
  reviews$!: Observable<Review[]>;

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

  private _subscriptions: Subscription = new Subscription();

  /**
   * Creates an instance of ReviewsComponent.
   * @param {Store} _store
   * @memberof ReviewsComponent
   */
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(new GetReviews());

    this._subscriptions.add(
      this.reviews$.subscribe(
        (reviews: Review[]) => (this.dataSource.data = reviews)
      )
    );
  }
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.listenForSearchFiltering();
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
