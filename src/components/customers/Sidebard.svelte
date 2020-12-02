<script >
  import { createEventDispatcher } from 'svelte';
  import { Nav, NavItem, NavLink } from 'sveltestrap';
  import { onMount } from 'svelte';
  let clients=[];
  let buyed=[];
  let orders=[];
 onMount(async ()=>{
 
    const res =await fetch('https://api.wynwoodstore.net/users')
      clients= await res.json();
     clients.forEach( client =>{
      client.buyedProducts.forEach(buyed =>
      orders.push(buyed))
     });
     buyed = clients.filter( client => client.buyedProducts !== null);      
      return client, buyed;
  });
  let isOpen = false;

  const dispatch = createEventDispatcher();
  function handleIsOpen(){
    isOpen = !isOpen;

    return dispatch('showForm', {
      isOpen
    })
  }

</script>

<div class="cuerpo">
<Nav vertical>
  <label><h2>Clientes</h2></label>
  <NavItem>
    <NavLink on:click={handleIsOpen}>Registrar <img src="https://api.wynwoodstore.net/uploads/door_open_solid_83baf71dc7.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#">({clients.length}) Registrados <img src="https://api.wynwoodstore.net/uploads/users_solid_55adfcee81.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#">({buyed.length}) Compradores <img src="https://api.wynwoodstore.net/uploads/user_tie_solid_b8bb8401a3.svg" width="20"></NavLink>
  </NavItem>
</Nav>
<hr/>
</div>
<style>
  .cuerpo{
       background-color: #f8f9fa !important;
    border: 1px solid rgba(0,0,0,.1) ;
    border-radius: 1rem
  }
</style>