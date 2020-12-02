<script>
     import Router, { push } from 'svelte-spa-router';
     import {wrap} from 'svelte-spa-router/wrap'
	   import Header from './main/Header.svelte';
     import Orders from './routes/Orders.svelte';
     import Customers from './routes/Customers.svelte';
     import Products from './routes/Products.svelte';
     import Product from './routes/Product.svelte';
     import clientProfile from './routes/clientProfile.svelte';
     import Facture from './routes/Facture.svelte';
     import Category from './routes/Category.svelte';
     import Login from './routes/Login.svelte';
     import Contacts from './routes/Contacts.svelte';
     import Toast from './components/Toast.svelte';
     import Home from './routes/Home.svelte';
     import { store } from './store.js';
     //let store = localStorage.getItem('User');


  let isOpen = false;

  let routes={
    '/':wrap({
        // Use a dynamically-loaded component for this
        component: Home,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    
    '/products':wrap({
        // Use a dynamically-loaded component for this
        component: Products,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/products/:slug':wrap({
        // Use a dynamically-loaded component for this
        component: Product,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/products/category/:slug':wrap({
        // Use a dynamically-loaded component for this
        component: Category,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/orders':wrap({
        // Use a dynamically-loaded component for this
        component: Orders,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/orders/:id/:idFacture':wrap({
        // Use a dynamically-loaded component for this
        component: Facture,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/customers':wrap({
        // Use a dynamically-loaded component for this
        component: Customers,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/customers/:id':wrap({
        // Use a dynamically-loaded component for this
        component: clientProfile,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
    '/contacts':wrap({
        // Use a dynamically-loaded component for this
        component: Contacts,
        // Adding one pre-condition that's an async function
        conditions: [
            async (detail) => {
                // Make a network request, which are async operations
                if ($store) {
                  return true;
                } else {
                  push('/login');
                  return false;
                }
            }
        ]
    }),
        '/login':Login,

  }

</script>
<div >
<Header />
<div class="container-fluid">
  <div class="row">



<Router {routes} />

</div>
</div>
<Toast/>
</div>
<style>
  
</style>