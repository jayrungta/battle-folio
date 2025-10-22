import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Input() content: string = '';
  
  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  errorMessage = '';

  // EmailJS Configuration - Replace these with your actual values
  private readonly EMAILJS_SERVICE_ID = 'service_chm96zo';
  private readonly EMAILJS_TEMPLATE_ID = 'template_dujfx1o';
  private readonly EMAILJS_PUBLIC_KEY = '995FCEYqCg0kJSsQm';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
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
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        templateParams,
        this.EMAILJS_PUBLIC_KEY
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

