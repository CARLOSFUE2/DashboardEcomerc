<script >
  import { Nav, NavItem, NavLink } from 'sveltestrap';
  import { onMount } from 'svelte';
  let clients=[];
  let buyed=[];
  let orders=[];
  let ordersAct =[];
  let ordersPen =[];
  let products =[];
  let categories =[];
  let contacts =[];
  let contactsRes =[];
  let contactsAct =[];
 onMount(async ()=>{
   const respi =await fetch(`https://api.wynwoodstore.net/contacts`)
      contacts= await respi.json();
    const res =await fetch('https://api.wynwoodstore.net/users')
      clients= await res.json();
      const response =await fetch('https://api.wynwoodstore.net/products')
      products= await response.json();
      const responses =await fetch('https://api.wynwoodstore.net/categories')
      categories= await responses.json();
     clients.forEach( client =>{
      client.buyedProducts.forEach(buyed =>
      orders.push(buyed))
     });
     buyed = clients.filter( client => client.buyedProducts !== null);
     ordersPen =orders.filter( order => order.status == "Pendiente");
     ordersAct =orders.filter( order => order.status !== "Pendiente");
     contactsRes = contacts.filter( contact => contact.responded == true);
     contactsAct = contacts.filter( contact => contact.responded == false);

      return clients, ordersAct, ordersPen, categories, products, contactsRes, contactsAct;
  });

  
</script>

<div class="cuerpo">
<Nav vertical>
  <label ><h2>Productos</h2></label>
  <NavItem>
    <NavLink href="#/products">({products.length}) Productos <img src="https://api.wynwoodstore.net/uploads/box_solid_c03e347f57.svg" width="20"> </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#/products">({categories.length}) Categorias <img src="https://api.wynwoodstore.net/uploads/boxes_solid_c14796daea.svg" width="20"></NavLink>
  </NavItem> 
  <hr>
  <label for=""><h2>Ordenes</h2></label>
    <NavItem>
    <NavLink href="#/orders">({ordersPen.length}) Pendientes <img src="https://api.wynwoodstore.net/uploads/people_carry_solid_f68debd31d.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#/orders">({ordersAct.length}) Entregadas <img src="https://api.wynwoodstore.net/uploads/truck_loading_solid_15045d44d3.svg" width="20"></NavLink>
  </NavItem>
  
  <hr>
  <label for=""><h2>Clientes</h2></label>
  <NavItem>
    <NavLink href="#/customers">({clients.length}) Registrados <img src="https://api.wynwoodstore.net/uploads/users_solid_55adfcee81.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#/customers">({buyed.length}) Compradores <img src="https://api.wynwoodstore.net/uploads/user_tie_solid_b8bb8401a3.svg" width="20"></NavLink>
  </NavItem>
  <hr>
  <label for=""><h2>Contactos</h2></label>
  <NavItem>
    <NavLink href="#/contacts">({contactsAct.length})Sin Responder <img src="https://api.wynwoodstore.net/uploads/inbox_solid_054c77fef3.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#/contacts">({contactsRes.length})Respondidos <img src="https://api.wynwoodstore.net/uploads/envelope_open_text_solid_42eb8f1eb4.svg" width="20"></NavLink>
  </NavItem>
</Nav>
<hr/>

</div>
<style>
  .cuerpo{
    background-color: #f8f9fa !important;
    border: 1px solid rgba(0,0,0,.1) ;
    border-radius: 1rem;
    
  }
</style>