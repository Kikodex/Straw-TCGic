import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from 'src/core/services/deck.service';
import { Card,Leader } from 'src/core/models/deck.model';
import { CardService } from 'src/core/services/card.service';
import { LeadersService } from 'src/core/services/leaders.service';
import { DeckCardsService } from 'src/core/services/deck-cards.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/core/services/auth.service';

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
  leaders:Leader[] = [];
  selectedLeader: Leader | null = null;
  cartas: Card[] = [];
  error = '';
  isLoading = false;
  currentUserId = '';
  totalCardsInDeck = 0;

  TOTAL = 50;

  constructor(
    private cardService: CardService,
    private router: Router,
    private deckService: DeckService,
    private leadersService: LeadersService,
    private authService: AuthService,
    private toastController: ToastController,
    private deckCardsService: DeckCardsService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.currentUserId = user || 'guest_' + Date.now();

    this.leaders = this.leadersService.getLeaders();
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

  addCardToDeck(card: Card) {
    if (!card) return;

    const cardId = card.id;
    const existingCount = this.cartas.filter(c => c.id === cardId).reduce((sum, c) => sum + (c.count ?? 0), 0);

    if (existingCount >= 4) {
      this.showToast('Máximo 4 copias de esta carta permitidas', 'warning');
      return;
    }
    console.log('Agregando carta al deck:', this.cartas.reduce((sum, c) => sum + (c.count ?? 0), 0));
    // Validar total de 50 cartas
    if (this.cartas.reduce((sum, c) => sum + (c.count ?? 0), 0) >= this.TOTAL) {
      this.showToast(`No puedes agregar más de ${this.TOTAL} cartas a la baraja.`, 'warning');
      return;
    }

    // Si no existe, agregar nueva entrada
    if (existingCount === 0) {
      // Agregar count a la tarjeta
      card.count = 1;
      this.cartas.push(card);
    } else {
      // Si existe y hay menos de 4 copias, incrementar
      const index = this.cartas.findIndex(c => c.id === cardId);
      if (index !== -1 && (this.cartas[index].count ?? 0) < 4) {
        this.cartas[index].count = (this.cartas[index].count ?? 0) + 1;
        this.totalCardsInDeck = this.cartas.reduce((sum, c) => sum + (c.count ?? 0), 0);
      }
    }

    // Limpiar búsqueda cuando se alcanza máximo
    if (this.totalCardsInDeck === this.TOTAL) {
      this.results = [];
    }
  }

  removeCardFromDeck(index: number){
    this.cartas.splice(index, 1);
  }

  async finishCreation(){
    // Validaciones
    if (!this.deckName.trim()) {
      this.showToast('El nombre de la baraja es requerido', 'warning');
      return;
    }

    if (!this.selectedLeader) {
      this.showToast('Debes seleccionar un líder', 'warning');
      return;
    }

    if (this.totalCardsInDeck !== this.TOTAL) {
      this.showToast(`La baraja debe tener exactamente ${this.TOTAL} cartas`, 'warning');
      return;
    }

    this.isLoading = true;

    try {
      // Crear el objeto Deck con la estructura correcta
      const newDeck = {
        userId: this.currentUserId,
        leaderId: this.selectedLeader.id,
        leaderImage: this.selectedLeader.images.large || this.selectedLeader.images.small,
        leaderName: this.selectedLeader.name,
        deckName: this.deckName.trim(),
        description: this.deckDesc.trim()
      };

      // Guardar el deck y obtener el ID generado
      const deckId = await this.deckService.add(newDeck as any);
      console.log('Deck creado con ID:', deckId);

      // Preparar las cartas para guardar (ahora las cartas ya son objetos Card completos)
      const cardsToSave: Card[] = this.cartas;

      // Guardar las cartas en la tabla deckCards
      await this.deckCardsService.addCardsToDecks(deckId, cardsToSave);
      console.log('Cartas guardadas en deckCards');

      this.showToast('¡Baraja guardada exitosamente!', 'success');
      this.resetForm();

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    } catch (error) {
      console.error('Error al guardar baraja:', error);
      this.showToast('Error al guardar la baraja', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private resetForm(){
    this.deckName = '';
    this.deckDesc = '';
    this.selectedLeader = null;
    this.cartas = [];
    this.results = [];
    this.error = '';
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}
