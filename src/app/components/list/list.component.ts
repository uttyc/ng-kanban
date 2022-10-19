import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../models/card';
import {List} from '../../models/list';
import {KanbanService} from '../../services/kanban.service';
import {MoveCard} from "../../models/movecard";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cards: Card[] = []
  lists: List[] = []
  cardDesc: string = ""
  isHidden: boolean = true
  editMode: boolean = false;
  draggedCard: Card = <Card>{};
  @Input() listId: string = ""
  @Input() listName: string = ""
  @Output() outputFromChild: EventEmitter<string> = new EventEmitter();
  @Output() hover: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private kanbanService: KanbanService) {
  }

  ngOnInit(): void {
    this.initCards()
    this.initLists()
  }
  initLists() {
    this.kanbanService.getLists().subscribe(res => {
      this.lists = res
    })
  }
  initCards() {
    this.kanbanService.getCards(this.listId).subscribe(res => {
      const {listId, listName, cards} = res;
      this.cards = cards
      this.listId = listId
      this.listName = listName
    })
  }

  saveCard(event: any) {
    if (event.code == "Enter") {
      const card = <Card>{
        listId: this.listId,
        description: this.cardDesc
      }
      this.kanbanService.saveCard(card).subscribe(res => {
        this.initCards()
        this.cardDesc = ""
      })
    }
  }

  saveList(event: any) {
    if (event.code == "Enter") {
      const list = <List>{
        id: this.listId,
        description: this.listName
      }
      this.kanbanService.updateList(list).subscribe(res => {
        this.editMode = false
      })
    }
  }

  deleteList(listId: string) {
    this.kanbanService.deleteList(listId).subscribe(res => {
      location.reload();
    })

  }

  reloadList(event: any) {
    this.outputFromChild.emit(this.listId)
    this.initCards()

  }

  toggleDelete(event: any) {
    this.hover.emit(this.isHidden)
  }

  toggleMode(mode: boolean) {
    this.editMode = mode
    this.changeMode.emit(this.editMode)
  }

  dragStart(event: any, card: Card) {
    this.draggedCard = card
    console.log(this.draggedCard)
  }

  dragEnd(event: any) {
    if (this.draggedCard) {
      console.log(event)
      let droppedListId = this.findDroppedListId(this.draggedCard);
      console.log("Before drop : ")
      console.log(this.draggedCard.listId)
      let moveCardModel = <MoveCard>{
        cardToMove: this.draggedCard,
        targetListId: droppedListId
      }
      this.kanbanService.moveCard(moveCardModel).subscribe(res => {
        console.log("After drop : ")
        console.log(res)
      });
      // this.cards = [...this.cards, this.draggedCard];
      this.draggedCard = <Card>{}
    }
  }

  drop(event: any) {
    this.draggedCard = <Card>{}
  }

  findDroppedListId(card: Card) {
    let index = "";
    console.log("Lists")
    console.log(this.lists)
    for (let i = 0; i < this.lists.length; i++) {
      if (card.listId === this.lists[i].id) {
        index = this.lists[i].id;

        break;
      }
    }
    return index;
  }
}
