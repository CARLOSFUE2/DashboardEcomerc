<script >
import { Col, Container, Row } from 'sveltestrap';
import Sidebard from '../components/MercadoLibre/Sidebard.svelte';
import TableNotifications from '../components/MercadoLibre/TableNotifications.svelte';
import TableQuestions from '../components/MercadoLibre/TableQuestions.svelte';
import { onMount } from 'svelte';

let client ='';

 onMount(async ()=>{
	const res =await fetch(`http://localhost:1337/integration`)
      client= await res.json();
        } );
  



</script>
<Sidebard/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">

<h1>Administracion de Mercado Libre</h1>
<hr>
<div class="row">
     
	<div class="col-lg-12 d-flex flex-column align-items-center">
	  <img src="https://api.wynwoodstore.net/uploads/Wynwood_Store_PNG_Logo_Negro_8011d7c328.png"  height="300"  width="300" style="border-radius: 100%" alt="">
	  <h2>cliente de mercado libre: {client.nickname} </h2>
	  <p> correo de mercado libre: {client.email}</p>
	  <!--p>{client.seller_reputation.level_id}</p-->
	 
	</div>

</div>

<TableNotifications/>

<TableQuestions/>



</main>