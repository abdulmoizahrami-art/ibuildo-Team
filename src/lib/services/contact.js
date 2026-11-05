// All network code for the contact form lives here, away from the UI.
// Today it only simulates success. To receive real requests, replace the body
// with a fetch() to your backend / Formspree / Telegram bot, e.g.:
//   const res = await fetch('https://formspree.io/f/XXXX', { method: 'POST', body: JSON.stringify(data) });
//   if (!res.ok) throw new Error('Request failed');
export async function sendProject(data) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.info('Project request (not sent anywhere yet):', data);
}
