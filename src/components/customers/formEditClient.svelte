<script >
  import { FormGroup, Input, Label, Col, Row, Button, Modal, ModalHeader} from 'sveltestrap';
  import {  toast, elementEdit } from '../../store.js'

 import axios from 'axios';
async function submit (e){
  try{
 if(form){
  form.username = form.email;
  form.confirmed = true;
  const resp = await axios.put(`http://localhost:1337/users/${id}`, 
        {...form
      });

        console.log(resp);
        toggle();
        handleToast({
        title:"Actualizacion de Datos Exitosa",
        message: "La actualizacion de datos fue un exito, recuerda notificar al cliente los cambios",
        color:'success'
        })
         change({
          name:'client',
          element: form
        })

 }}catch (err){
   throw err;
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

  function toggle(){isOpen = !isOpen;}
  export let Open; 
  export let form;
  export let id
  $:isOpen =Open; 
</script>
  <Modal {isOpen}>
  <ModalHeader {toggle}>Modificar Datos <label class="text-danger">(Nota:Recuerde notificar al cliente sobre los cambios)</label></ModalHeader>  
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">
  
  <Row>
    <Col xs="6">
      <FormGroup>
    <Label for="exampleText">Nombre Completo</Label>
    <Input
      type="text"
      name="name"
      bind:value={form.name}
      id=""
      placeholder="Nombre del Cliente" />
  </FormGroup>
    </Col>
    <Col xs="6">
   <FormGroup>
    <Label for="exampleText">Direccion</Label>
    <Input
      type="text"
      name="Direccion"
      bind:value={form.location}
      id=""
      placeholder="Direccion del Cliente" />
  </FormGroup>     
</Col>
  </Row>
  <Row>
  <Col xs="12">
  <FormGroup>
    <Label for="exampleText">Email</Label>
    <Input
      type="email"
      name="email"
      bind:value={form.email}
      id=""
      placeholder="Email del Cliente" />
  </FormGroup>
</Col>
  </Row>
  
  <div class=" d-flex justify-content-center">
 <button type="submit" class="btn btn-primary" style="margin:auto">Modificar</button>
</div>
</form>
<Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>
</Modal>


