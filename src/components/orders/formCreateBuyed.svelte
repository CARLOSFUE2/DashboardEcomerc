<script >
  import {  FormGroup,  Input, Label, Col,  Row,  Modal, ModalHeader} from 'sveltestrap';
  import { toast, create } from '../../store.js';
  import axios from 'axios';

async function submit(e){
  try{let products =[];
  let body ={};
  let total =0;
  for (var a=0; a < nameProduct.length ; a++ ){
    products.push({
      'name' : nameProduct[a],
      'price' : priceProduct[a],
      'cuantiti' : cuatitiProduct[a]
    });
    total = total + (cuatitiProduct[a]*priceProduct[a]);
    }
  body = {... form, products, total}
  const res = await axios.post('https://api.wynwoodstore.net/ventas', body);
  toggle();
  handleToast({
        title:"Venta Personal Registrada",
        message: "La venta fue registrada satisfactoriamente aparecera en la tabla",
        color:'success'
        })
  addBuyedTable();
} catch(error){
  toggle();
   handleToast({
     title:"Error",
     message: "La venta no fue registrada, por favor revise los datos y repita la operacion",
     color:'danger'
     })
     throw error;
}
}
function addBuyedTable(){
  $create={
    nameElement: 'buyed',
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
  function createInputs(e){
    event.preventDefault(); 
    cuantiti=document.getElementById('cuantiti').value;
    for (var i = 0; i < cuantiti; i++) {
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
  let form ={};
  let nameProduct=[];
  let priceProduct=[];
  let cuatitiProduct=[];
  let cuantiti ='';
  let apoyo =[];
  let oculto= true;
  let value ='';
  function toggle(){isOpen = !isOpen;}
   export let isOpen;  
</script>
  <Modal {isOpen}>
    <ModalHeader {toggle}>Registro de venta personal</ModalHeader>
<form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">
    <Row>
    <Col xs="4">
      <FormGroup>
    <Label for="exampleText">Cliente</Label>
    <Input
      type="text"
      name="name"
      id="exampleText"
      bind:value={form.clientName}
      placeholder="Nombre del Cliente" />
  </FormGroup>
    </Col>
    <Col xs="4">
      <FormGroup>
    <Label for="exampleText"># Factura</Label>
    <Input
      type="number"
      name="facture"
      id="facture"
      bind:value={form.numberFacture}
      placeholder="Numero de factura" />
  </FormGroup>
    </Col>
    <Col xs="4">
    <FormGroup>
    <Label for="exampleDate">Fecha</Label>
    <Input
      type="date"
      name="date"
      id="exampleDate"
      bind:value={form.date}
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
{#each apoyo as i}
 <Row>
  <p hidden="true">{i}</p>
    <Col>
    <FormGroup>
    <Label for="exampleText">Producto</Label>
    <Input
      type="text"
      name="name"
      id="exampleProducto"
      bind:value={nameProduct[i]}
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
      bind:value={cuatitiProduct[i]}

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
      bind:value={priceProduct[i]}
      placeholder="¿En Cuanto lo Vendiste?" />
  </FormGroup></Col>
  </Row>
{/each}
  <div class=" d-flex justify-content-center">
    <button type= "submit" class="btn btn-primary" style="margin:auto"> Registrar </button> 
  </div>
{/if}
</form>
   <button  class="btn btn-danger"on:click={toggle} style="margin:auto">Cancel</button>
</Modal>


