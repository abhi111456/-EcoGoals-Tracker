// GoalCategory.js
import React from 'react';
import styled from 'styled-components';

const CategorySelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

const GoalCategorySelect = ({ category, setCategory }) => {
  return (
    <CategorySelect value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">Select a category</option>
      <option value="energy">Energy Saving</option>
      <option value="waste">Waste Reduction</option>
      <option value="water">Water Conservation</option>
      <option value="transport">Sustainable Transport</option>
      <option value="food">Sustainable Food</option>
    </CategorySelect>
  );
};

export default GoalCategorySelect;