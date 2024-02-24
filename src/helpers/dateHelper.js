export function formatPublishedAt(timestamp) {
  const date = new Date(timestamp);
  
  const day = getDayName(date);
  const month = getMonthName(date);
  const formattedTime = getTimeString(date);

  return `${day}, ${date.getDate()} ${month}${formattedTime}`;
}

function getDayName(date) {
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  return days[date.getUTCDay()];
}

function getMonthName(date) {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return months[date.getUTCMonth()];
}

function getTimeString(date) {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `, ${hours}.${minutes}`;
}

// Example usage:
const formattedDateTime = formatPublishedAt('2024-02-21T17:04:15Z');
console.log(formattedDateTime); // Output: Kam, 21 Februari, 17.04
