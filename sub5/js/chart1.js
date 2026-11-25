const data = {
  labels: ['2023년', '2024년', '2025년'],
  datasets: [
    {
      label: '매출액',
      data: [63223, 71550, 69151],
      backgroundColor: '#6c7a89',
      borderColor: '#6c7a89',
      borderWidth: 1,
      borderRadius: 4
    },
    {
      label: '영업이익',
      data: [3590, 2728, 2718],
      backgroundColor: '#00664f',
      borderColor: '#00664f',
      borderWidth: 1,
      borderRadius: 4
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
      },
      subtitle: {
        display: true,
        text: '(단위: 억원)',
        align: 'start',
        padding: {
          bottom: 10
        },
        font: {
          size: 12,
          weight: 'normal'
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: function(value) {
          return value.toLocaleString();
        },
        font: {
          weight: 'bold',
          size: 12,
        },
        color: '#333'
      }
    }
  },
  plugins: [ChartDataLabels]
};

// 캔버스에 차트 생성 실행
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);