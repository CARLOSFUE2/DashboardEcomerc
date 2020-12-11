<script >
import {  Modal,  ModalHeader} from 'sveltestrap';
import { toast, elementEdit } from '../../store.js'
import { onMount } from 'svelte';
import axios from 'axios';

onMount(async ()=>{
  const res  =await axios.get('http://localhost:1337/categories');
  categories = res.data;
});
export let product;
let categories;
let	files;
let statusCode = "";


  async function submit(e) {
    try{
  	if (product) {
      	const formData = new FormData();
      	formData.append('data', JSON.stringify(product));
    	
      	if (files !== undefined) {

    	formData.append("files.images", files[0]);
      	}
      	const resp = await fetch(`http://localhost:1337/products/${product.id}`, {
    		method: "PUT",
    		body:formData
      }); 
        statusCode = resp.status;
        toggle();
        handleToast({
        title:"Producto Modificado",
        message: "El producto fue modificado satisfactoriamente aparecera en la tabla",
        color:'success'
        }) 
        change({
          name:'product',
          element: product
        })
    }
  }catch (error){
    console.log(error);
     toggle();
      handleToast({
        title:"Error",
        message: "El producto no fue modififcado, por favor revise los datos y repita la operacion",
        color:'danger'
        })

  }
}

const handleToast = (data) => {
  $toast = {
    isOpen: true,
    title: data.title,
    message: data.message,
    color: data.color
  }
}
function change (value){
  $elementEdit = {
    nameElement:value.name,
    elementEdit: value.element
  }
}

function toggle(){isOpenProducts = !isOpenProducts}
export let isOpenProducts; 


$: isOpen = isOpenProducts;
</script>

<Modal {isOpen}>
  <ModalHeader {toggle}>Formulario para crear un producto</ModalHeader>
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">

 <div class="form-row">
  <div class="form-group col-md-6">
  	<label for="title">titulo</label>
  	<input type="text" bind:value={product.title} name="title" class="form-control"  placeholder="Nombre del Producto">
  </div>
  <div class="form-group col-md-6">
  	<label for="price">Precio</label>
     <input type="number" min="0.00" step="0.01" bind:value={product.price} class="form-control"  placeholder="Precio del Producto">
   </div>
 </div>
 <div class="form-row">
    <div class="col-md-6">
     <label for="categories">categorias</label>
     <select bind:value={product.categories[0].name} class="form-group  col-md-11" >
        {#each categories as category}      
          <option>{category.name}</option>
        {/each}
     </select>
    </div>
    <div class="form-group col-md-6" >
     <label for="inputSlug">Identificador de Url</label>
      <input type="text" bind:value={product.slug} class="form-control"  placeholder="Identificador de Url">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="imagen" class="text-danger">imagen</label>
      <input type="file" bind:files name="images" >
      <label for="imagen" class="text-danger">debe cargar una imagen o quedara vacia</label>
    </div>
    <div class="form-group col-md-6">
     <label for="stock">Stock</label>
     <input type="number" min="1"  bind:value={product.stock} class="form-control"  placeholder="Stock Global">
     </div>
  </div> 
   <div class="form-group"> 
    <label for="exampleFormControlTextarea1">Resume del producto</label>
    <textarea class="form-control"  rows="1"  bind:value={product.resume}></textarea>
   </div>
   <div class="form-group">
    <label for="exampleFormControlTextarea">Descripcion del producto</label>
    <textarea class="form-control" rows="2"  bind:value={product.description}></textarea>
    </div>
      <div class=" d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" style="margin:auto">Modificar</button>

    </div>
</form>
<button class="btn btn-danger" on:click={toggle} style="margin:auto">Cancelar</button>
</Modal>



