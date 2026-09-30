document.documentElement.classList.add('js');

// mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// call transcripts: reveal line by line once in view
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.call[data-play]').forEach(call => {
  const items = [...call.querySelectorAll('.transcript li'), ...call.querySelectorAll('.receipt')];
  const play = () => items.forEach((el, i) => setTimeout(() => el.classList.add('shown'), reduce ? 0 : 400 + i * 900));
  if (!('IntersectionObserver' in window)) return play();
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { play(); io.disconnect(); }
  }, { threshold: .35 });
  io.observe(call);
});

// canned answers for the dashboard demo
const answers = {
  catering: 'Catering inquiries are up 29% over 30 days, led by Midtown (+44%) and Lakeview (+31%). 9 inquiries have no reply yet; they have been routed to each catering lead.',
  missed: 'Missed calls fell from 61 to 14 this week. Most of the remaining misses are between 6:30 and 7:15 PM on Fridays.',
  ticket: 'Average phone order value is $41.80, up $4.10 since upsell suggestions were switched on. Drinks and sides drive most of the lift.',
  default: 'This is a demo. Try asking about catering, missed calls, or average ticket.'
};
document.querySelectorAll('[data-ask]').forEach(form => {
  const input = form.querySelector('input');
  const out = form.parentElement.querySelector('.ask-answer');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.toLowerCase();
    const key = q.includes('cater') ? 'catering' : q.includes('miss') ? 'missed' : (q.includes('ticket') || q.includes('order value') || q.includes('average')) ? 'ticket' : 'default';
    out.textContent = answers[key];
  });
});
