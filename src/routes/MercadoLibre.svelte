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
	 console.log(codeAuth);
 	const res = await axios({
	method: 'post',
	url:'https://api.mercadolibre.com/oauth/token',
	data: qs.stringify({
	grant_type: 'authorization_code',
	client_id:'3903275226360638',
	client_secret: 'vCcfN4Vpbqbz41Ry0JsPOo5gQcOL7W9S',
	code: codeAuth,
	redirect_uri: 'https://wynwoodstore.net/'
	}),
	headers: {
	'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
	}});
	console.log(res); 
	token= 'APP_USR-3903275226360638-121019-1237583fe416c256a3311381306035b5-684358396' // res.data.access_token;
	console.log(token);
	const integration = await axios.put('http://localhost:1337/integration',{token});
	console.log(integration); 
	

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