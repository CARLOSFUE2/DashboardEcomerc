<script >
  import { createEventDispatcher } from 'svelte';
  import { Nav, NavItem, NavLink } from 'sveltestrap';

  const dispatch = createEventDispatcher();
  function handleIsOpen(form){
    return dispatch('showForm', {
      form
    })
  }

  
</script>

<div class="cuerpo">
<Nav vertical>
  <label ><h2>Productos</h2></label>
  <NavItem>
    <NavLink on:click={() => handleIsOpen('products')}>Crear Producto <img src="https://api.wynwoodstore.net/uploads/box_solid_c03e347f57.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink on:click={() => handleIsOpen('category')}>Crear Categoria <img src="https://api.wynwoodstore.net/uploads/boxes_solid_c14796daea.svg" width="20"></NavLink>
  </NavItem> 
  <NavItem>
    <NavLink on:click={() => handleIsOpen('offer')}>Crear Oferta <img src="https://api.wynwoodstore.net/uploads/hand_holding_usd_solid_5a68d50ba4.svg" width="20"></NavLink>
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