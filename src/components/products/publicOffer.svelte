<script >
import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button, Modal,ModalFooter,ModalHeader} from 'sveltestrap';
import { toast } from '../../store.js'
import { onMount } from 'svelte';

  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/offers`)
      offers= await res.json();
      
  });

  let offers =[];
  let products=[];
 


export let isOpenOfferPublic; 

 async function submit(e){
  try{
  if (form) {
      products.forEach( product =>{
        if(product.title == form.product){
          form.product= {... product}
        }
      });
      const formData = new FormData();
      formData.append('data', JSON.stringify(form));
      console.log(form, formData.values());
      const resp = await fetch("https://api.wynwoodstore.net/offers", {
        method: "POST",
        body:formData
      });
        console.log(resp); 
         toggle();
        handleToast({
        title:"Oferta creada",
        message: "La Oferta fue registrada satisfactoriamente aparecera en la tabla",
        color:'success'
        })  
 }} catch(error){
   console.log(error);
    toggle();
      handleToast({
        title:"Error",
        message: "La Oferta no fue registrada, por favor revise los datos y repita la operacion",
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
 let form ={};
$: isOpen = isOpenOfferPublic;
function toggle(){isOpen = !isOpen;}

</script>
<Modal {isOpen}>
<ModalHeader {toggle}>Publicar oferta</ModalHeader>
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">

 <div class="form-row">
  <div class="form-group col-md-6">
    <label for="title">Titulo de la Oferta</label>
    <input type="text" bind:value={form.title} name="title" class="form-control"  placeholder="Titulo de la Oferta">
  </div>
  <div class="form-group col-md-6">
    <label for="price">Precio de oferta</label>
     <input type="number" min="0.00" step="0.01" bind:value={form.newPrice} class="form-control"  placeholder="Precio de la oferta">
   </div>
 </div>
 <div class="form-row">
    <div class="col-md-6">
     <label for="product">Productos Disponibles</label>
     <select bind:value={form.product} class="form-group  col-md-11" >
        {#each products as product}      
          <option>{product.title}</option>
        {/each}
     </select>
    </div>
    <div class="form-group col-md-6" >
     <label for="exampleFormControlTextarea">Descripcion de la oferta</label>
    <textarea class="form-control" rows="2"  bind:value={form.description}></textarea>
    </div>
  </div>
 <p class="text-danger">Nota:tenga en cuenta que al crar una oferta esta por defecto aparecera despublicada esperando a que usted decida cuando hacerla publica</p>
    <div class=" d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" style="margin:auto">Crear oferta</button>
    <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

    </div>
</form>
</Modal>