import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckCreatePageRoutingModule } from './deck-create-routing.module';

import { DeckCreatePage } from './deck-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeckCreatePageRoutingModule
  ],
  declarations: [DeckCreatePage]
})
export class DeckCreatePageModule {}
