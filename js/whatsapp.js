'use strict';
/* ═══════════════════════════════════════════════════════
   HEPPYZ SALON — WhatsApp Booking Dispatcher & Form Handlers
   ═══════════════════════════════════════════════════════ */

(function () {

const WHATSAPP_NUMBER = '919297547403';

// ─── 1. GENERIC BOOK NOW BUTTONS ───
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-wa-book]');
  if (!btn) return;

  const service = btn.dataset.waBook || 'General Appointment';
  const msg = `Hi Heppyz Salon! 👋\nI'd like to book an appointment for: *${service}*\nPlease confirm availability.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
});

// ─── 2. APPOINTMENT BOOKING HUB DISPATCHER ───
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('appointment-booking-form') || document.getElementById('whatsapp-booking-form');
  if (!bookingForm) return;

  const waSubmitBtn = document.getElementById('book-whatsapp-submit') || document.getElementById('book-submit');
  const onlineSubmitBtn = document.getElementById('book-online-submit');

  function getBookingPayload() {
    const nameInput = bookingForm.querySelector('#name') || bookingForm.querySelector('input[name="name"]');
    const phoneInput = bookingForm.querySelector('#phone') || bookingForm.querySelector('input[name="phone"]');
    const dateInput = bookingForm.querySelector('#date') || bookingForm.querySelector('input[name="date"]') || bookingForm.querySelector('#datetime');
    const timeSlotInput = bookingForm.querySelector('#selected-time-slot') || bookingForm.querySelector('.time-slot-pill.active');
    const stylistSelect = bookingForm.querySelector('#stylist');
    const singleServiceSelect = bookingForm.querySelector('#service');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const date = dateInput ? dateInput.value.trim() : 'Earliest Available';
    const timeSlot = timeSlotInput ? (timeSlotInput.value || timeSlotInput.dataset?.slot || timeSlotInput.innerText?.trim()) : 'Morning (10:00 AM – 1:00 PM)';
    const stylist = stylistSelect ? stylistSelect.value : 'Any Available Expert';

    // Retrieve selected services from storage or fall back to single select
    let services = [];
    try {
      const stored = sessionStorage.getItem('heppyz_selected_services');
      if (stored) services = JSON.parse(stored);
    } catch (e) {}

    if ((!services || services.length === 0) && singleServiceSelect && singleServiceSelect.value) {
      services = [{
        name: singleServiceSelect.value,
        priceText: ''
      }];
    }

    return { name, phone, date, timeSlot, stylist, services };
  }

  // A. Dispatch to WhatsApp
  if (waSubmitBtn) {
    waSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { name, phone, date, timeSlot, stylist, services } = getBookingPayload();

      if (!name) {
        alert('Please enter your name before booking.');
        const nameInput = bookingForm.querySelector('#name');
        if (nameInput) nameInput.focus();
        return;
      }

      if (services.length === 0) {
        const confirmAny = confirm('You have not selected any service from the rate card. Would you like to proceed with a general appointment consultation?');
        if (!confirmAny) {
          const rateCard = document.getElementById('rate-card');
          if (rateCard) rateCard.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }

      let servicesListText = '';
      let totalAmount = 0;
      let totalDuration = 0;

      if (services.length > 0) {
        servicesListText = services.map(s => `  • ${s.name} ${s.priceText ? '(' + s.priceText + ')' : ''}`).join('\n');
        totalAmount = services.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
        totalDuration = services.reduce((sum, s) => sum + (Number(s.duration) || 0), 0);
      } else {
        servicesListText = '  • General Salon Appointment & Consultation';
      }

      let msg = `*NEW APPOINTMENT BOOKING — HEPPYZ SALON*\n` +
                `━━━━━━━━━━━━━━━━━━━━━━\n` +
                `👤 *Client Name:* ${name}\n` +
                (phone ? `📱 *Phone / WhatsApp:* ${phone}\n` : '') +
                `📅 *Preferred Date:* ${date}\n` +
                `⏰ *Time Slot:* ${timeSlot}\n` +
                (stylist && stylist !== 'Any' ? `✂️ *Preferred Stylist:* ${stylist}\n` : '') +
                `\n💇 *Selected Services:*\n${servicesListText}\n` +
                `\n━━━━━━━━━━━━━━━━━━━━━━\n` +
                (totalDuration > 0 ? `⏱ *Estimated Duration:* ~${totalDuration} Mins\n` : '') +
                (totalAmount > 0 ? `💰 *Estimated Total:* ₹${totalAmount}\n` : '') +
                `\nHi Heppyz, please confirm my appointment slot! 🙏`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    });
  }

  // B. Instant Online Booking Confirmation
  if (onlineSubmitBtn) {
    onlineSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { name, phone, date, timeSlot, stylist, services } = getBookingPayload();

      if (!name) {
        alert('Please enter your name to reserve a slot.');
        const nameInput = bookingForm.querySelector('#name');
        if (nameInput) nameInput.focus();
        return;
      }

      const bookingRef = 'HEP-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = services.reduce((sum, s) => sum + (Number(s.price) || 0), 0);

      // Render on-screen confirmation card
      const formContainer = bookingForm.parentElement;
      if (formContainer) {
        formContainer.innerHTML = `
          <div style="background:var(--bg-card); border:2px solid var(--accent-sage); border-radius:var(--radius-xl); padding:36px; text-align:center; animation:fadeIn 0.4s ease;">
            <div style="width:56px; height:56px; border-radius:50%; background:var(--accent-sage-light); color:var(--accent-sage); display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
              <span class="material-symbols-outlined" style="font-size:32px;">check_circle</span>
            </div>
            <h3 style="font-family:var(--font-display); font-size:1.6rem; color:var(--text-primary); margin-bottom:8px;">Slot Reserved Successfully!</h3>
            <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:20px;">
              Thank you, <strong>${name}</strong>! Your appointment reference is <strong style="color:var(--accent-coral); font-family:var(--font-mono);">${bookingRef}</strong>.
            </p>
            <div style="background:var(--bg-sand); border-radius:var(--radius-md); padding:16px; margin-bottom:24px; text-align:left; font-size:0.88rem;">
              <div style="margin-bottom:6px;"><strong>Date & Time:</strong> ${date} • ${timeSlot}</div>
              <div style="margin-bottom:6px;"><strong>Stylist:</strong> ${stylist}</div>
              <div style="margin-bottom:6px;"><strong>Services:</strong> ${services.map(s => s.name).join(', ') || 'General Consultation'}</div>
              ${totalAmount > 0 ? `<div><strong>Estimated Bill:</strong> <span style="font-family:var(--font-mono); font-weight:700; color:var(--accent-coral);">₹${totalAmount}</span> (No advance payment needed)</div>` : ''}
            </div>
            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
              <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Heppyz, I just booked slot ref ${bookingRef} for ${name} on ${date}.`)}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-whatsapp"></i> Send WhatsApp Copy
              </a>
              <button type="button" class="btn btn-secondary" onclick="window.location.reload()">Book Another Slot</button>
            </div>
          </div>
        `;
      }
    });
  }
});

})();
