<script>
import { Table, Spinner } from 'sveltestrap';
import { onMount } from 'svelte';
export let params;
  let client={};
  let orders =[];
  onMount(async ()=>{
  	let clientId;
  	let apoyo=[];
  	let arreglo=[];
    const res =await fetch(`http://localhost:1337/users/${params.id}`)
      client= await res.json();
      clientId =client.id;
      apoyo= client.buyedProducts;
      apoyo.forEach(item => {
      	arreglo.push({...item,clientId});
      })    
      orders=arreglo;
      console.log(orders);
      return orders;
  });

	
</script>
{#if orders !== null}
<h1>Tabla de Facturas</h1>
<div class="table-responsive">
  <table class="table table-striped table-sm table-hover">  <thead>
    <tr>
      <th>Numero de Orden</th>
      <th>Fecha</th>
      <th>Total</th>
      <th>Estatus</th>
      <th>numero de Productos</th>
    </tr>
  </thead>
  <tbody>
   
    {#each orders as item}
     <tr>
      <td><a href="#/orders/{item.clientId}/{item.orderId}">{item.orderId}</a></td>
      <td>{item.date}</td>
      <td>{item.totalPrice}</td>
      {#if item.status == "Pendiente"}
      <td style="color:red">{item.status}</td>
      {:else}
      <td style="color:green">{item.status}</td>
      {/if}
      <td>{item.cart.length}</td>
            
    </tr>
    {/each} 
   
    
  </tbody>
</table>
</div>
{/if}
