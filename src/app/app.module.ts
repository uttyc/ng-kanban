import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { KanbanService } from './services/kanban.service';
import { BoardComponent } from './components/board/board.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ListComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DragDropModule,
    BrowserAnimationsModule,
    DialogModule,
    DropdownModule
  ],
  providers: [KanbanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
