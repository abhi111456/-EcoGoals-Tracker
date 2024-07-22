import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaLeaf, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import GoalCategorySelect from './GoalCategory';
import RewardSystem from './RewardSystem';
import TrendsVisualization from './TrendsVisualization';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GoalTrackerContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;

  @media (max-width: 600px) {
    font-size: 1.8em;
    margin-bottom: 20px;
  }
`;

const GoalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2ecc71;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 14px;

    svg {
      margin-right: 4px;
    }
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;

const FilterButton = styled(Button)`
  background-color: ${props => props.active ? '#3498db' : '#bdc3c7'};
  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#95a5a6'};
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const GoalList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const GoalItem = styled.li`
  background-color: ${props => props.completed ? '#e8f5e9' : '#ffffff'};
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const GoalText = styled.span`
  flex-grow: 1;
  margin-right: 10px;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#7f8c8d' : '#2c3e50'};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const GoalCategoryLabel = styled.span`
  font-size: 0.9em;
  color: #7f8c8d;
  margin-right: 10px;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const GoalActions = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;

const ActionButton = styled(Button)`
  padding: 8px 12px;
  font-size: 14px;

  @media (max-width: 600px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const PriorityLabel = styled.span`
  font-size: 0.9em;
  color: ${props => props.priority === 'high' ? '#e74c3c' : props.priority === 'medium' ? '#f39c12' : '#2ecc71'};
  margin-right: 10px;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const DateLabel = styled.span`
  font-size: 0.9em;
  color: #7f8c8d;

  @media (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 15px;
  }
`;

const Progress = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: #27ae60;
  transition: width 0.5s ease-in-out;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const Stat = styled.div`
  text-align: center;

  h3 {
    font-size: 1.2em;
    color: #34495e;
    margin-bottom: 5px;

    @media (max-width: 600px) {
      font-size: 1em;
    }
  }

  p {
    font-size: 1.5em;
    color: #27ae60;
    font-weight: bold;

    @media (max-width: 600px) {
      font-size: 1.2em;
    }
  }
`;

const Notification = styled.div`
  background-color: #f39c12;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1em;

  @media (max-width: 600px) {
    font-size: 0.9em;
    padding: 8px;
  }
`;

const PrioritySelect = ({ priority, setPriority }) => (
  <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
    <option value="">Select Priority</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </Select>
);

const GoalsTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('sustainabilityGoals'));
    if (storedGoals) {
      setGoals(storedGoals);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sustainabilityGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim() !== '' && category && priority && dueDate) {
      setGoals([...goals, { id: Date.now(), text: newGoal, category, priority, dueDate, completed: false, createdAt: new Date() }]);
      setNewGoal('');
      setCategory('');
      setPriority('');
      setDueDate(null);
    }
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return !goal.completed;
    if (filter === 'completed') return goal.completed;
    return true;
  });

  const completedPercentage = (goals.filter(goal => goal.completed).length / goals.length) * 100 || 0;

  const getNotification = () => {
    const today = new Date();
    const notifications = goals.filter(goal => {
      const dueDate = new Date(goal.dueDate);
      const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);
      return !goal.completed && diffDays <= 3;
    });
    return notifications.length > 0 ? `${notifications.length} goal(s) nearing due date!` : null;
  };

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
        <GoalCategorySelect category={category} setCategory={setCategory} />
        <PrioritySelect priority={priority} setPriority={setPriority} />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} placeholderText="Select Due Date" />
        <Button type="submit" disabled={!category || !priority || !newGoal.trim() || !dueDate}>
          <FaLeaf /> Add Goal
        </Button>
      </GoalForm>
      <FilterButtons>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
        <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>Active</FilterButton>
        <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</FilterButton>
      </FilterButtons>
      {getNotification() && <Notification>{getNotification()}</Notification>}
      <GoalList>
        {filteredGoals.map(goal => (
          <GoalItem key={goal.id} completed={goal.completed}>
            <GoalText completed={goal.completed}>{goal.text}</GoalText>
            <GoalCategoryLabel>{goal.category}</GoalCategoryLabel>
            <PriorityLabel priority={goal.priority}>{goal.priority}</PriorityLabel>
            <DateLabel>{new Date(goal.dueDate).toLocaleDateString()}</DateLabel>
            <GoalActions>
              <ActionButton onClick={() => toggleGoal(goal.id)}>
                {goal.completed ? <FaUndo /> : <FaCheck />}
              </ActionButton>
              <ActionButton onClick={() => deleteGoal(goal.id)}>
                <FaTrash />
              </ActionButton>
            </GoalActions>
          </GoalItem>
        ))}
      </GoalList>
      <ProgressBar>
        <Progress percentage={completedPercentage} />
      </ProgressBar>
      <Stats>
        <Stat>
          <h3>Goals</h3>
          <p>{goals.length}</p>
        </Stat>
        <Stat>
          <h3>Completed</h3>
          <p>{goals.filter(goal => goal.completed).length}</p>
        </Stat>
      </Stats>
      <RewardSystem completedGoals={goals.filter(goal => goal.completed).length} />
      <TrendsVisualization goals={goals} />
    </GoalTrackerContainer>
  );
};

export default GoalsTracker;
