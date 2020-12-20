<script >
import {  Button, Modal, ModalHeader} from 'sveltestrap';
import { toast, create } from '../../store.js';
import axios from 'axios';


  async function getCategoryML(Q){
    let q = Q.split(' ');
    let query='';
    for(var i =0; i < q.length ; i++){
     query = query + q[i]+'-';
    }
    const res = await axios.get(`https://api.mercadolibre.com/sites/MLU/domain_discovery/search?q=${query}`)
    categoris = res.data; 
    if(categoris.length == 0){
      alert(' el titulo no genera ninguna coincidencia con alguna categoria de mercado libre, redacta mejor el titulo para continuar. ')
      return
    }
    const resp = await axios.get(`https://api.mercadolibre.com/categories/${categoris[0].category_id}/attributes`)
      const arregloML = resp.data
      arregloML.forEach( item => {
        if(item.tags.required == true){
          attributes.push(item);
        }
      })
      
    hidden();
 }

let categories =[];
let prop={};
let categoris =[];
let attributes=[];
let	files;
let form={} ;
let category;
let property = false;
function hidden(){
 property = !property;
      
}


 async function submit(e) {
   const propertysKey = Object.keys(prop);
   const propertysValue = Object.values(prop);
   for(var i=0; i<propertysValue.length; i++){
    if(attributes[i].default_unit !== undefined){
      propertysValue[i] = propertysValue[i] +' '+ attributes[i].default_unit
      console.log(propertysValue[i]);
    }
   }
    try{
  	if (form) { 
       categoris = categoris.filter(catego => catego.category_name == category);
        categories = categoris;
        form= {... form , categories, propertysKey, propertysValue};
        console.log(form);
      	const formData = new FormData();
      	formData.append('data', JSON.stringify(form));
    	
      	if (files.length > 0) {

    	formData.append("files.images", files[0]);
        }
    	const resp = await fetch("https://api.wynwoodstore.net/products", {
    		method: "POST",
    		body:formData
    	});
 
        toggle();
        handleToast({
        title:"Producto creado",
        message: "El producto fue registrado satisfactoriamente aparecera en la tabla",
        color:'success'
        });
         addProductTable();
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
function addProductTable(){
  $create={
    nameElement: 'product',
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
  <div class="form-group col-md-12">
  	<label for="title">titulo</label>
  	<input type="text" bind:value={form.title} name="title" class="form-control"  placeholder="Nombre del Producto" required>
  </div>
</div>
{#if property == true}
    {#each attributes as attribute }
    <div class="form-row">
      <div class="form-group col-md-12">
         <label for="{attribute.name}">{attribute.name}</label>
        {#if attribute.value_type == 'string'}
         {#if attribute.values == undefined  }
         <input type="text" bind:value={prop[attribute.id]} name={attribute.name} class="form-control"  placeholder="{attribute.name}" required>
         {:else}
         <select bind:value={prop[attribute.id]} name={attribute.name} class="form-group  col-md-11" >
           {#each attribute.values as v }
             <option>{v.name}</option>
             {/each}
            </select>
            {/if}
            {:else if attribute.value_type == 'boolean'}
            <select bind:value={prop[attribute.id]} name={attribute.name} class="form-group  col-md-11" >
              {#each attribute.values as v }
              <option>{v.name}</option>
             {/each}
           </select>
        {:else}
          <input type="number" bind:value={prop[attribute.id]} name={attribute.name} class="form-control"  placeholder="{attribute.name}" required>
        {/if}
       </div>
    </div>
    {/each}
 
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="price">Precio</label>
       <input type="number" min="0.00" step="0.01" bind:value={form.price} class="form-control"  placeholder="Precio del Producto">
     </div>
    <div class="form-group col-md-6">
      <label for="currency">Moneda</label>
      <select bind:value={form.currency_id} class="form-group  col-md-11" >
          <option>UYU</option>
          <option>USD</option>
     </select>
    </div>
  </div>
   <div class="form-row">
      <div class="form-group col-md-6">
       <label for="categories">categorias</label>
       <select bind:value={category} class="form-group  col-md-11" >
          {#each categoris as categorie}      
            <option>{categorie.category_name}</option>
          {/each}
       </select>
      </div>
      <div class="form-group col-md-6">
       <label for="stock">Stock</label>
       <input type="number" min="1"  bind:value={form.stock} class="form-control"  placeholder="Stock Global" >
       </div>
     
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="imagen">imagen</label>
        <input type="file" bind:files name="images" >
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

{/if}
 
</form>
<div class="d-flex justify-content-center" style="margin-bottom: 1rem">
  {#if property == false}
  <button class="btn btn-primary" on:click={getCategoryML(form.title)} style="margin:auto">Buscar Categoria correspondiente</button> 
  {/if}
  <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

</div>


</Modal>



