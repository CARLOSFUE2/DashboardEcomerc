<script >
    import {Modal,  ModalHeader, Button } from 'sveltestrap';
    import { onMount } from 'svelte';
    import { create } from '../../store.js'
    import axios from 'axios';
  
 // $: $create.nameElement == 'category'? reloadProduct() : console.log('probando este beta') ; 
  
 /* async function reloadProduct() {
    const res =await fetch(`https://api.wynwoodstore.net/categories`)
        categories= await res.json();
        console.log(categories);
        return categories;
  } */
   function select(id){
    iD = id;
    question= questions.find( element => element.id == iD );
    toggle();
  }
    async function submit (){
        const res = await axios.put(`https://api.wynwoodstore.net/questionsmercadolibres/${iD}`, {response})
        console.log(res);

    }
  
    onMount(async ()=>{
      const res =await fetch(`https://api.wynwoodstore.net/questionsmercadolibres`)
        questions= await res.json();
        console.log(questions);
        return questions;
    });
  
    let questions =[];
    let question = {};
    let response ;
    let iD;
    let isOpen =false;
    function toggle(){isOpen = !isOpen;}

  </script>
  <style type="text/css">
    
  </style>
   <Modal {isOpen} >
    <ModalHeader {toggle}>Pregunta efectuada por  {question.idOfClient}</ModalHeader>
    <div class="card" >
    <div class="card-body">
        <h5 class="card-title">Id del producto : {question.productId}</h5>
        <h6 class="card-subtitle mb-2 text-muted"> Efectuado el :{question.date}</h6>
         <p class="card-text">{question.questionContent}</p>
    </div>
    <hr>
    <div class="card-body">
        <h5 class="card-title"> Tu respuesta</h5>
        <form on:submit|preventDefault={submit} style="margin:10px; background: whitesmoke">

            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="exampleFormControlTextarea">Respuesta que deseas enviar</label>
                    <textarea class="form-control" rows="2" style="margin:auto" bind:value={response}></textarea>
                </div>
             
            </div>
               <div class=" d-flex justify-content-center">
               <button type="submit" class="btn btn-primary" style="margin:auto">Responder</button>
               </div>
           </form>
           <div class="d-flex justify-content-center">
               <Button color="danger" on:click={toggle} style="margin:auto">Cancelar</Button>
      
           </div>

    </div>
    </div>
    </Modal>
  <h1>Preguntas</h1>
  <div class="table-responsive">
    <table class="table table-striped table-sm table-hover">  <thead>
      <tr>
        <th>Id del producto</th>
        <th>Fecha de la pregunta </th>
        <th>Estado de la pregunta </th>
        <th>Pregunta </th>
        <th>Respuesta </th>
        <th>Id del cliente </th>
      </tr>
    </thead>
    <tbody>
      {#if questions}
      {#each questions as question}
      <tr>
      <th>{question.productId}</th>
      <th>{question.date}</th>
      <td>{question.status}</td>
      <td>{question.questionContent}</td>
      {#if question.answer !== null || undefined}
      <td>{question.answer.text}</td>
      {:else}
      <td class="text-danger"> <button on:click={select(question.id)} class="btn btn-success "> Responder   </button></td>
      {/if}
      <td>{question.idOfClient}</td>
      </tr>
      {/each}
      {/if}
    </tbody>
  </table>
  </div>
  
        
  
  