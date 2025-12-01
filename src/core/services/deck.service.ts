import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private storageKey = 'my_decks_v1';
  private decks: Deck[] = [];

  constructor() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try { this.decks = JSON.parse(raw); } catch { this.decks = []; }
    }
  }

  getAll(): Deck[] {
    return this.decks;
  }

  add(deck: Deck): void {
    this.decks.push(deck);
    this.save();
  }

  save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.decks));
  }

  clear(): void {
    this.decks = [];
    this.save();
  }
}