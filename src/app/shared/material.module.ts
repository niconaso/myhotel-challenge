import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

const MODULES: any[] = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatSortModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class MaterialModule {}
