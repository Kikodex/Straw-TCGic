//import { Injectable } from '@angular/core';
//import {SQLite, SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';

//@Injectable({
//  providedIn: 'root'
//})
//export class DataService {
//  public dbInstance!: SQLiteObject; 
// constructor (private sqlite: SQLite){ }
//   async initializeDatabase() {
//       this.dbInstance = await this.sqlite.create({
//           name: 'strawtcg.db',
//           location: 'default'
//       });
//   await this.createTables();    // You can create tables here if needed     
//   } 

//   async createTables() {
//       await this.dbInstance.executeSql(`
//           CREATE TABLE IF NOT EXISTS usuario (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               username TEXT,
//               password TEXT
//           )
//       `, []);
//   }

//  async registerUser(username: string, password: string) {
//      try{
//          await this.dbInstance.executeSql(`
//              INSERT INTO usuario (username, password) VALUES (?, ?)
//          `, [username, password]);
//      }
//      catch (error){
//          throw new Error('Error registering user: ' + error);
//          return false;
//     }

//    }

 //   async loginUser(username: string, password: string): Promise<boolean> {
 //       const result = await this.dbInstance.executeSql(`
 //           SELECT * FROM usuario WHERE username = ? AND password = ?
 //       `, [username, password]);
 //       return result.rows.length > 0;
 //       }

//}