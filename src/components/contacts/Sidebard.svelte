<script >
  import { createEventDispatcher } from 'svelte';
  import { Nav, NavItem, NavLink } from 'sveltestrap';
  import { onMount } from 'svelte';

let contacts =[];
  let contactsRes =[];
  let contactsAct =[];
 onMount(async ()=>{
   const respi =await fetch(`https://api.wynwoodstore.net/contacts`)
      contacts= await respi.json();
      contactsAct =contacts.filter( contact => contact.status == "Pendiente");
      contactsRes =contacts.filter( contact => contact.status !== "Pendiente");
      return contactsRes, contactsAct;
  });

  const dispatch = createEventDispatcher();
  function handleIsOpen(form){
    return dispatch('showForm', {
      form
    })
  }

  
</script>

<div class="cuerpo">
<Nav vertical>
  <label ><h2>Contactos</h2></label>
  <NavItem>
    <NavLink >({contactsAct.length})Sin Responder <img src="https://api.wynwoodstore.net/uploads/inbox_solid_054c77fef3.svg" width="20"></NavLink>
  </NavItem>
  <NavItem>
    <NavLink >({contactsRes.length})Respondidos <img src="https://api.wynwoodstore.net/uploads/envelope_open_text_solid_42eb8f1eb4.svg" width="20"></NavLink>
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