const adminData = [
  ['RES-2847', 'Aryan T.', 'WiFi not working', 'Block B, Rm 312', 'Internet', 'high', 'progress', '2h ago'],
  ['RES-2846', 'Priya V.', 'Water supply failure', 'Block A, Fl.2', 'Maintenance', 'high', 'urgent', '5m ago'],
  ['RES-2845', 'Rahul S.', 'Fan not working', 'Block C, Rm 108', 'Maintenance', 'medium', 'open', '1h ago'],
  ['RES-2844', 'Sneha M.', 'Toilet clogged', 'Block C, Fl.1', 'Maintenance', 'high', 'progress', '2h ago'],
  ['RES-2843', 'Karan P.', 'Broken window pane', 'Room 215', 'Maintenance', 'low', 'resolved', '4h ago'],
  ['RES-2842', 'Divya R.', 'Noise disturbance', 'Floor 4', 'Noise', 'medium', 'resolved', '6h ago'],
  ['RES-2841', 'Amit K.', 'No hot water', 'Block D, Fl.3', 'Maintenance', 'medium', 'open', '8h ago'],
  ['RES-2840', 'Riya S.', 'Corridor light out', 'Block A, Fl.3', 'Electricity', 'low', 'resolved', '10h ago'],
  ['RES-2839', 'Nikhil T.', 'Internet slow', 'Block B, Rm 205', 'Internet', 'medium', 'progress', '11h ago'],
  ['RES-2838', 'Pooja L.', 'Mess hygiene issue', 'Dining Hall', 'Cleanliness', 'high', 'open', '12h ago'],
];
const prioMap = { high:'p-high', medium:'p-medium', low:'p-low' };
const statLabel = { urgent:'Urgent', open:'Open', progress:'In Progress', resolved:'Resolved' };
const dotMap = { urgent:'d-urgent', open:'d-open', progress:'d-progress', resolved:'d-resolved' };
let activeFilter = 'all';

function buildAdminTable() {
  const tbody = document.getElementById('admin-tbody');
  tbody.innerHTML = '';
  adminData.forEach(row => {
    const [tid, student, issue, loc, cat, prio, stat, time] = row;
    if(activeFilter !== 'all' && activeFilter !== stat) return;
    tbody.innerHTML += `<tr>
      <td style="color:var(--primary);font-weight:600;">${tid}</td>
      <td>${student}</td>
      <td>${issue}</td>
      <td style="color:var(--text-muted)">${loc}</td>
      <td><span style="font-size:0.8rem;color:var(--text-muted)">${cat}</span></td>
      <td><span class="priority-badge ${prioMap[prio]}">${prio.charAt(0).toUpperCase()+prio.slice(1)}</span></td>
      <td><span class="status-dot"><span class="dot ${dotMap[stat]}"></span>${statLabel[stat]}</span></td>
      <td style="color:var(--text-muted);font-size:0.82rem">${time}</td>
      <td><div class="action-btns">
        <button class="act-btn" onclick="showToast('Opening ${tid}...')">View</button>
        <button class="act-btn" onclick="showToast('Assigning ${tid}...')">Assign</button>
        <button class="act-btn resolve" onclick="resolveComplaint(this,'${tid}')">Resolve</button>
      </div></td>
    </tr>`;
  });
}

function filterAdmin(el, filter) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeFilter = filter;
  buildAdminTable();
}

function resolveComplaint(btn, tid) {
  btn.closest('tr').querySelector('.status-dot').innerHTML = `<span class="dot d-resolved"></span> Resolved`;
  showToast(`${tid} marked as resolved!`);
}

buildAdminTable();