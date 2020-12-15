<script >
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';
    import {push, pop, replace} from 'svelte-spa-router'
   import { authUser } from '../store.js';
  
  let isOpen = false;
  function closeSession(event){
    $authUser=null;
    push('/login');
  }

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

{#if $authUser}
<Navbar color="dark" dark expand="md">
  <NavbarBrand href="#/"><img src="https://api.wynwoodstore.net/uploads/small_logo_Blanco_3a8678b995.png" alt="" width="120" height="60"></NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="#/">Inicio</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/products">Productos</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/orders">Pedidos</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/customers">Clientes</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/contacts">Contactos</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/ml">Mercado Libre</NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>{$authUser.user.name}</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem on:click={closeSession}>Cerrar Sesion</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Collapse>
</Navbar>
{/if}