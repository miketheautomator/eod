import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export interface BookingEmailData {
  engineerName: string;
  engineerRate: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  companyName?: string;
  date: string;
  startTime?: string;
  description?: string;
  isASAP: boolean;
}

export async function sendBookingEmail(data: BookingEmailData) {
  const timing = data.isASAP ? 'ASAP (immediate assistance needed)' : `${data.date} at ${data.startTime}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        🚨 New Engineer Booking Request
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Engineer Details</h3>
        <p><strong>Engineer:</strong> ${data.engineerName}</p>
        <p><strong>Rate:</strong> $${(data.engineerRate / 60).toFixed(1)}/min ($${data.engineerRate}/hour)</p>
      </div>

      <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #28a745; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${data.clientName}</p>
        <p><strong>Email:</strong> ${data.clientEmail}</p>
        ${data.clientPhone ? `<p><strong>Phone:</strong> ${data.clientPhone}</p>` : ''}
        ${data.companyName ? `<p><strong>Company:</strong> ${data.companyName}</p>` : ''}
      </div>

      <div style="background: ${data.isASAP ? '#fff3cd' : '#d1ecf1'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: ${data.isASAP ? '#856404' : '#0c5460'}; margin-top: 0;">
          ${data.isASAP ? '⚡ URGENT REQUEST' : '📅 Scheduled Request'}
        </h3>
        <p><strong>When:</strong> ${timing}</p>
      </div>

      ${data.description ? `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #6c757d; margin-top: 0;">Project Description</h3>
          <p style="white-space: pre-wrap;">${data.description}</p>
        </div>
      ` : ''}

      <div style="margin: 30px 0; padding: 15px; background: #e9ecef; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
          This booking request was submitted through the Engineer On Demand platform.
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `${data.isASAP ? '🚨 URGENT' : '📅 New'} Booking Request - ${data.engineerName}`,
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Booking email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending booking email:', error);
    throw error;
  }
}