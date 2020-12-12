<script >
  import { Modal, ModalHeader } from 'sveltestrap';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { toast } from '../../store.js'

 
 let clients =[];
  let orders=[];
  let order;
  let id;
  let idFacture;
  let idClient;
  let status;
  let products=[];

  onMount(async ()=>{
    const res =await fetch('http://localhost:1337/users')
      clients= await res.json();
      let clientOrders = [];
      let clientName;
      let clientId;
      clients.forEach(client =>  {
        if (client.buyedProducts) {
          clientName= client.name;
          clientId= client.id;
          client.buyedProducts.forEach(order => {
            clientOrders.push({...order,clientName,clientId});
          })
        }
      })
      orders = clientOrders;
  });
function mostrar(Id){
    id = Id;
    orders.forEach( cont => {if(cont.id == id){
      order = cont;
      products= order.cart;
    }})
    toggle()
  }
  async function modifiOrder(){
    const res =await fetch('http://localhost:1337/users')
      clients= await res.json();
      let clientOrders = [];
      let clientName;
      let clientId;
      clients.forEach(client =>  {
        if (client.buyedProducts) {
          clientName= client.name;
          clientId= client.id;
          client.buyedProducts.forEach(order => {
            clientOrders.push({...order,clientName,clientId});
          })
        }
      })
      orders = clientOrders;
  }

 const handleToast = (data) => {
  $toast = {
    isOpen: true,
    title: data.title,
    message: data.message,
    color: data.color
  }
}
  async function modifyStatus(idclient,idfacture, change){
   try{ idFacture=idfacture;
    idClient=idclient;
    status=change;
    let body = {idFacture, status}
    const res = await axios.put(`http://localhost:1337/users/${idClient}`,
   {... body });
   toggle();
   handleToast({
   title:"Estatus Modificado",
   message: "el estatus fue modificado satisfactoriamente aparecera en la tabla",
   color:'success'
        })
   modifiOrder();
    } catch (error){
      handleToast({
      title:"Error",
      message: "por favor intente de nuevo",
      color:'danger'
        })
      throw error;
     
    }
  }
 let isOpen =false;
function toggle(){isOpen = !isOpen;}
  </script>
<style type="text/css">
  
</style>
 <Modal {isOpen} >
    <ModalHeader {toggle}>¿Entregaste este pedido? </ModalHeader>
    <div class="card" >
  <div class="card-body">
    <h5 class="card-title">factura numero:{order.orderId} de {order.clientName}</h5>
    <p class="card-text">fecha:{order.date}</p>
    <!--p class="card-text">con los siguientes productos:</p>
    <{#each products as product }
     <p class="card-text">{product.title}</p>
    {/each} -->
    <p class="card-text">Total:{order.totalPrice}</p>
   <div class=" d-flex justify-content-center">
  <button class="btn btn-success" on:click={modifyStatus(order.clientId, order.id, 'Entregado')} style="margin:auto">Entregado</button>
  <button class="btn btn-success" on:click={modifyStatus(order.clientId, order.id, 'En_Proceso')} style="margin:auto">Procesando</button>
  <button class="btn btn-warning" on:click={modifyStatus(order.clientId, order.id, 'Devuelto')} style="margin:auto">Devuelto</button>
  <button class="btn btn-danger" on:click={modifyStatus(order.clientId, order.id, 'No_Entregado')} style="margin:auto">Cancelado</button>
 </div>
 <div class="d-flex" style="margin-top:5px;"> 
   <button class="btn btn-danger btn-lg " on:click={toggle} style="margin:auto;">Cancelar</button>
 </div>
</div>
</div>
</Modal>
<h1>Tabla de Ordenes</h1>
<div class="table-responsive">
  <table class="table table-striped table-sm table-hover">  <thead>
    <tr>
      <th>Numero de Orden</th>
      <th>Cliente</th>
      <th>Fecha</th>
      <th>Total</th>
      <th>Estatus</th>
      <th>numero de Productos </th>
    </tr>
  </thead>
  <tbody>
    {#if orders}
    {#each orders as item}
     <tr>
      <td><a href="#/orders/{item.clientId}/{item.orderId}">{item.orderId}</a></td>
      <td><a href="#/customers/{item.clientId}">{item.clientName}</a></td>
      <td>{item.date}</td>
      <td>{item.totalPrice}</td>
      {#if item.status == "Pendiente" || item.status == "No_Entregado"}
      <td style="color:red"><a on:click={mostrar(item.id)}>{item.status}</a></td>
      {:else if item.status == "Devuelto"}

      <td class="text-warning"><a on:click={mostrar(item.id)}>{item.status}</a></td>

      {:else}
      <td style="color:green"><a on:click={mostrar(item.id)}>{item.status}</a></td>
      {/if}
      
      <td>{item.cart.length}</td>
            
    </tr>
    {/each} 
    
    {/if}
   
    
  </tbody>
</table>
</div>
      

