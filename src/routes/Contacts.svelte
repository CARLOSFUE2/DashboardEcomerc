<script >
  import { Card, CardBody } from 'sveltestrap';
  import Sidebard from '../components/contacts/Sidebard.svelte';
  import Table from '../components/contacts/Table.svelte';
  import TableForResponse from '../components/contacts/TableForResponse.svelte';
  import ChartContacts from '../components/charts/chartContacts.svelte';


  
</script>

<Sidebard/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Contactos</h1>
<hr>
<ChartContacts />
<TableForResponse/>
<Table/>
</main>
