<script>
  import { Table, Spinner, Modal, ModalFooter, ModalHeader, Button } from 'sveltestrap';
  import { onMount } from 'svelte';
  import axios from 'axios';


  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/contacts`)
      contacts= await res.json();
      contacts = contacts.filter( contact => contact.response == null);
      contacts.forEach(contact =>{
      	contact.lead.created_at= contact.lead.created_at.substr(0,10);
      	contact.created_at = contact.created_at.substr(0,10);
      })
      console.log(contacts);
  });
  let id ='';
  let contacts =[];
  let contact ={};
  let response='';
  let form={}
  async function submit(id){
    contact.response = response;
    contact.responded =true;
    form =contact;
    console.log(form);
    let data = form;
    try{
    const resp = await axios.put(`http://localhost:1337/contacts/${id}`, 
       data
      );
    console.log(resp);
   toggle();
  }catch (error){
    console.log(error)
  }
  }
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
</div>
<form on:submit|preventDefault={submit(contact.id)} style="margin:10px; background: whitesmoke">
  <div class="form-group">
    <label for="exampleFormControlTextarea">Escribe tu respuesta</label>
    <textarea class="form-control" rows="2"  bind:value={response}></textarea>
    </div>
    <div class=" d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" style="margin:auto">Responder</button>
    <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

    </div>
</form>  </Modal>
  <h1>Tabla de Emails sin contestar</h1>
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