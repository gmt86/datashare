import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../core/services/user.service';
import { ErrorService } from '../../core/services/error.service';
import { LoginRequest } from '../../models/auth.model';
import { CardComponent } from "../../shared/components/card/card.component";

/**
 * Composant de la page de connexion.
 * Utilise les Reactive Forms pour une validation robuste côté client.
 * Gère la connexion utilisateur via UserService.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private userService = inject(UserService);
  private errorService = inject(ErrorService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  /** Formulaire de connexion */
  loginForm: FormGroup = new FormGroup({});

  /** Indique si le formulaire a été soumis */
  submitted: boolean = false;

  /** Message d'erreur retourné par le backend */
  errorMessage: string = '';

  /** Indicateur de chargement */
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /**
   * Raccourci pour accéder aux contrôles du formulaire dans le template.
   */
  get form() {
    return this.loginForm.controls;
  }

  /**
   * Soumet le formulaire de connexion.
   * Redirige vers la page d'accueil si succès.
   */
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const request: LoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.userService.login(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = this.errorService.getErrorMessage(error);
          this.isLoading = false;
          this.cdr.markForCheck(); // Force Angular à re-render le template 
        }
      });
  }
}