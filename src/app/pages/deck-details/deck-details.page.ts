import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from 'src/core/services/deck.service';
import { DeckCardsService } from 'src/core/services/deck-cards.service';
import { Deck, Card } from 'src/core/models/deck.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.page.html',
  styleUrls: ['./deck-details.page.scss'],
  standalone: false
})
export class DeckDetailsPage implements OnInit {
  deckId: number | null = null;
  deck: Deck | null = null;
  cards: Card[] = [];
  isLoading = true;
  isEditing = false;
  editDeckName = '';
  editDeckDesc = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService,
    private deckCardsService: DeckCardsService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadDeck();
  }

  ionViewWillEnter() {
    this.loadDeck();
  }

  loadDeck() {
    this.isLoading = true;
    this.route.params.subscribe(async (params: any) => {
      this.deckId = Number(params['id']);

      if (this.deckId) {
        try {
          // Obtener el deck por ID
          this.deck = this.deckService.getDeckById(this.deckId) || null;

          if (this.deck) {
            this.editDeckName = this.deck.deckName;
            this.editDeckDesc = this.deck.description;

            // Obtener las cartas del deck
            this.cards = await this.deckCardsService.getCardsByDeckId(this.deckId);
          }
        } catch (error) {
          console.error('Error cargando deck:', error);
          this.showToast('Error al cargar el deck', 'danger');
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  getTotalCards(): number {
    return this.cards.reduce((sum, card) => sum + (card.count ?? 1), 0);
  }


  goBack() {
    this.router.navigate(['/home']);
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
