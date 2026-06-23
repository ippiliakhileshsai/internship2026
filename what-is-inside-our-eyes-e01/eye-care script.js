// Care Hub Accordion Interaction
const careCards = document.querySelectorAll('.care-card');

careCards.forEach(card => {
  card.addEventListener('click', () => {
    const isCurrentlyExpanded = card.classList.contains('expanded');

    // Collapse all cards
    careCards.forEach(c => c.classList.remove('expanded'));

    // If it wasn't expanded, expand it
    if (!isCurrentlyExpanded) {
      card.classList.add('expanded');
    }
  });

  // Support Keyboard Navigation
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});
