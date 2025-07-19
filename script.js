let currentSlide = 0;
const totalSlides = 5;
let quantities = [1, 1, 1, 1, 1];

function moveCarousel(direction) {
  const carousel = document.getElementById('carousel');
  const items = carousel.children;
  
  // Remove center class from current item
  items[currentSlide].classList.remove('center');
  
  // Update current slide
  currentSlide += direction;
  
  // Handle wrap around
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  
  // Add center class to new current item
  items[currentSlide].classList.add('center');
  
  // Calculate transform
  const itemWidth = 330; // 300px width + 30px margins
  const offset = -(currentSlide * itemWidth) + (window.innerWidth / 2) - (itemWidth / 2);
  
  carousel.style.transform = `translateX(${offset}px)`;
}

function changeQuantity(itemIndex, change) {
  quantities[itemIndex] += change;
  if (quantities[itemIndex] < 1) {
    quantities[itemIndex] = 1;
  }
  document.getElementById(`qty-${itemIndex}`).textContent = quantities[itemIndex];
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.classList.remove('modal-open');
}

function submitRequest() {
  // Get form data (not stored anywhere as requested)
  const formData = {
    dishName: document.getElementById('dishName').value,
    customerName: document.getElementById('customerName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    description: document.getElementById('description').value
  };
  
  // Simple validation
  if (!formData.dishName || !formData.customerName || !formData.email) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Show success message and close modal
  alert('Thank you! Your dish request has been submitted successfully.');
  
  // Reset form
  document.getElementById('requestForm').reset();
  
  // Close modal
  closeModal();
}

// Initialize carousel position
window.addEventListener('load', function() {
  moveCarousel(0);
});

// Handle window resize
window.addEventListener('resize', function() {
  moveCarousel(0);
});

// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});
