import { Component, DestroyRef, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FichierService } from '../../core/services/fichier.service';
import { ErrorService } from '../../core/services/error.service';
import { FichierResponse } from '../../models/fichier.model';

/**
 * Composant de l'espace personnel de l'utilisateur.
 * Affiche l'historique des fichiers avec filtrage et actions.
 */
@Component({
  selector: 'app-espace-personnel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './espace-personnel.component.html',
  styleUrl: './espace-personnel.component.scss'
})
export class EspacePersonnelComponent implements OnInit {

  private fichierService = inject(FichierService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  /** Liste complète des fichiers */
  fichiers: FichierResponse[] = [];

  /** Filtre actif : 'tous' | 'actifs' | 'expires' */
  filtreActif: string = 'tous';

  /** Message d'erreur */
  errorMessage: string = '';

  /** Indicateur de chargement */
  isLoading: boolean = true;

  /** ID du fichier dont le menu est ouvert */
   menuOuvertId: string | null = null;


  ngOnInit(): void {
    this.loadFichiers();
  }

  /**
   * Charge l'historique des fichiers de l'utilisateur.
   */
  private loadFichiers(): void {
    this.fichierService.getFichiers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (fichiers) => {
          this.fichiers = fichiers;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.errorMessage = this.errorService.getErrorMessage(error);
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Retourne les fichiers filtrés selon le filtre actif.
   */
  get fichiersFiltres(): FichierResponse[] {
    switch (this.filtreActif) {
      case 'actifs': return this.fichiers.filter(f => !f.estExpire);
      case 'expires': return this.fichiers.filter(f => f.estExpire);
      default: return this.fichiers;
    }
  }

  /**
   * Change le filtre actif.
   */
  setFiltre(filtre: string): void {
    this.filtreActif = filtre;
  }

  /**
   * Redirige vers la page de téléchargement du fichier.
   */
  accederFichier(token: string): void {
    this.router.navigate(['/download', token]);
  }

  /**
   * Supprime un fichier après confirmation.
   */
  supprimerFichier(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.')) {
      return;
    }

    this.fichierService.deleteFichier(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.fichiers = this.fichiers.filter(f => f.id !== id);
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.errorMessage = this.errorService.getErrorMessage(error);
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Formate la taille du fichier en Mo.
   */
  formatSize(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(2) + ' Mo';
  }

  /**
 * Ouvre/ferme le menu d'actions d'un fichier.
 */
    toggleMenu(id: string): void {
      this.menuOuvertId = this.menuOuvertId === id ? null : id;
    }

    /**
     * Ferme tous les menus.
     */
    fermerMenus(): void {
      this.menuOuvertId = null;
    }
}