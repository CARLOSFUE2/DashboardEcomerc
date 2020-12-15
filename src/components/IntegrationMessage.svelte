<script >
import  { location } from 'svelte-spa-router';
import { onMount } from 'svelte';
let hidden = false; 
function state(){
  hidden = !hidden;
  console.log(hidden);
}
$: $location == '/login' || '/integration/' ? hidden = true : console.log($location);
onMount(async ()=>{	
}) 
</script>
<style>
	.toastPosition {
		position: fixed;
		border-radius:  1rem;
		bottom: 0;
		right: 0;
		width: 20rem;
		padding: .5rem;
		
		
	}
</style>
<button on:click={state}> estado</button>
{#if hidden == false}
<div class="toastPosition" >
  <div class="card" style="border: solid 1px red;">
	  <div class="card-body ">
		<div class="d-flex justify-content-center">
			<h3 class="card-title text-danger row">Alerta!</h3>
		</div>
		<div class="d-flex justify-content-center">
			<h5 class="card-title text-danger row">Vencio su authorizacion de ML.</h5>
		</div>
		<div class="d-flex justify-content-center">		
			<a class="btn btn-warning row" href="#/integration/?code=prueba" target="_blank" >Renovar</a> 
		</div>
	  </div>
  </div>
	 
</div>
{/if}
