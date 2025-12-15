import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from 'src/core/services/deck.service';
import { Deck } from 'src/core/models/deck.model';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  decks: Deck[] = [];
  currentUserId = '';

  constructor(private router: Router, private deckService: DeckService, private auth: AuthService) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.load();
  }

  ionViewWillEnter() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.load();
  }

  load() {
    const user = this.auth.getCurrentUser();
    this.currentUserId = user || '';

    // Obtener solo los decks del usuario actual
    this.decks = this.deckService.getDecksByUser(this.currentUserId);
    console.log('Decks del usuario:', this.decks);
  }

  navigateToCreate() {
    this.router.navigate(['/deck-create']);
  }

  navigateToDeck(deckId: number | undefined) {
    if (!deckId || deckId <= 0) {
      console.warn('ID de deck inválido:', deckId);
      return;
    }
    this.router.navigate(['/deck-details', deckId]);
  }

  logout() {
    this.auth.logout();
  }
}
