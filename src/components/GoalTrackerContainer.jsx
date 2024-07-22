import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaLeaf, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import GoalCategory from './GoalCategory';
import RewardSystem from './RewardSystem';
import TrendsVisualization from './TrendsVisualization';

// ... (previous styled components remain the same)

const PersonalSustainabilityGoalsTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('');

  // ... (previous useEffect hooks remain the same)

  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim() !== '' && category) {
      setGoals([...goals, { id: Date.now(), text: newGoal, category, completed: false, createdAt: new Date() }]);
      setNewGoal('');
      setCategory('');
    }
  };

  // ... (previous toggleGoal and deleteGoal functions remain the same)

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return !goal.completed;
    if (filter === 'completed') return goal.completed;
    return true;
  });

  const completedPercentage = (goals.filter(goal => goal.completed).length / goals.length) * 100 || 0;

  return (
    <GoalTrackerContainer>
      <Title>🌿 EcoGoals Tracker</Title>
      <GoalForm onSubmit={addGoal}>
        <Input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new sustainability goal"
        />
        <GoalCategory category={category} setCategory={setCategory} />
        <Button type="submit" disabled={!category}><FaLeaf /> Add Goal</Button>
      </GoalForm>
      <div>
        <Button onClick={() => setFilter('all')}>All</Button>
        <Button onClick={() => setFilter('active')}>Active</Button>
        <Button onClick={() => setFilter('completed')}>Completed</Button>
      </div>
      <GoalList>
        {filteredGoals.map(goal => (
          <GoalItem key={goal.id} completed={goal.completed}>
            <GoalText completed={goal.completed}>{goal.text}</GoalText>
            <span>Category: {goal.category}</span>
            <GoalActions>
              <CompleteButton
                completed={goal.completed}
                onClick={() => toggleGoal(goal.id)}
              >
                {goal.completed ? <FaUndo /> : <FaCheck />}
                {goal.completed ? 'Undo' : 'Complete'}
              </CompleteButton>
              <DeleteButton onClick={() => deleteGoal(goal.id)}>
                <FaTrash /> Delete
              </DeleteButton>
            </GoalActions>
          </GoalItem>
        ))}
      </GoalList>
      <ProgressBar>
        <Progress percentage={completedPercentage} />
      </ProgressBar>
      <Stats>
        <Stat>
          <h3>Total Goals</h3>
          <p>{goals.length}</p>
        </Stat>
        <Stat>
          <h3>Completed</h3>
          <p>{goals.filter(goal => goal.completed).length}</p>
        </Stat>
        <Stat>
          <h3>Completion Rate</h3>
          <p>{completedPercentage.toFixed(1)}%</p>
        </Stat>
      </Stats>
      <RewardSystem completedGoals={goals.filter(goal => goal.completed).length} />
      <TrendsVisualization goals={goals} />
    </GoalTrackerContainer>
  );
};

export default PersonalSustainabilityGoalsTracker;