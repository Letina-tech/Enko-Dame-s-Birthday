
  // ---- Mobile nav ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // ---- Stars background ----
  const starsLayer = document.getElementById('starsLayer');
  const starCount = 70;
  for(let i=0;i<starCount;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random()*2.2 + 1;
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*70+'%';
    s.style.animationDelay = (Math.random()*3.5)+'s';
    s.style.animationDuration = (2.5+Math.random()*3)+'s';
    starsLayer.appendChild(s);
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // ---- Countdown ----
  // Set the target date/time for the party here:
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3); // placeholder: 30 days from now

  function updateCountdown(){
    const now = new Date();
    let diff = targetDate - now;
    if(diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Gallery lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxIcon = document.getElementById('lightboxIcon');
  const lightboxStage = document.getElementById('lightboxStage');
  const lightboxNote = document.getElementById('lightboxNote');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxIcon.textContent = item.dataset.icon;
      lightboxStage.textContent = item.dataset.stage;
      lightboxNote.textContent = item.dataset.note;
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });

  // ---- RSVP attend toggle ----
  const attendYes = document.getElementById('attendYes');
  const attendNo = document.getElementById('attendNo');
  const attendValue = document.getElementById('attendValue');
  attendYes.addEventListener('click', () => {
    attendValue.value = 'yes';
    attendYes.classList.add('active-yes');
    attendNo.classList.remove('active-no');
  });
  attendNo.addEventListener('click', () => {
    attendValue.value = 'no';
    attendNo.classList.add('active-no');
    attendYes.classList.remove('active-yes');
  });

  // ---- RSVP submit ----
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpConfirm = document.getElementById('rsvpConfirm');
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    rsvpForm.classList.add('hidden');
    rsvpConfirm.classList.add('show');
  });

  // ---- Wishes ----
  const wishForm = document.getElementById('wishForm');
  const wishGrid = document.getElementById('wishGrid');
  const wishEmpty = document.getElementById('wishEmpty');
  wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim();
    const text = document.getElementById('wishText').value.trim();
    if(!name || !text) return;
    if(wishEmpty) wishEmpty.remove();
    const card = document.createElement('div');
    card.className = 'wish-card';
    const p = document.createElement('p');
    p.textContent = '"' + text + '"';
    const who = document.createElement('div');
    who.className = 'who';
    who.textContent = '— ' + name;
    card.appendChild(p);
    card.appendChild(who);
    wishGrid.prepend(card);
    wishForm.reset();
  });
