async function getData() {
    const response = await fetch("youtube_subscribers_data.csv");
    const data = await response.text();
    return data;
}

async function fetchGraph() {
    getData()
    .then((data) => {
        const ctx = document.getElementById('myChart');
        const rows = data.split("\n").slice(1);
        const youtubers = rows.map((row) => row.split(",")[0])
        const subscribers = rows.map((row) => row.split(",")[2])


        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: youtubers,
            datasets: [{
                label: 'Number of Subscribers',
                data: subscribers,
                borderColor: 'rgba(75, 192, 192, 1)', // Line color (light teal)
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color (light teal, optional)
                borderWidth: 3
            }]
            },
            options: {
                plugins: {
                    title: {
                        display: true, // Display the title
                        text: 'Youtuber Subscribers in 2024', // Title text
                        font: {
                            size: 24, // Font size (larger for more prominence)
                            family: 'Arial', // Font family
                            weight: 'bold' // Font weight (optional)
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 14, // Font size for x-axis labels
                                family: 'Verdana', // Font family for x-axis labels
                                weight: 'normal' // Font weight for x-axis labels
                            }
                        },
                        grid: {
                            color: 'rgba(117, 117, 255, 0.5)', // Color of the grid lines
                            lineWidth: 1 // Line width of grid lines
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 14, // Font size for y-axis labels
                                family: 'Verdana', // Font family for y-axis labels
                                weight: 'normal' // Font weight for y-axis labels
                            },
                            callback: function(value) {
                                return value + 'M'; // Degree symbol for y-axis ticks
                            }
                        },
                        grid: {
                            color: 'rgba(117, 117, 255, 0.5)', // Color of the grid lines
                            lineWidth: 1 // Line width of grid lines
                        }
                    }
                }
            }
        });
    })
    .catch((error) => console.log(error))
}


fetchGraph()