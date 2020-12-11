<script >
  import { Table, Spinner } from 'sveltestrap';
  import { onMount } from 'svelte';
  import { create } from '../../store.js'

$: $create.nameElement == 'category'? reloadProduct() : console.log('probando este beta') ; 

async function reloadProduct() {
  const res =await fetch(`http://localhost:1337/categories`)
      categories= await res.json();
      console.log(categories);
      return categories;
}


  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/categories`)
      categories= await res.json();
      console.log(categories);
      return categories;
  });

  let categories =[];
 
</script>
<style type="text/css">
  
</style>
<h1>Categorias</h1>
<div class="table-responsive">
  <table class="table table-striped table-sm table-hover">  <thead>
    <tr>
      <th>Nombre</th>
      <th>Cantidad de productos</th>
    </tr>
  </thead>
  <tbody>
    {#if categories}
    {#each categories as categorie}
    <tr>
      <th><a href="#/products/category/{categorie.slug}">{categorie.name}</a></th>
      <td>{categorie.products.length}</td>
    </tr>
    {/each}
    {/if}
  </tbody>
</table>
</div>

      

