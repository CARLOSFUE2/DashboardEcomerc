import { writable } from 'svelte/store';

//export const authUser = writable(null);

export const toast = writable({
	isOpen: false,
	title: '',
	message: '',
	color: ''
}); 

let authUser = localStorage.getItem('User');


export const store = writable(authUser ? JSON.parse(authUser) : null);
store.subscribe((value) => {
  if (value) localStorage.setItem('User', JSON.stringify(value));
  else localStorage.removeItem('User'); // for logout
}); 

/*
const createWritableStore = (user, startValue) => {
  const { subscribe, set } = writable(startValue);
  
  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(user);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        localStorage.setItem(user, JSON.stringify(current));
      });
    }
  };
}

export const store = createWritableStore('store', 0); */