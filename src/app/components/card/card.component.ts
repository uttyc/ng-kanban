import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KanbanService } from '../../services/kanban.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() description: string = '';
  @Input() dateCreated: string = '';
  @Input() deadline: string = '';
  @Input() cardId: string = '';
  @Input() listId: string = '';
  @Output() outputFromChild: EventEmitter<string> = new EventEmitter();
  @Output() hover: EventEmitter<boolean> = new EventEmitter();

  constructor(private kanbanService: KanbanService) { }
  isHidden: boolean = true
  ngOnInit(): void {
  }
  deleteCard(cardId: string) {
    //console.log(cardId);
    this.kanbanService.deleteCard(cardId).subscribe(res => {
      this.outputFromChild.emit(this.listId)
    })
  }
  toggleDelete() {
    this.isHidden = !this.isHidden
    this.hover.emit(this.isHidden)
  }


}
