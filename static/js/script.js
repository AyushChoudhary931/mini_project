document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const resultContainer = document.getElementById('predictionResult');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        
        const inputs = [
            parseFloat(document.getElementById('input1').value),
            parseFloat(document.getElementById('input2').value),
            parseFloat(document.getElementById('input3').value),
            parseFloat(document.getElementById('input4').value),
            parseFloat(document.getElementById('input5').value),
            parseFloat(document.getElementById('input6').value),
            parseFloat(document.getElementById('input7').value)
        ];

        try {
             
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                resultContainer.textContent = `Probability of Class 1: ${data.probability_class_1}`;
                resultContainer.style.color = '#28a745';
            } else {
                resultContainer.textContent = 'Error in prediction';
                resultContainer.style.color = '#dc3545';
            }
        } catch (error) {
            console.error('Error:', error);
            resultContainer.textContent = 'Network or server error';
            resultContainer.style.color = '#dc3545';
        }
    });
});