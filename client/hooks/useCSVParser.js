export const parseUPICSV = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').slice(1); // Skip header
      resolve(rows.map(row => row.split(',')));
    };
    reader.readAsText(file);
  });
};