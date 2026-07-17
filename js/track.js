function loadTrack() {
  const ticketId = document.getElementById('track-input').value.trim();
  if (!ticketId) return;
  fetch('http://localhost:5000/api/complaints/' + ticketId)
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        const c = result.complaint;
        document.getElementById('track-result').style.display = 'block';
        document.getElementById('track-title').textContent = c.title;
        document.getElementById('track-ticket').textContent = 'Ticket #' + c.ticketId;
        document.getElementById('track-category').textContent = c.category;
        document.getElementById('track-location').textContent = `${c.room}, ${c.block}, ${c.floor}`;
        document.getElementById('track-filed').textContent = c.name + ' (' + c.studentId + ')';
        document.getElementById('track-status').textContent = c.status;
        document.getElementById('track-priority').textContent = c.priority;
      } else {
        showToast('Ticket not found!', 'error');
      }
    })
    .catch(() => showToast('Could not connect to server!', 'error'));
}

function rateStar(n) {
  const stars = document.querySelectorAll('#star-rating span');
  stars.forEach((s,i) => { s.textContent = i < n ? '⭐' : '☆'; });
  showToast(`You rated ${n} star${n>1?'s':''}!`);
}