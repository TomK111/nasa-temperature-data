// Data from : https://data.giss.nasa.gov/gistemp/
const xlabels = [];
const ytemps = [];

chartIt();
getData();

async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Temperature C°',
                data: ytemps,
                fill: true,
                backgroundColor: ['rgba(77, 5, 232, 1)'],
                borderColor: [
                    ['rgba(77, 5, 232, 1)'],
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                duration: 3000,
            },
            scales: {
                yAxes: [
                    { 
                    ticks: {
                        easing: 'linear',
                        responsive: true,
                        fontColor:"white",
                        callback: function (value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    });

    async function getData() {
        const response = await fetch('ZonAnn.Ts+dSST.csv')
        const data = await response.text();
    

        const table = data.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(',');
            const year = columns[0];
            xlabels.push(year);
            const temp = columns[1];
            ytemps.push(parseFloat(temp)+14);
            console.log(year, temp);
        })
    }
}
