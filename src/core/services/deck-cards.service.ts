import { Injectable } from '@angular/core';
import { Card } from '../models/deck.model';

declare var window: any;

export interface DeckCardRecord {
  id?: number;
  deckId: number;
  cardId: string;
  cardCode: string;
  cardName: string;
  cardType: string;
  cardRarity: string;
  imageSmall: string;
  imageLarge: string;
  cost: number | null;
  power: number | null;
  counter: string | null;
  color: string | null;
  family: string | null;
  ability: string | null;
  trigger: string | null;
  attributeName: string | null;
  attributeImage: string | null;
  setName: string | null;
  quantity: number;
  position: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeckCardsService {
  private db: any = null;

  constructor() {
    // Inicializamos SQLite si está disponible
    try {
      if (window && window.sqlitePlugin) {
        this.InitDB();
      } else {
        console.warn('sqlitePlugin no disponible: DeckCardsService no podrá persistir datos.');
      }
    } catch (e) {
      console.warn('Error inicializando sqlitePlugin en DeckCardsService', e);
    }
  }

  /**
   * Inicializa la base de datos SQLite y asegura la tabla deckCards.
   */
  InitDB() {
    try {
      this.db = window.sqlitePlugin.openDatabase({ name: 'app.db', location: 'default' });
      this.db.transaction((tx: any) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS deckCards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            deckId INTEGER NOT NULL,
            cardId TEXT NOT NULL,
            cardCode TEXT NOT NULL,
            cardName TEXT,
            cardType TEXT,
            cardRarity TEXT,
            imageSmall TEXT,
            imageLarge TEXT,
            cost INTEGER,
            power INTEGER,
            counter TEXT,
            color TEXT,
            family TEXT,
            ability TEXT,
            trigger TEXT,
            attributeName TEXT,
            attributeImage TEXT,
            setName TEXT,
            quantity INTEGER DEFAULT 1,
            position INTEGER,
            FOREIGN KEY(deckId) REFERENCES decks(id) ON DELETE CASCADE
          )`,
          [],
          () => {
            console.log('Tabla deckCards creada o ya existente.');
            // Crear índice para mejorar performance
            this.createIndexes();
          },
          (txErr: any) => { console.log('Error al crear la tabla deckCards: ', txErr); }
        );
      }, (err: any) => {
        console.log('Error transacción InitDB (deckCards):', err);
      });
    } catch (e) {
      console.log('No se pudo inicializar sqlitePlugin para deckCards', e);
      this.db = null;
    }
  }

  /**
   * Crea índices para optimizar queries
   */
  private createIndexes() {
    if (!this.db) return;
    this.db.transaction((tx: any) => {
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS idx_deckCards_deckId ON deckCards(deckId)',
        [],
        () => { console.log('Índice idx_deckCards_deckId creado.'); },
        (err: any) => { console.log('Error creando índice:', err); }
      );
      tx.executeSql(
        'CREATE INDEX IF NOT EXISTS idx_deckCards_cardId ON deckCards(cardId)',
        [],
        () => { console.log('Índice idx_deckCards_cardId creado.'); },
        (err: any) => { console.log('Error creando índice:', err); }
      );
    });
  }

  /**
   * Convierte una Card a DeckCardRecord
   */
  private cardToRecord(card: Card, deckId: number, position: number): DeckCardRecord {
    return {
      deckId,
      cardId: card.id,
      cardCode: card.code,
      cardName: card.name || '',
      cardType: card.type || '',
      cardRarity: card.rarity || '',
      imageSmall: card.images.small,
      imageLarge: card.images.large,
      cost: card.cost ?? null,
      power: card.power ?? null,
      counter: card.counter ? String(card.counter) : null,
      color: card.color || null,
      family: card.family || null,
      ability: card.ability || null,
      trigger: card.trigger || null,
      attributeName: card.attribute?.name || null,
      attributeImage: card.attribute?.image || null,
      setName: card.set?.name || null,
      quantity: card.count?? 0,
      position
    };
  }

  /**
   * Convierte DeckCardRecord a Card
   */
  private recordToCard(record: DeckCardRecord): Card & { quantity: number; position: number } {
    return {
      id: record.cardId,
      code: record.cardCode,
      name: record.cardName,
      type: record.cardType,
      rarity: record.cardRarity,
      images: {
        small: record.imageSmall,
        large: record.imageLarge
      },
      cost: record.cost,
      power: record.power,
      counter: record.counter,
      color: record.color,
      family: record.family,
      ability: record.ability,
      trigger: record.trigger,
      attribute: record.attributeName ? {
        name: record.attributeName,
        image: record.attributeImage
      } : null,
      set: record.setName ? { name: record.setName } : null,
      count: record.quantity,
      quantity: record.quantity,
      position: record.position
    };
  }

  /**
   * Agrega múltiples cartas a un deck
   */
  addCardsToDecks(deckId: number, cards: Card[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        console.warn('SQLite no disponible. No se guardaron las cartas.');
        resolve();
        return;
      }

      try {
        this.db.transaction((tx: any) => {
          cards.forEach((card, index) => {
            const record = this.cardToRecord(card, deckId, index);
            tx.executeSql(
              `INSERT INTO deckCards (
                deckId, cardId, cardCode, cardName, cardType, cardRarity,
                imageSmall, imageLarge, cost, power, counter, color,
                family, ability, trigger, attributeName, attributeImage,
                setName, quantity, position
              ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                record.deckId, record.cardId, record.cardCode, record.cardName,
                record.cardType, record.cardRarity, record.imageSmall, record.imageLarge,
                record.cost, record.power, record.counter, record.color,
                record.family, record.ability, record.trigger, record.attributeName,
                record.attributeImage, record.setName, record.quantity, record.position
              ],
              () => {},
              (errIns: any) => {
                console.log('Error al insertar carta en deckCards:', errIns);
              }
            );
          });
        }, (err: any) => {
          console.log('Error en transacción addCardsToDecks:', err);
          reject(err);
        }, () => {
          console.log(`${cards.length} cartas guardadas en deckCards para deck ${deckId}`);
          resolve();
        });
      } catch (e) {
        console.warn('Error al insertar cartas en SQLite', e);
        reject(e);
      }
    });
  }

  /**
   * Obtiene todas las cartas de un deck
   */
  getCardsByDeckId(deckId: number): Promise<Card[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        console.warn('SQLite no disponible.');
        resolve([]);
        return;
      }

      try {
        this.db.transaction((tx: any) => {
          tx.executeSql(
            'SELECT * FROM deckCards WHERE deckId = ? ORDER BY position ASC',
            [deckId],
            (tx2: any, rs: any) => {
              const cards: Card[] = [];
              for (let i = 0; i < rs.rows.length; i++) {
                const record = rs.rows.item(i);
                cards.push(this.recordToCard(record));
              }
              resolve(cards);
            },
            (errSel: any) => {
              console.log('Error al leer cartas de deckCards:', errSel);
              reject(errSel);
            }
          );
        });
      } catch (e) {
        console.log('Error leyendo cartas de SQLite', e);
        reject(e);
      }
    });
  }

  /**
   * Elimina todas las cartas de un deck
   */
  deleteCardsByDeckId(deckId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      try {
        this.db.transaction((tx: any) => {
          tx.executeSql(
            'DELETE FROM deckCards WHERE deckId = ?',
            [deckId],
            () => {
              console.log(`Cartas del deck ${deckId} eliminadas.`);
              resolve();
            },
            (errDel: any) => {
              console.log('Error al eliminar cartas:', errDel);
              reject(errDel);
            }
          );
        });
      } catch (e) {
        console.warn('Error al eliminar cartas en SQLite', e);
        reject(e);
      }
    });
  }

  /**
   * Actualiza las cartas de un deck (elimina las viejas e inserta las nuevas)
   */
  async updateDeckCards(deckId: number, cards: Card[]): Promise<void> {
    await this.deleteCardsByDeckId(deckId);
    await this.addCardsToDecks(deckId, cards);
  }

}
