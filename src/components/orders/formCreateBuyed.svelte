<script >
  import { Form, FormGroup, FormText, Input, Label, Col, Container, Row, Button, Modal, ModalHeader} from 'sveltestrap';
  import { toast } from '../../store.js'



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
  let cuantiti ='';
  let apoyo =[];
  let oculto= true;
  let value ='';
  function toggle(){isOpen = !isOpen;}
   export let isOpen;  
</script>
  <Modal {isOpen}>
    <ModalHeader {toggle}>Registro de venta personal</ModalHeader>
<Form style="margin:10px; background: whitesmoke">
    <Row>
    <Col xs="6">
      <FormGroup>
    <Label for="exampleText">Cliente</Label>
    <Input
      type="text"
      name="name"
      id="exampleText"
      placeholder="Nombre del Cliente" />
  </FormGroup>
    </Col>
    <Col xs="6">
    <FormGroup>
    <Label for="exampleDate">Fecha</Label>
    <Input
      type="date"
      name="date"
      id="exampleDate"
      placeholder="Fecha de la Venta" />
  </FormGroup>
    </Col>
  </Row>

{#if cuantiti == '' }
  <FormGroup>
    <Label for="exampleNumber">¿Cuantos Productos vendiste?</Label>
    <Input
      type="number"
      name="number"
      id="cuantiti"
      placeholder="¿Cuantas Unidades Vendiste?"
      value={value}
      on:input={handleInput} />
  </FormGroup>
<p class="text-danger">Por favor define cuantos productos vendiste</p>
{#if oculto === false}
  <div class=" d-flex justify-content-center">
    <button class="btn btn-primary" on:click={createInputs} >Definir</button>
  </div>
{/if}

{:else}
{#each apoyo as a}
 <Row>
  <p hidden="true">{a}</p>
    <Col>
    <FormGroup>
    <Label for="exampleText">Producto</Label>
    <Input
      type="text"
      name="name"
      id="exampleProducto"
      placeholder="Nombre del Producto" />
  </FormGroup>
</Col>
    <Col>
    <FormGroup>
    <Label for="exampleNumber">unidades</Label>
    <Input
      type="number"
      name="number"
      id="exampleNumber"
      placeholder="¿Cuantas Unidades Vendiste?" />
  </FormGroup>
</Col>
<Col>
    <FormGroup>
    <Label for="exampleNumber">Precio</Label>
    <Input
      type="number"
      name="number"
      id="exampleNumber"
      placeholder="¿En Cuanto lo Vendiste?" />
  </FormGroup></Col>
  </Row>
{/each}
  <div class=" d-flex justify-content-center">
    <button type= "submit" class="btn btn-primary" style="margin:auto"> Registrar </button> 
    <button  class="btn btn-danger"on:click={toggle} style="margin:auto">Cancel</button>
  </div>
{/if}
</Form>
</Modal>


