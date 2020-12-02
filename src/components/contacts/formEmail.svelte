<script >
import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button, Modal,ModalFooter,ModalHeader} from 'sveltestrap';
import {  toast } from '../../store.js'

export let isOpenCategory; 
 let id ='';
  let contacts =[];
  let contact ={};
  let response='';
  let form={}
  async function submit(id){
    contact.response = response;
    contact.responded =true;
    form =contact;
    console.log(form);
    let data = form;
    try{
    const resp = await axios.put(`http://localhost:1337/contacts/${id}`, 
       data
      );
    console.log(resp);
   // toggle();
  }catch (error){
    console.log(error)
  }
  }

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
        title:"email enviado",
        message: "El email enviado satisfactoriamente ",
        color:'success'
        })  
 }} catch(error){
   console.log(error);
    toggle();
      handleToast({
        title:"Error",
        message: "El email no fue emviado, por favor revise los datos y repita la operacion",
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
  <div class="form-group col-md-12">
  	<label for="title">Direccion de email</label>
  	<input type="email" bind:value={form.email} name="title" class="form-control"  placeholder="Remitente">
  </div>
</div>
<div class="form-row">
  <div class="form-group col-md-12">
      <label for="exampleFormControlTextarea">Mensaje</label>
    <textarea class="form-control" rows="4"  bind:value={form.message}></textarea>
   </div>
 </div>
 <p class="text-danger">Nota:este correo se enviara desde info@wynwoodstore.net</p>
    <div class=" d-flex justify-content-center">
    <button type="submit" class="btn btn-primary" style="margin:auto">Enviar</button>
    <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

    </div>
</form>
</Modal>