import { Resend } from 'resend';
import EmailTemplate from './email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, code) => {
  const { data, error } = await resend.emails.send({
    from: 'MyToDo <noreply@sabaris.site>',
    to: [email],
    subject: 'Hello world',
    react: EmailTemplate({ coderec: code }),
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data }; // Ensure to return success and data if no error
};
