import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendsContainer = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TrendsTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
  font-size: 1.8em;
`;

const TrendsVisualization = ({ goals }) => {
  const completedGoalsByDate = goals.reduce((acc, goal) => {
    if (goal.completed) {
      const date = new Date(goal.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(completedGoalsByDate),
    datasets: [
      {
        label: 'Completed Goals',
        data: Object.values(completedGoalsByDate),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Goal Completion Trend',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Goals'
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <TrendsContainer>
      <TrendsTitle>Your Progress Over Time</TrendsTitle>
      <Line data={data} options={options} />
    </TrendsContainer>
  );
};

export default TrendsVisualization;
