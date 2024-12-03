const preprocessImage = async (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Standardize size
      canvas.width = 512;
      canvas.height = 512;

      // Apply preprocessing
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Enhance contrast
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        // Adjust contrast
        const contrast = 1.2;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        
        data[i] = factor * (avg - 128) + 128;     // R
        data[i + 1] = factor * (avg - 128) + 128; // G
        data[i + 2] = factor * (avg - 128) + 128; // B
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.9);
    };

    img.src = URL.createObjectURL(file);
  });
};

export default preprocessImage; 