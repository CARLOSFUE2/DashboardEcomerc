<script >
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { create } from '../../store.js';
  import axios from 'axios'


$: $create.nameElement == 'product'? reloadProduct() : console.log('probando este beta') ; 

async function reloadProduct() {
  const res =await fetch(`https://api.wynwoodstore.net/products`)
      products= await res.json(); 
        if(category !== undefined) {
        let res = products.filter(product => product.categories[0].name === category.name);
        products= res;
        return products;      
       }
}
 async function outstandingProduct(id){
  const data = products.find( item => item.id= id);
  console.log(data.outstanding) 
  const item=!data.outstanding;
  console.log(item);
  const res = await axios.put(`https://api.wynwoodstore.net/products/${id}`,{outstanding:item});
  console.log(res);
  reloadProduct()
}

  const dispatch = createEventDispatcher();
  function handleIsOpen(form){
    return dispatch('showForm', {
      form
    })
  }

  export let category;

  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/products`)
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
    <!-- svelte-ignore empty-block -->
    {#if products.length == 0}
    
    {:else}
{#each products as product}
    <tr>
      <th>{product.stock}</th>
      <td><a href="#/products/{product.slug}">{product.title}</a></td>
      <td>{product.price}</td>
      <td><a href="#/products/category/{product.categories[0].slug}">{product.categories[0].name}</a></td>
      {#if product.outstanding == true} 
      <td > <button class="btn btn-warning" on:click={outstandingProduct(product.id)}>remover</button></td>
      {:else}
      <td> <button class="btn btn-primary" on:click={outstandingProduct(product.id)}>destacar</button></td>
      {/if}
      {#if product.offer}
      <td  class="text-success" style="margin:auto">Si</td>
      <td >{product.offer.newPrice}</td>

      {:else}
      <td class="text-danger" style="margin:auto">No</td>
      <td>Nulo</td>
      {/if}
    </tr>
    {/each}
    {/if}
   
    
  </tbody>
 </table>
</div>


      

