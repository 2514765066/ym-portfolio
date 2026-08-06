import { proxy } from 'valtio';

export const categoryState = proxy({
  selectedCategory: 'all',
});

export const setSelectedCategory = (category: string) => {
  categoryState.selectedCategory = category;
};
