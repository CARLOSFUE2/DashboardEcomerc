<script >
    import { Table, Spinner } from 'sveltestrap';
    import { onMount } from 'svelte';
    import { create } from '../../store.js'
  
 // $: $create.nameElement == 'category'? reloadProduct() : console.log('probando este beta') ; 
  
 /* async function reloadProduct() {
    const res =await fetch(`http://localhost:1337/categories`)
        categories= await res.json();
        console.log(categories);
        return categories;
  } */
  
  
    onMount(async ()=>{
      const res =await fetch(`http://localhost:1337/notificationsmercadolibres`)
        notifications= await res.json();
        console.log(notifications);
        return notifications;
    });
  
    let notifications =[];
   
  </script>
  <style type="text/css">
    
  </style>
  <h1>Notificaciones   <button class="btn btn-primary " style="margin:auto"> Actualizar</button>
  </h1>
  <div class="table-responsive">
    <table class="table table-striped table-sm table-hover">  <thead>
      <tr>
        <th>Nombre</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
      {#if notifications}
      {#each notifications as notification}
      <tr>
      <th>{notification.topic}</th>
        <td>{notification.received}</td>
      </tr>
      {/each}
      {/if}
    </tbody>
  </table>
  </div>
  
        
  
  