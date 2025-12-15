import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckDetailsPageRoutingModule } from './deck-details-routing.module';

import { DeckDetailsPage } from './deck-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeckDetailsPageRoutingModule
  ],
  declarations: [DeckDetailsPage]
})
export class DeckDetailsPageModule { }
