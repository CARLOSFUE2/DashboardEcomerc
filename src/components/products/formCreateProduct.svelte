<script >
import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button, Modal, ModalFooter, ModalHeader} from 'sveltestrap';
import { toast } from '../../store.js'
import { onMount } from 'svelte';
import {push, pop, replace} from 'svelte-spa-router';

  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/categories`)
      categoris= await res.json();
  });

let categoris =[];
let categories =[];
let	files;
let form={} ;
let statusCode = "";
let category;


  async function submit(e) {
    try{
  	if (form) { 
       categoris = categoris.filter(catego => catego.name == category);
        categories = categoris;
        form= {... form , categories};
      	const formData = new FormData();
      	formData.append('data', JSON.stringify(form));
    	
      	if (files.length > 0) {

    	formData.append("files.images", files[0]);
      	}
    

    	console.log(form, formData.values());
    	const resp = await fetch("http://localhost:1337/products", {
    		method: "POST",
    		body:formData
    	});
 
        statusCode = resp.status;
        toggle();
        handleToast({
        title:"Producto creado",
        message: "El producto fue registrado satisfactoriamente aparecera en la tabla",
        color:'success'
        });
        //push('/products'); 
    }} catch (error){
    console.log(error);
     toggle();
      handleToast({
        title:"Error",
        message: "El producto no fue registrado, por favor revise los datos y repita la operacion",
        color:'danger'
        });

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
function toggle(){isOpen = !isOpen;}
export let isOpenProducts; 


$: isOpen = isOpenProducts;
</script>

<Modal {isOpen}>
  <ModalHeader {toggle}>Formulario para crear un producto</ModalHeader>
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">

 <div class="form-row">
  <div class="form-group col-md-6">
  	<label for="title">titulo</label>
  	<input type="text" bind:value={form.title} name="title" class="form-control"  placeholder="Nombre del Producto">
  </div>
  <div class="form-group col-md-6">
  	<label for="price">Precio</label>
     <input type="number" min="0.00" step="0.01" bind:value={form.price} class="form-control"  placeholder="Precio del Producto">
   </div>
 </div>
 <div class="form-row">
    <div class="col-md-6">
     <label for="categories">categorias</label>
     <select bind:value={category} class="form-group  col-md-11" >
        {#each categoris as categorie}      
          <option>{categorie.name}</option>
        {/each}
     </select>
    </div>
    <div class="form-group col-md-6" >
     <label for="inputSlug">Identificador de Url</label>
      <input type="text" bind:value={form.slug} class="form-control"  placeholder="Identificador de Url">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="imagen">imagen</label>
      <input type="file" bind:files name="images" >
    </div>
    <div class="form-group col-md-6">
     <label for="stock">Stock</label>
     <input type="number" min="1"  bind:value={form.stock} class="form-control"  placeholder="Stock Global">
     </div>
  </div> 
   <div class="form-group"> 
    <label for="exampleFormControlTextarea1">Resume del producto</label>
    <textarea class="form-control"  rows="1"  bind:value={form.resume}></textarea>
   </div>
   <div class="form-group">
    <label for="exampleFormControlTextarea">Descripcion del producto</label>
    <textarea class="form-control" rows="2"  bind:value={form.description}></textarea>
    </div>
      <div class=" d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" style="margin:auto">Crear producto</button>
    </div>
</form>
    <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

</Modal>



