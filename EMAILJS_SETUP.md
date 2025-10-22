# EmailJS Setup Instructions

Your contact form is now ready! To make it functional, you need to configure EmailJS:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Copy your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Contact from {{from_name}}

**Body:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save and copy your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (under API Keys section)

## Step 5: Update Your Code
Open: `src/assets/data/site-config.json`

Update the emailConfig section:
```json
{
  "trainerName": "JAY RUNGTA",
  "emailConfig": {
    "serviceId": "YOUR_SERVICE_ID",     // From Step 2
    "templateId": "YOUR_TEMPLATE_ID",   // From Step 3
    "publicKey": "YOUR_PUBLIC_KEY"      // From Step 4
  },
  "battleOptions": [...]
}
```

## Step 6: Update Recipient Name (Optional)
In `src/app/shared/components/contact-form/contact-form.component.ts`, update the recipient name (around line 69):
```typescript
to_name: 'Jay', // Change this to your preferred name
```

## Testing
1. Run your dev server: `npm start`
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email!

## Troubleshooting
- **CORS errors**: Make sure you're using the Public Key, not the Private Key
- **No email received**: Check EmailJS dashboard → "Monitor" for delivery status
- **Rate limit**: Free tier allows 200 emails/month

## Alternative: Change Email Provider
If you prefer a different email service, you can easily swap EmailJS for:
- **Formspree**: [https://formspree.io/](https://formspree.io/)
- **Web3Forms**: [https://web3forms.com/](https://web3forms.com/)
- Your own backend API

The form structure is already built, so you'd just need to modify the `onSubmit()` method in the component.

