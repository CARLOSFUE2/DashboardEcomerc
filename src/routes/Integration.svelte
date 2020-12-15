 <script>
import { querystring } from 'svelte-spa-router';
import axios from 'axios';
import qs from 'qs';
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
	client_id:'3903275226360638',
	client_secret: 'vCcfN4Vpbqbz41Ry0JsPOo5gQcOL7W9S',
	code: codeAuth,
	redirect_uri: 'https://wynwoodstore.net/'
	}),
	headers: {
	'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
	}});
	token=  res.data.access_token; //'APP_USR-3903275226360638-121019-1237583fe416c256a3311381306035b5-684358396' 
	const integration = await axios.put('http://localhost:1337/integration',{token});
    console.log(integration); 
    windows.close();
	

 } )
  
 </script>
 <div style="margin:auto; position:relative; top: 3rem;" >
    <div class="card">
        <div class="card-body ">
          <div class="d-flex justify-content-center">
              <h1 class="card-title text-danger row">No cierre esta ventana</h1>
          </div>
          <div class="d-flex justify-content-center">		
              <p> en este momento se esta realizando el proceso de autentificacion con <span class="text-warning">Mercado Libre</span> </p> 
          </div>
        </div>
    </div>
 </div>