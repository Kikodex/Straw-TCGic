import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from 'src/core/services/deck.service';
import { Card,Leader } from 'src/core/models/deck.model';
import { CardService } from 'src/core/services/card.service';

@Component({
  selector: 'app-deck-create',
  templateUrl: './deck-create.page.html',
  styleUrls: ['./deck-create.page.scss'],
  standalone: false,  
})
export class DeckCreatePage implements OnInit {
  deckName = '';
  deckDesc = '';
  results: Card[]= [];
  leader: Leader = { name: '', imageUrl: '', ability: '' };
  cartas: { imagen: string; id: string, contador:number }[] = [];
  error = '';

  TOTAL = 50;

  constructor(private cardService: CardService, private router: Router, private deckService: DeckService) {}

  ngOnInit() {
    this.cardService.fetchAll().subscribe(cards =>{
      console.log('cartas encontradas', cards);
    })
  }
  
  searchCards(event: any ){
    const query = event.target.value.toLowerCase();
    if(query.length === 0){
      this.results = [];
      return;
    }
    this.results = this.cardService.search(query);
    
  }

  addCardToDeck(imagen: string, id: string){
    const cardId = String(id ?? '');
    const imagenStr = String(imagen ?? '');
    if(this.cartas.filter(c => c.id === cardId).length >= 4){
      return;
    }
    
    if(this.cartas.length >= this.TOTAL){
      this.error = `No puedes agregar más de ${this.TOTAL} cartas a la baraja.`;
      return;
    }
   

    if(this.cartas.filter(c => c.id === cardId).length === 0){
      this.cartas.push({imagen: imagenStr, id: cardId , contador: 1});
      return;
    }

    if(this.cartas.filter(c => c.id === cardId).length > 0){
      const index = this.cartas.findIndex(c => c.id === cardId);
      if(index !== -1 && this.cartas[index].contador  < 4){
        this.cartas[index].contador += 1;
        if(this.cartas[index].contador === 4){
          this.results = [];
        }
      }
    }    
  
  }

  removeCardFromDeck(index: number){
    this.cartas.splice(index, 1);
  }

  finishCreation(){}
}
