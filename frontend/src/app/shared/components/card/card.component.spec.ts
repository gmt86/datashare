import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

/**
 * Tests unitaires pour CardComponent.
 * Vérifie l'affichage du titre et du message d'erreur.
 */
describe('CardComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();
  });

  /**
   * Test — le composant se crée correctement.
   */
  it('should create', () => {
    const fixture = TestBed.createComponent(CardComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  /**
   * Test — affiche le titre passé en input.
   */
  it('should display title', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.componentInstance.title = 'Mon titre';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Mon titre');
  });

  /**
   * Test — affiche le message d'erreur si présent.
   */
  it('should display error message when provided', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.componentInstance.errorMessage = 'Une erreur';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-callout')?.textContent).toContain('Une erreur');
  });

  /**
   * Test — n'affiche pas le message d'erreur si absent.
   */
  it('should not display error callout when no error', () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-callout')).toBeNull();
  });
});