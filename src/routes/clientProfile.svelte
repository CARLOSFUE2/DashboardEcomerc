<script>
  import {  Card, CardBody, Button, ModalBody, Modal, ModalFooter, ModalHeader } from 'sveltestrap';
  import { toast } from '../store.js';
  import Sidebard from '../components/customers/Sidebard.svelte';
  import Table from '../components/customers/TableBuyed.svelte';
  import Form from '../components/customers/formCreateClient.svelte';
  import FormEdit from '../components/customers/formEditClient.svelte';
  import { onMount } from 'svelte';
  import {push, pop, replace} from 'svelte-spa-router';
  import axios from 'axios';
  export let params;
  let client={};
  let form = {};
  let id = params.id;
  onMount(async ()=>{
  const res =await fetch(`http://localhost:1337/users/${params.id}`)
      client= await res.json();
      form =client; 
      return client , form;
  });

  let isOpen = false;
  let Open = false;
  let isOpenModal=false;
  const handleToast = (data) => {
  $toast = {
    isOpen: true,
    title: data.title,
    message: data.message,
    color: data.color
  }
}
  async function deleteClient(id){
    try{
      const resp = await axios.delete(`http://localhost:1337/users/${id}`);
        handleToast({
        title:"Cliente fue eliminado",
        message: "El cliente fue eliminado satisfactoriamente",
        color:'success'
        }) 
          push('/customers'); 

    }catch (error){
      console.log(error);
       handleToast({
        title:"Error",
        message: "El Cliente no fue eliminado, intentelo de nuevo",
        color:'danger'
        }) 
    } 
  }

const openForm =(event)=>{
  Open =!Open;
} 
const handleIsOpen = (event) => {
  isOpen = event.detail.isOpen;
}
function toggle(){isOpenModal = !isOpenModal;}

</script>
<Modal isOpen={isOpenModal} {toggle}>
    <ModalHeader {toggle}>Eliminar Cliente</ModalHeader>
    <ModalBody>
      ¿Esta seguro de que desea borrar a: {client.name}?
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={deleteClient(client.id)}>Borrar</Button>
      <Button color="danger" on:click={toggle}>Cancelar</Button>
    </ModalFooter>
  </Modal>
<Sidebard on:showForm={handleIsOpen}/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Clientes</h1>
<hr>
<div class="row">
     
      <div class="col-lg-12 d-flex flex-column align-items-center">
        <img src="https://img2.freepng.es/20181206/gec/kisspng-computer-icons-user-profile-portable-network-graph-go-to-image-page-5c08b9d570aa08.2752372515440757334615.jpg"  height="140"  width="140" style="border-radius: 100%" alt="">
        <h2>{client.name} </h2>
        <p>{client.email}</p>
        <p>{client.location}</p>
        {#if client.confirmed == true}
        <p>Confirmado: Si</p>
        {:else}
        <p>Confirmado: No</p>
        {/if}
        
        <p><button class="btn btn-secondary" on:click={openForm} >Editar Datos del Cliente</button>  
         <button class="btn btn-danger" on:click={toggle}>Borrar</button></p>
      </div> 
</div>
<FormEdit {Open} {form} {id}/>
<Form {isOpen}/>
<Table {params}/>
</main>