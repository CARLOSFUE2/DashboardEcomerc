<script >
  import { Card, CardBody } from 'sveltestrap';
  import Sidebard from '../components/products/Sidebard.svelte';
  import Table from '../components/products/Table.svelte';

  import { onMount } from 'svelte';
  let category ={};
  let products =[];
  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/categories/${params.slug}`)
      category= await res.json();
      console.log(category);
  });

  export let params;
</script>
<Sidebard/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Productos</h1>
<hr>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{category.name} </h5>
    <h6 class="card-subtitle mb-2 text-muted">Identificador url: {category.slug}</h6>
    
  
  </div>
</div>
<Table {category}/>
</main>