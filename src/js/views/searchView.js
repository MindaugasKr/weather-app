import { elements } from './base.js';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {elements.searchInput.value = ''};