import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Card } from '../models/deck.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  // URL API externa (usar environment para flexibilidad)
  // Usamos ApiService baseUrl + path; environment.apiBase ya configurado en ApiService
  private apiUrl = '/one-piece/cards';


  private cache$ = new BehaviorSubject<Card[]>([]);
  cards$ = this.cache$.asObservable();

  constructor(private api: ApiService) {}

  fetchAll(): Observable<Card[]> {
    if (this.cache$.getValue().length > 0) {
      return this.cards$;
    }


  // Usar ApiService para centralizar headers y base URL
    return (this.api.get<any>(this.apiUrl) as Observable<any>)
      .pipe(
        map((resp: any) => {
          // Resp puede ser un array directo o un objeto con propiedades { cards | data | results }
          const lista: any[] = Array.isArray(resp) ? resp : (resp?.cards ?? resp?.data ?? resp?.results ?? []);
          const cards: Card[] = lista.map((item: any) => {
            const card: Card = {
              id: String(item.id ?? item._id ?? item.code ?? ''),
              code: item.code,
              rarity: item.rarity,
              type: item.type,
              name: item.name ?? item.card_name,
              images: {
                small: item.images?.small ?? item.card_image ?? null,
                large: item.images?.large ?? null
              },
              cost: item.cost !== undefined && item.cost !== null && item.cost !== '' ? Number(item.cost) : null,
              attribute: item.attribute ? { name: item.attribute.name, image: item.attribute.image ?? null } : null,
              power: item.power !== undefined && item.power !== null && item.power !== '' ? Number(item.power) : null,
              counter: item.counter ?? null,
              color: item.color ?? null,
              family: item.family ?? null,
              ability: item.ability ?? item.card_text ?? null,
              trigger: item.trigger ?? null,
              set: item.set ? { name: item.set.name } : (item.set_name ? { name: item.set_name } : null),
              notes: item.notes ?? [],

              // Backwards compatibility
              card_name: item.name ?? item.card_name,
              card_text: item.ability ?? item.card_text,
              card_image: item.images?.small ?? item.card_image,
              card_image_id: item.card_image_id ?? null,
              inventory_price: item.inventory_price ?? item.price ?? undefined,
              market_price: item.market_price ?? undefined,
              date_scraped: item.date_scraped ?? undefined,
              count: item.count ?? undefined
            } as Card;
            return card;
          });
          return cards;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al obtener cartas desde API:', err);
          return of<Card[]>([]);
        }),
        // Actualizar caché sin transformar el stream
        tap((cards: Card[]) => {
          this.cache$.next(cards || []);
        })
      );
  }

  search(q: string): Card[] {
    const all = this.cache$.getValue();
    if (!q) return all;
  const term = q.toLowerCase();
  return all.filter((c) => (c.card_name ?? c.name ?? '').toLowerCase().includes(term));
  }

  /**
   * Obtiene una carta por su código
   */
  getCardByCode(code: string): Card | undefined {
    const all = this.cache$.getValue();
    return all.find((c) => c.code === code || c.id === code);
  }

  /**
   * Obtiene todas las cartas del caché
   */
  getAllCards(): Card[] {
    return this.cache$.getValue();
  }
}
