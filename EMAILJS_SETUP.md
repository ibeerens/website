# EmailJS Setup Guide

This guide will help you set up EmailJS to replace the local mail client functionality in your contact and membership forms.

## What is EmailJS?

EmailJS is a free cloud service that allows you to send emails directly from JavaScript without requiring a backend server. It's perfect for static websites like yours.

## Setup Steps

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Outlook" (since you're using buurtverenigingdesteenstraat@outlook.com)
4. Enter your Outlook credentials:
   - Email: buurtverenigingdesteenstraat@outlook.com
   - Password: Your Outlook password
5. Save the service and note the **Service ID**

### 3. Create Email Templates

#### Contact Form Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it "Contact Form"
4. Use this template:

```
Subject: Nieuw contactformulier bericht - {{subject}}

Beste bestuur,

Er is een nieuw bericht ontvangen via het contactformulier:

Naam: {{from_name}}
E-mail: {{from_email}}
Telefoon: {{from_phone}}
Onderwerp: {{subject}}

Bericht:
{{message}}

Met vriendelijke groet,
{{from_name}}
```

5. Save the template and note the **Template ID**

#### Membership Form Template
1. Create another template named "Membership Form"
2. Use this template:

```
Subject: Nieuwe aanmelding lidmaatschap - {{from_name}}

Beste bestuur,

Er is een nieuwe aanmelding voor lidmaatschap ontvangen:

Naam: {{from_name}}
E-mail: {{from_email}}
Adres: {{from_address}}
Telefoon: {{from_phone}}
Rekening (IBAN NR): {{iban}}
T.N.V.: {{account_holder}}
Inschrijfdatum: {{registration_date}}

Opmerkingen: {{message}}

Met vriendelijke groet,
{{from_name}}
```

3. Save the template and note the **Template ID**

### 4. Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### 5. Update Configuration

#### Option A: Environment Variables (Recommended)
1. Create a `.env.local` file in your project root
2. Add your EmailJS configuration:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id_here
VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID=your_membership_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

#### Option B: Direct Configuration
Open `src/lib/emailjs.ts` and replace the placeholder values:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // From step 2
  TEMPLATE_ID_CONTACT: 'your_contact_template_id_here', // From step 3
  TEMPLATE_ID_MEMBERSHIP: 'your_membership_template_id_here', // From step 3
  PUBLIC_KEY: 'your_public_key_here', // From step 4
};
```

### 6. Test the Forms

1. Start your development server
2. Test both the contact form and membership form
3. Check that emails are received at buurtverenigingdesteenstraat@outlook.com

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- Basic email templates
- Standard support

This should be sufficient for a neighborhood association. If you need more, consider upgrading to a paid plan.

## Security Notes

- The public key is safe to expose in client-side code
- EmailJS handles authentication securely
- No sensitive data is stored on EmailJS servers

## Troubleshooting

If emails aren't being sent:
1. Check the browser console for errors
2. Verify all configuration values are correct
3. Ensure your Outlook account allows "less secure apps" or use an app password
4. Check your EmailJS dashboard for any error messages

## Alternative Services

If EmailJS doesn't work for you, consider:
- **Formspree** - Simple form handling
- **Netlify Forms** - If hosting on Netlify
- **Getform** - Another form backend service

All of these are free for basic usage and provide similar functionality. 