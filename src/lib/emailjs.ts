import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to sign up at https://www.emailjs.com/ and get these values
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ausshk7',
  TEMPLATE_ID_CONTACT: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_eatg5g1',
  TEMPLATE_ID_MEMBERSHIP: import.meta.env.VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID || 'template_a5d9mf6',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'k67RCxc9Lu7MY2r8J',
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
      {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Niet opgegeven',
        subject: formData.subject,
        message: formData.message,
        to_email: 'buurtverenigingdesteenstraat@outlook.com',
      }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const sendMembershipEmail = async (formData: {
  name: string;
  email: string;
  address: string;
  phone: string;
  iban: string;
  accountHolder: string;
  registrationDate: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_MEMBERSHIP,
      {
        from_name: formData.name,
        from_email: formData.email,
        from_address: formData.address,
        from_phone: formData.phone || 'Niet opgegeven',
        iban: formData.iban,
        account_holder: formData.accountHolder,
        registration_date: formData.registrationDate,
        message: formData.message || 'Geen opmerkingen',
        to_email: 'buurtverenigingdesteenstraat@outlook.com',
      }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export { EMAILJS_CONFIG }; 