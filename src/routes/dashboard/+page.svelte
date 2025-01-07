<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let data;
  let yearChartCanvas;
  let studioChartCanvas;
  let ratingChartCanvas;

  onMount(() => {
    // Line Chart (Animes pro Jahr)
    new Chart(yearChartCanvas, {
      type: 'line',
      data: {
        labels: data.yearStats.map(d => d.year),
        datasets: [
          {
            label: 'Animes pro Jahr',
            data: data.yearStats.map(d => d.count),
            borderColor: '#ff00ff',
            backgroundColor: '#ff00ff20',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#00ffcc' }
          }
        },
        scales: {
          y: {
            grid: { color: '#1a1a1a' },
            ticks: { color: '#00ffcc' }
          },
          x: {
            grid: { color: '#1a1a1a' },
            ticks: { color: '#00ffcc' }
          }
        }
      }
    });

    // Bar Chart (Top Studios)
    new Chart(studioChartCanvas, {
      type: 'bar',
      data: {
        labels: data.topStudios.map(d => d.name),
        datasets: [
          {
            label: 'Animes pro Studio',
            data: data.topStudios.map(d => d.count),
            backgroundColor: '#00ffcc'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#00ffcc' }
          }
        },
        scales: {
          y: {
            grid: { color: '#1a1a1a' },
            ticks: { color: '#00ffcc' }
          },
          x: {
            grid: { color: '#1a1a1a' },
            ticks: { color: '#00ffcc' }
          }
        }
      }
    });

  });
</script>

<div class="main-content">
  <h1>DASHBOARD</h1>

  <div class="stats">
    <div class="stat">
      <h2>Animes</h2>
      <div class="value">{data.animeCount}</div>
    </div>
    <div class="stat">  
      <h2>Genres</h2>
      <div class="value">{data.genreCount}</div>
    </div>
    <div class="stat">
      <h2>Studios</h2> 
      <div class="value">{data.studioCount}</div>
    </div>
    <div class="stat">
      <h2>Ø Rating</h2>
      <div class="value">{data.avgRating}</div>
    </div>
  </div>

  <div class="charts">
    <div class="chart">
      <h2>Animes pro Jahr</h2>
      <canvas bind:this={yearChartCanvas}></canvas>
    </div>
    <div class="chart">
      <h2>Top Studios</h2>
      <canvas bind:this={studioChartCanvas}></canvas>
    </div>
  </div>
</div>

<style>
  h1 {
    color: #000000;
    font-size: 2.5rem;
    text-align: center;
    margin: 2rem 0;
    animation: fadeIn 0.5s ease-in-out;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .stat {
    background: #1a1a1a;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    border: 2px solid #ff00ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;
  }

  .stat:hover {
    transform: translateY(-5px);
  }

  .stat h2 {
    color: #00ffcc;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .value {
    color: #00ffff;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .chart {
    background: #1a1a1a;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid #ff00ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    min-height: 300px;
  }

  .chart h2 {
    color: #00ffcc;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>