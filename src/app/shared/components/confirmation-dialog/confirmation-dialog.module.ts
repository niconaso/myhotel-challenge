import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const MODULES: any[] = [CommonModule, MaterialModule];
const COMPONENTS: any[] = [ConfirmationDialogComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
})
export class ConfirmationDialogModule {}
