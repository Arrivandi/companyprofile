document.addEventListener('DOMContentLoaded', () => {
  // FILTER
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const category = item.dataset.category;
        item.style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
      });
    });
  });

  // LIGHTBOX
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-description');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentIndex = 0;
  let currentGallery = [];

  function updateLightboxContent(item) {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxTitle.textContent = item.dataset.title;
    lightboxDesc.textContent = item.dataset.description;
  }

  function openLightbox(index, list) {
    currentGallery = list;
    currentIndex = index;
    lightbox.style.display = 'block';
    updateLightboxContent(currentGallery[currentIndex]);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const visibleItems = [...galleryItems].filter(el => el.style.display !== 'none');
      const visibleIndex = visibleItems.indexOf(item);
      openLightbox(visibleIndex, visibleItems);
    });
  });

  closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxContent(currentGallery[currentIndex]);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxContent(currentGallery[currentIndex]);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
});
