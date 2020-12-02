<script >
  import { Table, Spinner, Modal, ModalFooter,
    ModalHeader  } from 'sveltestrap';
  import { onMount } from 'svelte';

  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/offers`)
      offers= await res.json();
      offers.forEach(offer =>{
      offer.created_at = offer.created_at.substr(0,10); 
      })});

  let offers =[];
  let offer={};
  let id='';
   function mostrar(Id){
    id = Id;
    offers.forEach( cont => {if(cont.id == id){
      offer = cont;
    }});
    toggle();
  }
 let isOpen =false;
function toggle(){isOpen = !isOpen;}
</script>
 <Modal {isOpen} >
    <ModalHeader {toggle}>Detalles de la Oferta</ModalHeader>
    <div class="card" >
  <div class="card-body">
    <h5 class="card-title">Titulo: {offer.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Descripcion: {offer.description}</h6>
    <h6 class="card-subtitle mb-2 text-muted">Nuevo precio: {offer.newPrice}</h6>
    <h6 class="card-subtitle mb-2 text-muted">Publicada: {offer.created_at}</h6>
    <p class="card-text">Producto: {offer.product.title}</p>
    <p class="card-text">Precio Original: {offer.product.price}</p>
</div>
</div>
  </Modal>
{#if offers} 
<h1>Ofertas</h1>
<div class="table-responsive">
  <table class="table table-striped table-sm table-hover">  <thead>
    <tr>
      <th>Titulo</th>
      <th>Descripcion</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Oferta</th>
      <th>Publicada</th>
    </tr>
  </thead>
  <tbody>
    
    {#each offers as offer}
    <tr>
      <th><a on:click={mostrar(offer.id)}>{offer.title}</a></th>
      <td><a on:click={mostrar(offer.id)}>{offer.description}</a></td>
      <td><a on:click={mostrar(offer.id)}>{offer.product.title}</a></td>
      <td><a on:click={mostrar(offer.id)}>{offer.product.price}</a></td>
      <td><a on:click={mostrar(offer.id)}>{offer.newPrice}</a></td>
      <td><a on:click={mostrar(offer.id)}>{offer.created_at}</a></td>
    </tr>
    {/each}    
  </tbody>
</table>
</div>
 {/if}

