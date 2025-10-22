import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ConfigService } from '../../../core/services';
import { SiteConfig } from '../../../core/models';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() content: string = '';
  
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  errorMessage = '';
  emailConfig: any = null;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.configService.getSiteConfig().subscribe({
      next: (siteConfig: SiteConfig) => {
        this.emailConfig = siteConfig.emailConfig;
      },
      error: (error) => {
        console.error('Error loading email config:', error);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    if (!this.emailConfig) {
      this.submitStatus = 'error';
      this.errorMessage = 'Email configuration not loaded. Please try again.';
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';
    this.errorMessage = '';

    try {
      const formData = this.contactForm.value;
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Jay', // Your name
      };

      await emailjs.send(
        this.emailConfig.serviceId,
        this.emailConfig.templateId,
        templateParams,
        this.emailConfig.publicKey
      );

      this.submitStatus = 'success';
      this.contactForm.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        this.submitStatus = 'idle';
      }, 5000);
    } catch (error: any) {
      console.error('Email send error:', error);
      this.submitStatus = 'error';
      this.errorMessage = 'Failed to send message. Please try again or email directly.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (!control?.touched) return '';

    if (control.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
    }
    return '';
  }
}

