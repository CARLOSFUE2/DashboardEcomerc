<script >
  import { Table, Spinner } from 'sveltestrap';
  import { onMount } from 'svelte';

  let clients;

  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/users`)
      clients= await res.json(); 
  });

 
</script>
<style type="text/css">
  
</style>
<h1>Tabla de Clientes</h1>
<div class="table-responsive">
  <table class="table table-striped table-sm table-hover">  <thead>
    <tr>
      <th>Nombre</th>
      <th>email</th>
      <th>Confirmado?</th>
      <th>¿Ha realizado compras?</th>
    </tr>
  </thead>
  <tbody>
    {#if !clients}
    <div class=" d-flex justify-content-center">
    <Spinner light />
    </div>
    {:else}
{#each clients as client}
    <tr>
      <th><a href="#/customers/{client.id}">{client.name}</a></th>
      <td>{client.email}</td>
      {#if client.confirmed == true }
      <td>si</td>
      {:else}
      <td>no</td>
      {/if}
      {#if client.buyedProducts.length ==0}
      <td>no</td>
      {:else}
      <td>si</td>
      {/if}
        </tr>
    {/each}
    {/if}
   
    
  </tbody>
</table>
</div>

      

