import { Component, DestroyRef, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FichierService } from '../../core/services/fichier.service';
import { ErrorService } from '../../core/services/error.service';
import { FichierResponse } from '../../models/fichier.model';
import { CardComponent } from "../../shared/components/card/card.component";

/**
 * Composant de la page de téléchargement.
 * Affiche les métadonnées du fichier et gère le téléchargement
 * avec ou sans mot de passe.
 */
@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss'
})
export class DownloadComponent implements OnInit {

  private fichierService = inject(FichierService);
  private errorService = inject(ErrorService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  /** Métadonnées du fichier */
  fichier: FichierResponse | null = null;

  /** Token de téléchargement depuis l'URL */
  token: string = '';

  /** Formulaire mot de passe */
  downloadForm: FormGroup = new FormGroup({});

  /** Message d'erreur */
  errorMessage: string = '';

  /** Indicateur de chargement */
  isLoading: boolean = false;

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.downloadForm = this.formBuilder.group({
      password: ['']
    });

    this.loadFichierMetadata();
  }

  /**
   * Charge les métadonnées du fichier via le token.
   */
  private loadFichierMetadata(): void {
    this.fichierService.getFichierByToken(this.token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.fichier = response;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.errorMessage = this.errorService.getErrorMessage(error);
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Télécharge le fichier.
   */
  onDownload(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const request = {
      password: this.downloadForm.get('password')?.value || null
    };

    this.fichierService.downloadFichier(this.token, request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (blob) => {
          // Crée un lien temporaire pour déclencher le téléchargement
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.fichier?.nom || 'fichier';
          a.click();  
          URL.revokeObjectURL(url);
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
   * Formate la taille du fichier en Mo.
   */
  formatSize(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(2) + ' Mo';
  }
}