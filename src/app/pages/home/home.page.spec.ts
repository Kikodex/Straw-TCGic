import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HomePage } from './home.page';
import { DeckService } from 'src/core/services/deck.service';
import { AuthService } from 'src/core/services/auth.service';

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

class DeckServiceStub {
  getDecksByUser = jasmine.createSpy('getDecksByUser').and.returnValue([]);
}

class AuthServiceStub {
  isLoggedIn = jasmine.createSpy('isLoggedIn').and.returnValue(true);
  getCurrentUser = jasmine.createSpy('getCurrentUser').and.returnValue('user-1');
  logout = jasmine.createSpy('logout');
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: RouterStub;
  let deckService: DeckServiceStub;
  let authService: AuthServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), CommonModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: DeckService, useClass: DeckServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    deckService = TestBed.inject(DeckService) as any;
    authService = TestBed.inject(AuthService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('redirects to login when user not logged on init', () => {
    authService.isLoggedIn.and.returnValue(false);

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(deckService.getDecksByUser).not.toHaveBeenCalled();
  });

  it('loads decks for current user when logged', () => {
    const decks = [{ id: 1, deckName: 'Deck', leaderName: 'L', leaderImage: '', createdAt: new Date() } as any];
    deckService.getDecksByUser.and.returnValue(decks);

    fixture.detectChanges();

    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(authService.getCurrentUser).toHaveBeenCalled();
    expect(deckService.getDecksByUser).toHaveBeenCalledWith('user-1');
    expect(component.decks).toEqual(decks);
  });

  it('ionViewWillEnter reloads decks when logged', () => {
    const decks = [{ id: 2 } as any];
    deckService.getDecksByUser.and.returnValue(decks);

    component.ionViewWillEnter();

    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(deckService.getDecksByUser).toHaveBeenCalled();
    expect(component.decks).toEqual(decks);
  });

  it('navigateToCreate routes to deck-create', () => {
    component.navigateToCreate();

    expect(router.navigate).toHaveBeenCalledWith(['/deck-create']);
  });

  it('navigateToDeck ignores invalid ids', () => {
    component.navigateToDeck(0);

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('navigateToDeck routes with valid id', () => {
    component.navigateToDeck(5);

    expect(router.navigate).toHaveBeenCalledWith(['/deck-details', 5]);
  });

  it('logout delegates to AuthService', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
