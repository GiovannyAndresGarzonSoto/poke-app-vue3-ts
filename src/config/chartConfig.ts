

export const data = {
  labels: [
    'Hp',
    'AtaEsp',
    'DefEsp',
    'Velocidad',
    'Defensa',
    'Ataque',
  ],
  datasets: [
    {
      label: 'Es.tadisticas',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [100, 80, 70, 120, 90, 120],
    }
  ],
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      suggestedMin: 10, // Valor mínimo sugerido para la escala radial
    }
  },
  beginAtZero: true,
}