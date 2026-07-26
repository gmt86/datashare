import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Composant Card générique et réutilisable.
 * Affiche un conteneur blanc avec titre et message d'erreur optionnel.
 * Le contenu est projeté via ng-content.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  /** Titre affiché en haut de la card */
  @Input() title: string = '';

  /** Message d'erreur — affiché si non vide */
  @Input() errorMessage: string = '';
}