import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DeckCreatePage } from './deck-create.page';
import { DeckService } from 'src/core/services/deck.service';
import { CardService } from 'src/core/services/card.service';
import { LeadersService } from 'src/core/services/leaders.service';
import { DeckCardsService } from 'src/core/services/deck-cards.service';
import { AuthService } from 'src/core/services/auth.service';
import { ToastController } from '@ionic/angular';

// Stubs sencillos para los servicios usados por el componente
class DeckServiceStub {
  add = jasmine.createSpy('add').and.returnValue(Promise.resolve(1));
}

class CardServiceStub {
  fetchAll = jasmine.createSpy('fetchAll').and.returnValue(of([]));
  search = jasmine.createSpy('search').and.returnValue([]);
}

class LeadersServiceStub {
  getLeaders = jasmine.createSpy('getLeaders').and.returnValue([]);
}

class DeckCardsServiceStub {
  addCardsToDecks = jasmine.createSpy('addCardsToDecks').and.returnValue(Promise.resolve());
}

class AuthServiceStub {
  getCurrentUser = jasmine.createSpy('getCurrentUser').and.returnValue('test-user');
  isLoggedIn = jasmine.createSpy('isLoggedIn').and.returnValue(true);
}

class ToastControllerStub {
  create = jasmine.createSpy('create').and.callFake(({ message, color }) =>
    Promise.resolve({
      present: () => Promise.resolve(),
      message,
      color
    })
  );
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

describe('DeckCreatePage', () => {
  let component: DeckCreatePage;
  let fixture: ComponentFixture<DeckCreatePage>;
  let deckService: DeckServiceStub;
  let deckCardsService: DeckCardsServiceStub;
  let router: RouterStub;
  let toastCtrl: ToastControllerStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckCreatePage],
      imports: [CommonModule, FormsModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: DeckService, useClass: DeckServiceStub },
        { provide: CardService, useClass: CardServiceStub },
        { provide: LeadersService, useClass: LeadersServiceStub },
        { provide: DeckCardsService, useClass: DeckCardsServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ToastController, useClass: ToastControllerStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCreatePage);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService) as any;
    deckCardsService = TestBed.inject(DeckCardsService) as any;
    router = TestBed.inject(Router) as any;
    toastCtrl = TestBed.inject(ToastController) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows warning when deck name missing', async () => {
    component.selectedLeader = {
      id: 'leader1',
      name: 'Leader',
      code: 'L1',
      type: 'T',
      power: '5',
      cost: '1',
      rarity: 'R',
      family: 'F',
      ability: 'A',
      images: { small: 's', large: 'l' }
    } as any;
    component.totalCardsInDeck = component.TOTAL;

    await component.finishCreation();

    expect(toastCtrl.create).toHaveBeenCalled();
    const { message, color } = toastCtrl.create.calls.mostRecent().args[0];
    expect(message).toContain('nombre de la baraja es requerido');
    expect(color).toBe('warning');
    expect(deckService.add).not.toHaveBeenCalled();
  });

  it('shows warning when leader not selected', async () => {
    component.deckName = 'My deck';
    component.totalCardsInDeck = component.TOTAL;
    component.selectedLeader = null;

    await component.finishCreation();

    const { message } = toastCtrl.create.calls.mostRecent().args[0];
    expect(message).toContain('Debes seleccionar un líder');
    expect(deckService.add).not.toHaveBeenCalled();
  });

  it('shows warning when total cards is not 50', async () => {
    component.deckName = 'My deck';
    component.selectedLeader = {
      id: 'leader1',
      name: 'Leader',
      code: 'L1',
      type: 'T',
      power: '5',
      cost: '1',
      rarity: 'R',
      family: 'F',
      ability: 'A',
      images: { small: 's', large: 'l' }
    } as any;
    component.totalCardsInDeck = 10;

    await component.finishCreation();

    const { message } = toastCtrl.create.calls.mostRecent().args[0];
    expect(message).toContain('exactamente');
    expect(deckService.add).not.toHaveBeenCalled();
  });
});
