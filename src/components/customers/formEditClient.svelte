<script >
  import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button,     Modal, ModalHeader} from 'sveltestrap';
  import {  toast } from '../../store.js'

  import axios from 'axios';
async function submit (e){
 if(form){
  form.username = form.email;
  form.confirmed = true;
  const resp = await axios.put(`http://localhost:1337/users/${id}`, 
        {...form
      });

        console.log(resp);
        toggle();
        form={};
        handleToast({
        title:"Actualizacion de Datos Exitosa",
        message: "La actualizacion de datos fue un exito, recuerda notificar al cliente los cambios",
        color:'success'
        })
 }
}

  function createInputs(e){
    event.preventDefault(); 
    cuantiti=document.getElementById('cuantiti').value;
    console.log(cuantiti);
    for (var i = 0; i < cuantiti; i++) {
        console.log(i);
      apoyo.push(i);
          }    
    return apoyo;
    }
    function handleInput(e){
    value = e.target.value;
     if(value >= 1){
      oculto = false;
          }
    return oculto, value ;
    } 

const handleToast = (data) => {
  $toast = {
    isOpen: true,
    title: data.title,
    message: data.message,
    color: data.color
  }
}

  
  let cuantiti ='';
  let apoyo =[];
  let oculto= true;
  let value ='';
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
    <Col xs="6">
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
    <Col xs="6">
    <FormGroup>
    <Label for="exampleText">Contraseña</Label>
    <Input
      type="password"
      name="password"
      bind:value={form.password}
      id=""
      placeholder="Contraseña del Cliente" />
  </FormGroup>    
</Col>
  </Row>
  
  <div class=" d-flex justify-content-center">
 <button type="submit" class="btn btn-primary" style="margin:auto">Modificar</button>
<Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

</div>
</form>
</Modal>


