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
    this.decks = this.deckService.getAll();
  }

  navigateToCreate() {
    this.router.navigate(['/deck-create']);
  }

  totalCopias(deck: Deck): number {
    return deck.cards.reduce((sum, c) => sum + (c.count ?? 0), 0);
  }

  logout() {
    this.auth.logout();
  }
}