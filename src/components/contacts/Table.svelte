<script>
  import { Table, Spinner, Modal, ModalFooter,
    ModalHeader } from 'sveltestrap';
  import { onMount } from 'svelte';

  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/contacts`)
      contacts= await res.json();
      contacts = contacts.filter( contact => contact.responded == true);
      contacts.forEach(contact =>{
      	contact.lead.created_at= contact.lead.created_at.substr(0,10);
      	contact.created_at = contact.created_at.substr(0,10);
      })
  });
  let id ='';
  let contacts =[];
  let contact ={};
  function mostrar(Id){
  	id = Id;
  	contacts.forEach( cont => {if(cont.id == id){
  		contact = cont;
  	}})
  	toggle()
  }
 let isOpen =false;
function toggle(){isOpen = !isOpen;}
</script>
  <Modal {isOpen} >
  	<ModalHeader {toggle}>Contacto efectuado por {contact.lead.firstName} {contact.lead.lastName}</ModalHeader>
  	<div class="card" >
  <div class="card-body">
    <h5 class="card-title">{contact.lead.firstName} {contact.lead.lastName}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{contact.lead.created_at}</h6>
    <p class="card-text">{contact.message}</p>
</div>
  <hr>
  <div class="card-body">
  <h5 class="card-title"> Tu respuesta</h5>
    <h6 class="card-subtitle mb-2 text-muted">{contact.created_at}</h6>
    <p class="card-text">{contact.response}</p>

</div>
</div>
  </Modal>
  <h1>Tabla de Emails contestados</h1>
      <div class="table-responsive">
        <table class="table table-striped table-sm table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>email</th>
              <th>fecha de contacto</th>
              <th>fecha de respuesta</th>
            </tr>
          </thead>
          <tbody>
         {#each contacts as contact}
            <tr>
              <td><a on:click={mostrar(contact.id)}>{contact.id}</a></td>
              <td><a on:click={mostrar(contact.id)}>{contact.lead.firstName} {contact.lead.lastName}</a></td>
              <td><a on:click={mostrar(contact.id)}>{contact.lead.email}</a></td>
              <td><a on:click={mostrar(contact.id)}>{contact.lead.created_at}</a></td>
              <td><a on:click={mostrar(contact.id)}>{contact.created_at}</a></td>
            </tr>
         {/each} 
           </tbody>
       </table>
   </div>