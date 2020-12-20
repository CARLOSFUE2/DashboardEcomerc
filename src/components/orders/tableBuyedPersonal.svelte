<script >
  import { Modal, ModalHeader } from 'sveltestrap';
  import { onMount } from 'svelte';
  import { create } from '../../store.js';
  import axios from 'axios';


 $: $create.nameElement == 'buyed'? reloadProduct() : console.log('probando este beta') ; 

async function reloadProduct() {
  const res =await fetch(`https://api.wynwoodstore.net/ventas`);
    orders = await res.json(); 
}
 
  let orders;
  let order;
  let id;
  let products=[];

  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/ventas`);
    orders = await res.json();    
  });
   async function borrar(id)  {
    const res =await axios.delete(`https://api.wynwoodstore.net/ventas/${id}`)
    console.log(res);
  }
function mostrar(Id){
    id = Id;
    orders.forEach( cont => {if(cont.id == id){
      order = cont;
      products= order.products;
    }})
    toggle()
  }
 
 let isOpen =false;
function toggle(){isOpen = !isOpen;}
  </script>
<style type="text/css">
  
</style>
<Modal {isOpen} >
  <ModalHeader {toggle}>Detalles de la venta</ModalHeader>
  <div class="card" >
<div class="card-body">
  <h5 class="card-title">Factura numero: {order.numberFacture}</h5>
  <h6 class="card-subtitle mb-2 text-muted">cliente: {order.clientName}</h6>
  <h6 class="card-subtitle mb-2 text-muted">fecha: {order.date}</h6>
  <div class="table-responsive">
    <table class="table table-striped table-sm table-hover">  <thead>
      <tr>
        <th>Nombre de producto</th>
        <th>Cantidad</th>
        <th>precio</th>
      </tr>
    </thead>
    <tbody>
      {#each products as item}
       <tr>
        <td>{item.name}</td>
        <td>{item.cuantiti}</td>
        <td>{item.price}</td>           
      </tr>
      {/each}      
    </tbody>
  </table>
  </div>
  <p class="card-title">Total de la venta: {order.total}$</p>
</div>
<hr>
<div class="d-flex justify-content-center " style="margin-bottom:30px;">
<!--button class="btn btn-warning btn-lg" style="margin:auto;">Modificar</button-->
<button class="btn btn-danger btn-lg" on:click={borrar(order.id)} style="margin:auto;">Borrar</button>
</div>
</div>
</Modal>
<h1>Tabla de Ventas Personales</h1>
<div class="table-responsive">
  <table class="table table-striped table-sm table-hover">  <thead>
    <tr>
      <th>Numero de Factura</th>
      <th>Cliente</th>
      <th>Fecha</th>
      <th>Total</th>
      <th>numero de Productos </th>
    </tr>
  </thead>
  <tbody>
    {#if orders}
    {#each orders as item}
     <tr>
      <td><a on:click={mostrar(item.id)}>{item.numberFacture}</a></td>
      <td><a on:click={mostrar(item.id)}>{item.clientName}</a></td>
      <td><a on:click={mostrar(item.id)}>{item.date}</a></td>
      <td><a on:click={mostrar(item.id)}>{item.total}</a></td>
     <td><a on:click={mostrar(item.id)}>{item.products.length}</a></td>            
    </tr>
    {/each} 
    {/if}
   
    
  </tbody>
</table>
</div>
      

