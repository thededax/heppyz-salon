/* ═══════════════════════════════════════════════════════
   HEPPYZ SALON — WhatsApp Booking Logic
   ═══════════════════════════════════════════════════════ */

const WHATSAPP_NUMBER = '919297547403';

// ─── GENERIC BOOK NOW BUTTONS ───
document.querySelectorAll('[data-wa-book]').forEach(btn => {
  btn.addEventListener('click', () => {
    const service = btn.dataset.waBook || 'General Appointment';
    const msg = `Hi Heppyz Salon! 👋\nI'd like to book an appointment for: *${service}*\nPlease confirm availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
});

// ─── CONTACT PAGE BOOKING FORM ───
const bookingForm = document.querySelector('#whatsapp-booking-form');
if (bookingForm) {
  bookingForm.querySelector('#book-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const service = bookingForm.querySelector('#service').value;
    const name = bookingForm.querySelector('#name').value.trim();
    const datetime = bookingForm.querySelector('#datetime').value.trim();

    if (!service || !name || !datetime) {
      alert('Please fill in all fields before booking.');
      return;
    }

    const msg = `Hi Heppyz! 🙏\n\nI'd like to book an appointment:\n\n*Service:* ${service}\n*Name:* ${name}\n*Preferred Time:* ${datetime}\n\nPlease confirm!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}
