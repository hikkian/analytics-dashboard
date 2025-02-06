let chartInstance = null;

document.getElementById('loadBtn').addEventListener('click', async () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    try {
        // Устанавливаем время конечной даты на 23:59:59.999
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        const endDateFormatted = endDateObj.toISOString();

        // Формируем URL с параметрами
        const url = new URL('http://localhost:5000/api/measurements');
        url.searchParams.append('field', 'field1');
        url.searchParams.append('start_date', startDate);
        url.searchParams.append('end_date', endDateFormatted);

        // Загрузка данных
        const dataRes = await fetch(url);
        const data = await dataRes.json();

        if (data.length === 0) {
            alert("No data found!");
            return;
        }

        // Загрузка метрик
        const metricsUrl = new URL('http://localhost:5000/api/measurements/metrics');
        metricsUrl.searchParams.append('field', 'field1');
        metricsUrl.searchParams.append('start_date', startDate);
        metricsUrl.searchParams.append('end_date', endDateFormatted);
        
        const metricsRes = await fetch(metricsUrl);
        const metrics = await metricsRes.json();

        // Обновление метрик
        document.getElementById('avg').textContent = metrics.avg.toFixed(2);
        document.getElementById('min').textContent = metrics.min.toFixed(2);
        document.getElementById('max').textContent = metrics.max.toFixed(2);
        document.getElementById('stdDev').textContent = metrics.stdDev.toFixed(2);

        // Подготовка данных для графика
        const timestamps = data.map(d => new Date(d.timestamp));
        const values = data.map(d => d.field1);

        // Уничтожение старого графика
        if (chartInstance) chartInstance.destroy();

        // Создание нового графика
        const ctx = document.getElementById('chart').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Field1',
                    data: values.map((v, i) => ({ x: timestamps[i], y: v })),
                    borderColor: '#007bff',
                    tension: 0.1,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            displayFormats: { hour: 'HH:mm' },
                            tooltipFormat: 'PPpp'
                        },
                        title: { display: true, text: 'Time' }
                    },
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Value' }
                    }
                }
            }
        });

    } catch (err) {
        console.error("Error:", err);
        alert("Error loading data!");
    }
});