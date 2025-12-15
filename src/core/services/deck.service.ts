import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private storageKey = 'my_decks_v1';
  private decks: Deck[] = [];
  private db: any = null;

  constructor() {
    // Inicializamos con localStorage como fallback
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try { this.decks = JSON.parse(raw); } catch { this.decks = []; }
    }

    // Intentamos inicializar SQLite si está disponible
    try {
      if (window && window.sqlitePlugin) {
        this.InitDB();
      } else {
        console.warn('sqlitePlugin no disponible: DeckService opera en modo localStorage.');
      }
    } catch (e) {
      console.warn('Error inicializando sqlitePlugin', e);
    }
  }

  /**
   * Inicializa la base de datos SQLite y asegura la tabla decks.
   */
  InitDB() {
    try {
      this.db = window.sqlitePlugin.openDatabase({ name: 'app.db', location: 'default' });
      this.db.transaction((tx: any) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS decks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            leaderId TEXT NOT NULL,
            leaderImage TEXT,
            leaderName TEXT,
            deckName TEXT NOT NULL,
            description TEXT,
            createdAt TEXT,
            updatedAt TEXT
          )`,
          [],
          () => { console.log('Tabla decks creada o ya existente.'); },
          (txErr: any) => { console.log('Error al crear la tabla decks: ', txErr); }
        );
      }, (err: any) => {
        console.log('Error transacción InitDB:', err);
      });
    } catch (e) {
      console.log('No se pudo inicializar sqlitePlugin', e);
      this.db = null;
    }
  }

  /**
   * Obtiene decks de un usuario específico
   */
  getDecksByUser(userId: string): Deck[] {
    return this.decks.filter(d => d.userId === userId);
  }

  /**
   * Obtiene todos los decks
   */
  getAll(): Deck[] {
    return this.decks;
  }

  /**
   * Obtiene un deck por su ID
   */
  getDeckById(deckId: number): Deck | undefined {
    return this.decks.find(d => d.id === deckId);
  }

  /**
   * Agrega un nuevo deck (SQLite + localStorage)
   * @returns Promise con el ID del deck creado
   */
  add(deck: Deck): Promise<number> {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();

      // Generar ID temporal para memoria
      const tempId = this.decks.length + 1;
      const newDeck = {
        ...deck,
        id: tempId,
        createdAt: now,
        updatedAt: now
      };
      this.decks.push(newDeck);

      // Guardar en localStorage
      this.save();

      // Guardar en SQLite si está disponible
      if (this.db) {
        try {
          const record: Deck = {
            userId: newDeck.userId,
            leaderId: newDeck.leaderId,
            leaderImage: newDeck.leaderImage,
            leaderName: newDeck.leaderName,
            deckName: newDeck.deckName,
            description: newDeck.description,
            createdAt: now,
            updatedAt: now
          };

          this.db.transaction((tx: any) => {
            tx.executeSql(
              `INSERT INTO decks (userId, leaderId, leaderImage, leaderName, deckName, description, createdAt, updatedAt)
               VALUES (?,?,?,?,?,?,?,?)`,
              [record.userId, record.leaderId, record.leaderImage, record.leaderName, record.deckName,
               record.description, record.createdAt, record.updatedAt],
              (tx2: any, result: any) => {
                const insertedId = result.insertId;
                console.log('Deck guardado en SQLite con ID:', insertedId);
                // Actualizar el ID en memoria con el ID real de SQLite
                const index = this.decks.findIndex(d => d.id === tempId);
                if (index !== -1) {
                  this.decks[index].id = insertedId;
                  this.save();
                }
                resolve(insertedId);
              },
              (errIns: any) => {
                console.log('Error al guardar deck en SQLite:', errIns);
                reject(errIns);
              }
            );
          }, (txErr: any) => {
            console.log('Error en transacción:', txErr);
            reject(txErr);
          });
        } catch (e) {
          console.warn('Error al insertar deck en SQLite', e);
          reject(e);
        }
      } else {
        // Si no hay SQLite, retornar el ID temporal
        resolve(tempId);
      }
    });
  }

  /**
   * Actualiza un deck existente
   */
  update(deckId: number, updates: Partial<Deck>): void {
    const index = this.decks.findIndex(d => d.id === deckId);
    if (index !== -1) {
      const updated = { ...this.decks[index], ...updates, updatedAt: new Date().toISOString() };
      this.decks[index] = updated;
      this.save();

      // Actualizar en SQLite si está disponible
      if (this.db) {
        try {
          this.db.transaction((tx: any) => {
            tx.executeSql(
              `UPDATE decks SET deckName = ?, description = ?, updatedAt = ? WHERE id = ?`,
              [updated.deckName, updated.description, updated.updatedAt, deckId],
              () => {
                console.log('Deck actualizado en SQLite con éxito.');
              },
              (errUpd: any) => {
                console.log('Error al actualizar deck en SQLite:', errUpd);
              }
            );
          });
        } catch (e) {
          console.warn('Error al actualizar deck en SQLite', e);
        }
      }
    }
  }

  /**
   * Elimina un deck
   */
  delete(deckId: number): void {
    const index = this.decks.findIndex(d => d.id === deckId);
    if (index !== -1) {
      this.decks.splice(index, 1);
      this.save();

      // Eliminar de SQLite si está disponible
      if (this.db) {
        try {
          this.db.transaction((tx: any) => {
            tx.executeSql(
              `DELETE FROM decks WHERE id = ?`,
              [deckId],
              () => {
                console.log('Deck eliminado de SQLite con éxito.');
              },
              (errDel: any) => {
                console.log('Error al eliminar deck de SQLite:', errDel);
              }
            );
          });
        } catch (e) {
          console.warn('Error al eliminar deck de SQLite', e);
        }
      }
    }
  }

  /**
   * Guarda los decks en localStorage
   */
  save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.decks));
  }
}
