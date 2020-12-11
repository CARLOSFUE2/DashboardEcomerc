import { writable } from 'svelte/store';


export const toast = writable({
	isOpen: false,
	title: '',
	message: '',
	color: ''
}); 

let store = localStorage.getItem('User');


export const authUser = writable(store ? JSON.parse(store) : null);
authUser.subscribe((value) => {
  if (value) localStorage.setItem('User', JSON.stringify(value));
  else localStorage.removeItem('User'); // for logout
}); 

export const create = writable({
  nameElement: '', 
  element:{},
});

export const elementEdit= writable({
  nameElement: '',
  element:{}
});

