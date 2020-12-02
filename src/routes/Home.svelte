<script >
import { Col, Container, Row } from 'sveltestrap';
import TableProducts from '../components/products/Table.svelte';
import TableCustomers from '../components/customers/Table.svelte';
import ChartClients from '../components/charts/chartClients.svelte';
import ChartPRoducts from '../components/charts/chartBuyed.svelte';
import Sidebard from '../main/sidebardHome.svelte';



</script>
<Sidebard/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<Container>
<h1>Panel Central</h1>
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