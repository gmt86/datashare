import { Component, DestroyRef, inject, OnInit , ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../core/services/user.service';
import { ErrorService } from '../../core/services/error.service';
import { RegisterRequest } from '../../models/auth.model';
import { CardComponent } from "../../shared/components/card/card.component";

/**
 * Composant de la page d'inscription.
 * Utilise les Reactive Forms pour une validation côté client.
 * Gère la création de compte utilisateur via UserService.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CardComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  private userService = inject(UserService);
  private errorService = inject(ErrorService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  /** Formulaire d'inscription */
  registerForm: FormGroup = new FormGroup({});

  /** Indique si le formulaire a été soumis */
  submitted: boolean = false;

  /** Message d'erreur retourné par le backend */
  errorMessage: string = '';

  /** Indicateur de chargement */
  isLoading: boolean = false;

  ngOnInit(): void { //Initialisation du formulaire
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //Validation intégrée dans le formulaire
      password: ['', [Validators.required, Validators.minLength(8)]], //Validation intégrée dans le formulaire
      confirmPassword: ['', [Validators.required]]
    }, {
    validators: this.passwordMatchValidator
  });
  }

  /**
 * Validateur personnalisé — vérifie que les deux mots de passe correspondent.
 */
private passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

  /**
   * Raccourci pour accéder aux contrôles du formulaire dans le template.
   */
  get form() {
    return this.registerForm.controls;
  }

  /**
   * Soumet le formulaire d'inscription.
   * Redirige vers la page d'accueil si succès.
   */
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    const request: RegisterRequest = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.userService.register(request)
      .pipe(takeUntilDestroyed(this.destroyRef))//Évite les fuites mémoire en désabonnant automatiquement
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {          
          this.errorMessage = this.errorService.getErrorMessage(error);
           this.isLoading = false;
          this.cdr.markForCheck(); // Force Angular à re-render le template         
        }
      });
  }
}