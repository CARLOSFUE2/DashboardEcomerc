<script >
  import { Table, Spinner } from 'sveltestrap';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { create } from '../../store.js'



$: if($create.element == 'product'){
      console.log('roladfromproducts')
}


  const dispatch = createEventDispatcher();
  function handleIsOpen(form){
    return dispatch('showForm', {
      form
    })
  }

  export let category;

  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/products`)
      products= await res.json(); 
        if(category !== undefined) {
        let res = products.filter(product => product.categories[0].name === category.name);
        products= res;
        return products;      
       }
  });

  let products =[];
 
</script>
<style type="text/css">
  
</style>
<h1>Tabla de Inventario</h1>
 <div class="table-responsive">
  <table class="table table-striped table-sm table-hover">
  <thead>
    <tr>
      <th>Stock</th>
      <th>Producto</th>
      <th>Precio</th>
      <th>Categoria</th>
      <th>Destacado</th>
      <th>¿Oferta?</th>
      <th>precio de oferta</th>
    </tr>
  </thead>
  <tbody>
    {#if products.length == 0}
    
    {:else}
{#each products as product}
    <tr>
      <th>{product.stock}</th>
      <td><a href="#/products/{product.slug}">{product.title}</a></td>
      <td>{product.price}</td>
      <td><a href="#/products/category/{product.categories[0].slug}">{product.categories[0].name}</a></td>
      {#if product.outstanding == true} 
      <td class="text-primary">Si</td>
      {:else}
      <td class="text-danger">No</td>
      {/if}
      {#if product.offer}
      <td >Si</td>
      <td >{product.offer.newPrice}</td>

      {:else}
      <td >No</td>
      <td>Nulo</td>
      {/if}
    </tr>
    {/each}
    {/if}
   
    
  </tbody>
 </table>
</div>


      

