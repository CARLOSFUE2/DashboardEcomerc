<script >
  import {  FormGroup,  Input, Label, Col,Row, Button, Modal, ModalHeader} from 'sveltestrap';
  import { toast, create } from '../../store.js'

import axios from 'axios';
let form ={};
async function submit (e){
  try{
 if(form){
  form.name = `${form.firstName} ${form.lastName}`;
  form.username = form.email;
  form.confirmed = true;
  const resp = await axios.post("https://api.wynwoodstore.net/auth/local/register", 
        {...form
      });

        console.log(resp); 
        toggle();
        handleToast({
        title:"Cliente Registrado",
        message: "El cliente fue registrado satisfactoriamente aparecera en la tabla",
        color:'success'
        });
        form={};
         addClientTable();
         }
    } catch (error){
      console.log(error);
      toggle();
      handleToast({
        title:"Error",
        message: "El cliente no fue registrado, por favor revise los datos y repita la operacion",
        color:'danger'
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
  function addClientTable(){
  $create={
    nameElement: 'client',
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
  
  let cuantiti ='';
  let apoyo =[];
  let oculto= true;
  let value ='';
  function toggle(){isOpen = !isOpen;}
  export let isOpen;  
</script>
  <Modal {isOpen}>
  <ModalHeader {toggle}>Registro de Cliente</ModalHeader>  
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">
  
  <Row>
    <Col xs="6">
      <FormGroup>
    <Label for="exampleText">Nombre</Label>
    <Input
      type="text"
      name="firstname"
      bind:value={form.firstName}
      id=""
      placeholder="Nombre del Cliente" />
  </FormGroup>
    </Col>
    <Col xs="6">
    <FormGroup>
    <Label for="exampleText">Apellido</Label>
    <Input
      type="text"
      name="lastName"
      bind:value={form.lastName}
      id=""
      placeholder="Apellido del Cliente" />
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
  <FormGroup>
    <Label for="exampleText">Direccion</Label>
    <Input
      type="text"
      name="Direccion"
      bind:value={form.location}
      id=""
      placeholder="Direccion del Cliente" />
  </FormGroup> 
  <div class=" d-flex justify-content-center">
 <button type="submit" class="btn btn-primary" style="margin:auto">Registrar</button>

</div>
</form>
<Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>

</Modal>


