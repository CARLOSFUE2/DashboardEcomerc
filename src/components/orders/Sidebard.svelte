<script >
  import { createEventDispatcher } from 'svelte';
  import { Nav, NavItem, NavLink } from 'sveltestrap';
  import { onMount } from 'svelte';

   onMount(async ()=>{
    const res =await fetch('https://api.wynwoodstore.net/users')
      let clients= await res.json();
      clients.forEach( client =>{
      client.buyedProducts.forEach(buyed =>
      orders.push(buyed))
     });
     let buyed = clients.filter( client => client.buyedProducts !== null);
     ordersPen =orders.filter( order => order.status == "Pendiente");
     ordersAct =orders.filter( order => order.status !== "Pendiente");
    
      return ordersAct, ordersPen;
  });

  let isOpen = false;
  let orders=[];
  let ordersAct =[];
  let ordersPen =[];
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
  <NavItem>
    <label ><h2>Pedidos</h2></label>
    <NavLink >({ordersPen.length})  Pendientes <img src="https://api.wynwoodstore.net/uploads/people_carry_solid_f68debd31d.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#">({ordersAct.length}) Entregados <img src="https://api.wynwoodstore.net/uploads/truck_loading_solid_15045d44d3.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink on:click={handleIsOpen} >Registrar Venta <img src="https://api.wynwoodstore.net/uploads/handshake_solid_193ee3d9ac.svg" width="20"></NavLink>
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