
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var window: any;

interface UserRecord {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'my_decks_auth_users';
  private currentUserKey = 'my_decks_auth_current';
  private users: UserRecord[] = [];
  private db: any = null; // instancia sqlite si está disponible
  private currentUser: string | null = null;

  constructor(private router: Router) {
    // Inicializamos SQLite exclusivamente
    try {
      if (window && window.sqlitePlugin) {
        this.InitDB();
      } else {
        console.warn('sqlitePlugin no disponible: AuthService opera en modo sin persistencia.');
      }
    } catch (e) {
      console.warn('Error inicializando sqlitePlugin', e);
    }
  }

  /**
   * Inicializa la base de datos SQLite y asegura la tabla users.
   * También carga los registros existentes en memoria (this.users).
   */
  InitDB() {
    try {
      this.db = window.sqlitePlugin.openDatabase({ name: 'app.db', location: 'default' });
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)',
          [],
          () => { console.log('Tabla users creada o ya existente.'); },
          (txErr: any) => { console.log('Error al crear la tabla users: ', txErr); }
        );
      }, (err: any) => {
        console.log('Error transacción InitDB:', err);
      }, () => {
        try {
          this.db.transaction((tx: any) => {
            tx.executeSql('SELECT email, password FROM users', [], (tx2: any, rs: any) => {
              const arr: UserRecord[] = [];
              for (let i = 0; i < rs.rows.length; i++) {
                const r = rs.rows.item(i);
                arr.push({ username: r.email, password: r.password });
              }
              if (arr.length > 0) {
                this.users = arr;
              }
            }, (errSel: any) => { console.log('Error al leer usuarios de SQLite:', errSel);});
          });
        } catch (e) { console.log('Error leyendo usuarios SQLite', e); }
      });
    } catch (e) {
      console.log('No se pudo inicializar sqlitePlugin', e);
      this.db = null;
    }
  }

  private setCurrent(username: string) {
    this.currentUser = username;
    try {
      if (this.db) {
        this.db.transaction((tx: any) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)', [], () => {}, () => {});
          tx.executeSql('REPLACE INTO meta (key, value) VALUES (?,?)', [this.currentUserKey, JSON.stringify({ username })], () => {}, () => {});
        });
      }
    } catch (e) { /* ignore */ }
  }

  private getCurrent(): string | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.getCurrent() != null;
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    console.log('[AuthService] Usuario logueado:', email);

    console.log('[AuthService] password entregado logueado:', password);

    console.log('usuario jojojojo', user)

    if (user.password === password) {
      this.setCurrent(email);
      console.log('[AuthService] Usuario logueado:', email);
      return true;
    } else {
      throw new Error('Contraseña incorrecta.');
    }
  }

  logout(): void {
    try {
      if (this.db) {
        this.db.transaction((tx: any) => {
          tx.executeSql('DELETE FROM meta WHERE key = ?', [this.currentUserKey], () => {}, () => {});
        });
      }
    } catch (e) { /* ignore */ }
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  register(username: string, password: string): { ok: boolean; message?: string } {
    if (!username || !password) {
      return { ok: false, message: 'Usuario y contraseña son requeridos' };
    }
    console.log(password,'mostrando lo que guardo');
    if (password.length > 9) {
      return { ok: false, message: 'La contraseña debe tener máximo 9 caracteres' };
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      return { ok: false, message: 'La contraseña debe ser alfanumérica' };
    }
    if (this.users.find(u => u.username === username)) {
      return { ok: false, message: 'El usuario ya existe' };
    }
    this.users.push({ username, password });
    this.setCurrent(username);
    try {
      if (this.db) {
        this.db.transaction((tx: any) => {
          tx.executeSql('INSERT INTO users (email, password) VALUES (?,?)', [username, password], () => {
            console.log('Usuario registrado en SQLite con éxito.');
          }, (errIns: any) => {
            console.log('Error al registrar usuario en SQLite:', errIns);
          });
        });
      } else {
        console.warn('sqlitePlugin no disponible: usuario no persistido en disco.');
      }
    } catch (e) { console.warn('Error al insertar usuario en SQLite', e); }
    return { ok: true };
  }

  getCurrentUser(): string | null {
    return this.getCurrent();
  }

  getUserByEmail(email: string): Promise<any | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ?',
          [email],
          (tx: any, results: any) => {
            if (results.rows.length > 0) {
              console.log(results.rows.item(0));
              resolve(results.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (error: any) => reject(error)
        );
      });
    });
  }

}
