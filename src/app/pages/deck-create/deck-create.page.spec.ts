import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckCreatePage } from './deck-create.page';

describe('DeckCreatePage', () => {
  let component: DeckCreatePage;
  let fixture: ComponentFixture<DeckCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
