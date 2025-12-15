import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DeckDetailsPage } from './deck-details.page';
import { DeckService } from 'src/core/services/deck.service';
import { DeckCardsService } from 'src/core/services/deck-cards.service';

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

class ActivatedRouteStub {
  private subject = new Subject<any>();
  params = this.subject.asObservable();
  setParams(params: any) {
    this.subject.next(params);
  }
}

class DeckServiceStub {
  getDeckById = jasmine.createSpy('getDeckById');
}

class DeckCardsServiceStub {
  getCardsByDeckId = jasmine.createSpy('getCardsByDeckId');
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

class NavControllerStub {
  navigateBack = jasmine.createSpy('navigateBack');
}

describe('DeckDetailsPage', () => {
  let component: DeckDetailsPage;
  let fixture: ComponentFixture<DeckDetailsPage>;
  let router: RouterStub;
  let route: ActivatedRouteStub;
  let deckService: DeckServiceStub;
  let deckCardsService: DeckCardsServiceStub;
  const routeStub = new ActivatedRouteStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckDetailsPage],
      imports: [CommonModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: DeckService, useClass: DeckServiceStub },
        { provide: DeckCardsService, useClass: DeckCardsServiceStub },
        { provide: ToastController, useClass: ToastControllerStub },
        { provide: NavController, useClass: NavControllerStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeckDetailsPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    route = TestBed.inject(ActivatedRoute) as any;
    deckService = TestBed.inject(DeckService) as any;
    deckCardsService = TestBed.inject(DeckCardsService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('loads deck and cards when id present', fakeAsync(() => {
    const deckMock: any = {
      id: 2,
      deckName: 'Deck',
      description: 'Desc',
      leaderName: 'Leader',
      leaderImage: 'img'
    };
    const cardsMock: any[] = [
      { id: 'c1', count: 2, images: { large: 'l', small: 's' } },
      { id: 'c2', count: 1, images: { large: 'l2', small: 's2' } }
    ];

    deckService.getDeckById.and.returnValue(deckMock);
    deckCardsService.getCardsByDeckId.and.returnValue(Promise.resolve(cardsMock));

    fixture.detectChanges();
    route.setParams({ id: '2' });
    flushMicrotasks();

    expect(deckService.getDeckById).toHaveBeenCalledWith(2);
    expect(deckCardsService.getCardsByDeckId).toHaveBeenCalledWith(2);
    expect(component.deck).toEqual(deckMock);
    expect(component.cards).toEqual(cardsMock);
    expect(component.isLoading).toBeFalse();
    expect(component.editDeckName).toBe('Deck');
    expect(component.editDeckDesc).toBe('Desc');
  }));

  it('does not load when deck not found', fakeAsync(() => {
    deckService.getDeckById.and.returnValue(null);
    deckCardsService.getCardsByDeckId.and.returnValue(Promise.resolve([]));

    fixture.detectChanges();
    route.setParams({ id: '3' });
    flushMicrotasks();

    expect(deckService.getDeckById).toHaveBeenCalledWith(3);
    expect(deckCardsService.getCardsByDeckId).not.toHaveBeenCalled();
    expect(component.deck).toBeNull();
    expect(component.cards).toEqual([]);
    expect(component.isLoading).toBeFalse();
  }));

  it('computes total cards', () => {
    component.cards = [
      { count: 2 } as any,
      { count: 3 } as any,
      { count: 1 } as any
    ];

    expect(component.getTotalCards()).toBe(6);
  });

  it('goBack navigates to home', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
