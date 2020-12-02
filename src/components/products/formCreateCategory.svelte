<script >
import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button, Modal,ModalFooter,ModalHeader} from 'sveltestrap';
import {  toast } from '../../store.js'

export let isOpenCategory; 

 async function submit(e){
  try{
 	if (form) {
      	const formData = new FormData();
      	formData.append('data', JSON.stringify(form));
    	console.log(form, formData.values());
    	const resp = await fetch("http://localhost:1337/categories", {
    		method: "POST",
    		body:formData
    	});
        console.log(resp);
         toggle();
        handleToast({
        title:"Categoria creado",
        message: "La Categoria fue registrada satisfactoriamente aparecera en la tabla",
        color:'success'
        })  
 }} catch(error){
   console.log(error);
    toggle();
      handleToast({
        title:"Error",
        message: "La categoria no fue registrada, por favor revise los datos y repita la operacion",
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
$: isOpen = isOpenCategory;
function toggle(){isOpen = !isOpen;}

</script>
<Modal {isOpen}>
<ModalHeader {toggle}>Formulario para crear una categoria</ModalHeader>
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">

 <div class="form-row">
  <div class="form-group col-md-6">
  	<label for="title">nombre</label>
  	<input type="text" bind:value={form.name} name="title" class="form-control"  placeholder="Nombre del Categoria">
  </div>
  <div class="form-group col-md-6">
     <label for="inputSlug">Identificador de Url</label>
      <input type="text" bind:value={form.slug} class="form-control"  placeholder="Identificador de Url">
   </div>
 </div>
 <p class="text-danger">Nota:tenga en cuenta que al crar una categoria que no exista en mercado libre este producto no podra ser publicado en esa plataforma</p>
    <div class=" d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" style="margin:auto">Crear categoria</button>
    </div>
</form>
 <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>
</Modal>