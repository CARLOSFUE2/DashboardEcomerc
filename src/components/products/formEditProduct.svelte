<script >
import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button, Modal, ModalFooter, ModalHeader} from 'sveltestrap';
import { toast } from '../../store.js'
import { onMount } from 'svelte';

  onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/categories`)
      categories= await res.json();
    const response =await fetch(`http://localhost:1337/products/${slug}`)
      form= await response.json();

  });
export let slug;
  let categories =[];

let	files;

let form={} ;
let statusCode = "";


  async function submit(e) {
    try{
  	if (form) {
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
        }) 
    }
  }catch (error){
    console.log(error);
     toggle();
      handleToast({
        title:"Error",
        message: "El producto no fue registrado, por favor revise los datos y repita la operacion",
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
     <select bind:value={form.categories[0].name} class="form-group  col-md-11" >
        {#each categories as category}      
          <option>{category.name}</option>
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
      <label for="imagen" class="text-danger">imagen</label>
      <input type="file" bind:files name="images" >
      <label for="imagen" class="text-danger">debe cargar una imagen o quedara vacia</label>
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
    <button type="submit" class="btn btn-primary" style="margin:auto">Modificar</button>

    </div>
</form>
<button class="btn btn-danger" on:click={toggle} style="margin:auto">Cancelar</button>
</Modal>



