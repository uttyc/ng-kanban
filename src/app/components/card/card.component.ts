import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KanbanService} from '../../services/kanban.service';
import {Dialog} from 'primeng/dialog'
import {List} from "../../models/list";
import {MoveCard} from "../../models/movecard";

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
  @Output() onReload: EventEmitter<string> = new EventEmitter();
  isHidden: boolean = true
  showMoveDialog: boolean = false
  lists: List[] = []
  selectedList: List = <List>{}

  constructor(private kanbanService: KanbanService) {
  }

  ngOnInit(): void {
  }

  deleteCard(cardId: string) {
    //console.log(cardId);
    this.kanbanService.deleteCard(cardId).subscribe(res => {
      this.onReload.emit(this.listId)
    })
  }

  toggleDelete() {
    this.isHidden = !this.isHidden
  }

  showDialog() {
    this.kanbanService.getLists().subscribe(res => {
      this.lists = res
    })
    this.showMoveDialog = true
  }

  moveCard() {
    let moveCardModel = <MoveCard>{
      cardToMove: {
        id: this.cardId,
        listId: this.listId,
        description: this.description
      },
      targetListId: this.selectedList.id
    }

    this.kanbanService.moveCard(moveCardModel).subscribe(res => {
      location.reload()
    })
  }


}
