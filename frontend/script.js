const API_URL = '/api/iot';

async function sendData() {
    const deviceId = document.getElementById('deviceId').value;
    const temperature = document.getElementById('temperature').value;
    const status = document.getElementById('status');

    try {
        const response = await fetch(`${API_URL}/data?deviceId=${deviceId}&temperature=${temperature}`, {
            method: 'POST'
        });
        if (response.ok) {
            status.textContent = 'Данные успешно отправлены!';
            status.style.color = 'green';
            loadData();
        } else {
            throw new Error('Ошибка сервера');
        }
    } catch (error) {
        status.textContent = 'Ошибка отправки данных!';
        status.style.color = 'red';
    }
}

async function loadData() {
    try {
        const response = await fetch(`${API_URL}/data`);
        const data = await response.json();

        const tbody = document.querySelector('#dataTable tbody');
        tbody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.deviceId}</td>
                <td>${item.temperature} °C</td>
                <td>${new Date(item.timestamp).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

window.onload = loadData;