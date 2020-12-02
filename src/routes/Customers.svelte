<script >
import Sidebard from '../components/customers/Sidebard.svelte';
import Table from '../components/customers/Table.svelte';
import Form from '../components/customers/formCreateClient.svelte';
import ChartClients from '../components/charts/chartClients.svelte';

let isOpen = false;

const handleIsOpen = (event) => {
	console.log(event.detail.isOpen);
	isOpen = event.detail.isOpen;
}
</script>


<Sidebard on:showForm={handleIsOpen} />
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Clientes</h1>
<hr>
<ChartClients/>
<Form {isOpen}/>
<Table/>

</main>