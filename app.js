const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

for (const tab of tabs) {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    panels.forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.target)?.classList.add('active');
  });
}

const students = [
  { id: '202600123', name: 'أحمد علي', faculty: 'حاسب', major: 'علوم الحاسب', status: 'منتظم' },
  { id: '202600124', name: 'سارة محمد', faculty: 'هندسة', major: 'هندسة صناعية', status: 'مستجد' },
  { id: '202600125', name: 'خالد حسن', faculty: 'حاسب', major: 'نظم المعلومات', status: 'منتظم' }
];

const queryInput = document.getElementById('query');
const facultyFilter = document.getElementById('facultyFilter');
const statusFilter = document.getElementById('statusFilter');
const resultsBody = document.getElementById('resultsBody');
const searchBtn = document.getElementById('searchBtn');

function renderRows(rows) {
  if (!resultsBody) return;

  if (rows.length === 0) {
    resultsBody.innerHTML = '<tr><td colspan="5">لا توجد نتائج مطابقة</td></tr>';
    return;
  }

  resultsBody.innerHTML = rows
    .map(
      (s) => `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.faculty}</td>
        <td>${s.major}</td>
        <td>${s.status}</td>
      </tr>
    `
    )
    .join('');
}

function searchStudents() {
  const q = queryInput?.value.trim().toLowerCase() || '';
  const faculty = facultyFilter?.value || 'all';
  const status = statusFilter?.value || 'all';

  const filtered = students.filter((s) => {
    const queryMatch = [s.id, s.name, s.major].join(' ').toLowerCase().includes(q);
    const facultyMatch = faculty === 'all' || s.faculty === faculty;
    const statusMatch = status === 'all' || s.status === status;
    return queryMatch && facultyMatch && statusMatch;
  });

  renderRows(filtered);
}

searchBtn?.addEventListener('click', searchStudents);
queryInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchStudents();
});

renderRows(students);
