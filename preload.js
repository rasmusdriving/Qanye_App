const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://fast-api-385813.ew.r.appspot.com';
  const form = document.getElementById('upload-form');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = 'Processing...';

    const fileInput = document.getElementById('file');
    const newRentInput = document.getElementById('new-rent');
    const applicationDateInput = document.getElementById('application-date');

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
      const uploadResponse = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();

      const generateData = {
        filename: uploadData.filename,
        new_rent: parseFloat(newRentInput.value),
        application_date: applicationDateInput.value,
      };

      const generateResponse = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generateData),
      });

      if (generateResponse.ok) {
        const generateResult = await generateResponse.json();
        const outputFilename = generateResult.output_path;

        const link = document.createElement('a');
        link.href = `${apiUrl}/download/${outputFilename}`;
        link.download = outputFilename;
        link.click();

        message.textContent = 'Rent Increase Generated! Downloading...';
      } else {
        throw new Error('Error generating rent increase');
      }
    } catch (error) {
      console.error(error);
      message.textContent = 'Error: ' + error.message;
    }
  });
});
