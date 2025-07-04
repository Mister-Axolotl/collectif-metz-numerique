import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-adhesion-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './adhesion-component.html',
  styleUrl: './adhesion-component.scss'
})
export class AdhesionComponent implements OnInit {
  adhesionForm!: FormGroup;
  payBtnLoading = false;
  payBtnText = '💳 Payer la cotisation (15,00 €)';
  maxBirthDate = '2008-12-31'; // 16 ans minimum

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.adhesionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      birthDate: ['', [Validators.required]],
      street: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      city: ['', Validators.required],
      country: [{ value: 'France', disabled: true }],
      consentData: [false, Validators.requiredTrue],
      consentNewsletter: [false],
      consentAge: [false, Validators.requiredTrue],
      consentTerms: [false, Validators.requiredTrue]
    });
  }

  async onPostalCodeBlur() {
    const postalCode = this.adhesionForm.get('postalCode')?.value?.trim();
    if (postalCode && postalCode.length === 5) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${postalCode}&type=municipality&limit=1`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const city = data.features[0].properties.city || data.features[0].properties.name;
          this.adhesionForm.get('city')?.setValue(city);
        }
      } catch {
        // ignore
      }
    }
  }

  checkAgeValid(): boolean {
    const birthDateValue = this.adhesionForm.get('birthDate')?.value;
    if (!birthDateValue) return false;
    const birthDate = new Date(birthDateValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 16;
  }

  async onSubmit() {
    if (this.adhesionForm.invalid || !this.checkAgeValid()) {
      alert('Veuillez remplir correctement le formulaire et avoir au moins 16 ans.');
      return;
    }

    this.payBtnLoading = true;
    this.payBtnText = '⏳ Création du compte...';

    try {
      this.payBtnText = '🔄 Redirection vers Stripe...';
      // @ts-ignore
      const stripe = Stripe('pk_test_51RfbnjP5jZSXyAyOgbHwCeIZG0i0rqXa25dQaAtLAKAXRPjtXq6yRKOfmiGa7hPp4z1Hp2FX2goXjO31TgN2QRb800d03Om2BT');
      const raw = this.adhesionForm.getRawValue();
      const formData = {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: raw.email,
        phone: raw.phone,
        birthDate: raw.birthDate,
        address: {
          street: raw.street.trim(),
          postalCode: raw.postalCode.trim(),
          city: raw.city.trim(),
          country: 'France'
        },
        consentData: raw.consentData,
        consentNewsletter: raw.consentNewsletter,
        consentAge: raw.consentAge,
        consentTerms: raw.consentTerms
      };
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        await stripe.redirectToCheckout({ sessionId: result.id });
      } else {
        throw new Error(result.error || 'Erreur lors de la création du compte');
      }
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      this.payBtnLoading = false;
      this.payBtnText = '💳 Payer la cotisation (15,00 €)';
    }
  }
}
