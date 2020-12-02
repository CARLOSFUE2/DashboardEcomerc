<script >
import Sidebard from '../components/orders/Sidebard.svelte';
import Table from '../components/orders/Table.svelte';
import Form from '../components/orders/formCreateBuyed.svelte';
import ChartOrders from '../components/charts/chartBuyed.svelte';

let isOpen = false;

const handleIsOpen = (event) => {
	console.log(event.detail.isOpen);
	isOpen = event.detail.isOpen;
}
</script>


<Sidebard on:showForm={handleIsOpen} />
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Pedidos</h1>
<hr>
<ChartOrders/>
<Form {isOpen}/>
<Table/>


</main>