// components/RewardSystem.js
import React from 'react';
import styled from 'styled-components';
import { FaTrophy } from 'react-icons/fa';

const RewardContainer = styled.div`
  background-color: #fdf6e3;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
`;

const RewardTitle = styled.h3`
  color: #b58900;
  margin-bottom: 10px;
`;

const RewardText = styled.p`
  color: #657b83;
`;

const RewardSystem = ({ completedGoals }) => {
  const getReward = (count) => {
    if (count >= 20) return "Sustainability Master";
    if (count >= 10) return "Eco Warrior";
    if (count >= 5) return "Green Innovator";
    if (count >= 1) return "Eco Starter";
    return "Set your first goal!";
  };

  return (
    <RewardContainer>
      <RewardTitle><FaTrophy /> Your Eco Rank</RewardTitle>
      <RewardText>{getReward(completedGoals)}</RewardText>
    </RewardContainer>
  );
};

export default RewardSystem;