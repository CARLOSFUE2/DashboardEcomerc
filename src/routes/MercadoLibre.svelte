<script >
import { Col, Container, Row } from 'sveltestrap';
import { location, querystring } from 'svelte-spa-router';
import axios from 'axios';
import qs from 'qs';
import TableProducts from '../components/products/Table.svelte';
import TableCustomers from '../components/customers/Table.svelte';
import ChartClients from '../components/charts/chartClients.svelte';
import ChartPRoducts from '../components/charts/chartBuyed.svelte';
import Sidebard from '../components/MercadoLibre/Sidebard.svelte';
import { onMount } from 'svelte';

let codeAuth='';
let token =''
 onMount(async ()=>{
	let arrayCode= $querystring.split('=');
 	codeAuth = arrayCode[1];
 	const res = await axios({
	method: 'post',
	url:'https://api.mercadolibre.com/oauth/token',
	data: qs.stringify({
	grant_type: 'authorization_code',
	client_id:'4711552874376972',
	client_secret: 'PrkeeEUTqOGDARXaTO03YWSw8JAYF7YD',
	code: codeAuth,
	redirect_uri: 'https://wynwoodstore.net/'
	}),
	headers: {
	'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
	}});
	token= res.data.access_token;

 } )
  
 function ver(){
 	let arrayCode= $querystring.split('=');
 	codeAuth = arrayCode[1];
    console.log(codeAuth);
 }


</script>
<Sidebard/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<Container>
<h1>Administracion de Mercado Libre</h1>

<button on:click={ver}>location</button>
<p>{$querystring}</p>
<hr>
<ChartClients/>
<ChartPRoducts/>
  <Row>
    <Col>
    	<TableProducts/>
	</Col>
    <Col>
    	
    	<TableCustomers/>
    </Col>

  </Row>
</Container>
</main>