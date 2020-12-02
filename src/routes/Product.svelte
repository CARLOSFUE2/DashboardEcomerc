<script >
import { toast } from '../store.js';
import Sidebard from '../components/products/Sidebard.svelte';
import {  Card, CardBody, Button, ModalBody, Modal, ModalFooter, ModalHeader } from 'sveltestrap';
import Form from '../components/products/formEditProduct.svelte';
import { onMount } from 'svelte';
import {push, pop, replace} from 'svelte-spa-router';
import axios from 'axios';


	export let params
	let product ={};
	let src = '';
  let categories=[];
  let slug= params.slug;

  const handleToast = (data) => {
  $toast = {
    isOpen: true,
    title: data.title,
    message: data.message,
    color: data.color
  }
}
	onMount(async ()=>{
    const res =await fetch(`http://localhost:1337/products/${params.slug}`)
      product= await res.json(); 
      src =`http://localhost:1337${product.images[0].url}`;
      categories=product.categories;
  });
  function editProduct(){
    isOpenProducts= !isOpenProducts;
  }
  async function deleteProduct (id){
    try{
          const resp = await axios.delete(`http://localhost:1337/products/${id}`);
        handleToast({
        title:"Producto fue eliminado",
        message: "El producto fue eliminado satisfactoriamente",
        color:'success'
        }) 
          push('/products'); 

    }catch (error){
      console.log(error);
       handleToast({
        title:"Error",
        message: "El Producto no fue eliminado, intentelo de nuevo",
        color:'danger'
        }) 
    } 
  }
let isOpenProducts =false;
 let isOpen =false;
function toggle(){isOpen = !isOpen;}
</script>
<Form {slug} {isOpenProducts}/>

<Modal isOpen={isOpen} {toggle}>
    <ModalHeader {toggle}>Eliminar producto</ModalHeader>
    <ModalBody>
      ¿Esta seguro de que desea borrar el producto: {product.title}?
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={deleteProduct(product.id)}>Borrar</Button>
      <Button color="danger" on:click={toggle}>Cancelar</Button>
    </ModalFooter>
  </Modal>
<Sidebard/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Productos</h1>
<hr>

<div class=" d-flex justify-content-center" style="width: 100%;">
  <div class="col-lg-6"><img src={src} class="card-img-top" alt="..."></div>
  <div class="col-lg-6">
    <div class="card-body">
    <h2 class="card-title">{product.title}  <span class="text-muted">{product.price}$.</span></h2>
    <h4 class="featurette-heading">Categorias: {#each categories as category} {category.name},{/each} <span class="text-muted">Identificador Url:{product.slug}. 
    </span></h4>
    <h4 class="featurette-heading">¿Esta en oferta?:{#if product.offer} <label>Si</label> {:else} <label>No</label> {/if}</h4>
    <p class="lead">Resumen:{product.resume}.</p>
    <p class="lead">Descripcion:{product.description}.</p>
    
 <div class=" d-flex justify-content-center">
      <button class="btn btn-primary btn-lg" on:click={editProduct(product.id)} style="margin:10px;">Modificar</button>
      <button class="btn btn-danger btn-lg" on:click={toggle} style="margin:10px;">Eliminar</button>
    </div>  
  </div>
</div>
  
  
</div>
</main>