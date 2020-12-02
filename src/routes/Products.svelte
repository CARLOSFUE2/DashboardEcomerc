<script >
import { Col, Container, Row } from 'sveltestrap';
import Sidebard from '../components/products/Sidebard.svelte';
import Table from '../components/products/Table.svelte';
import ListProducts from '../components/products/ListProducts.svelte';
import FormProduct from '../components/products/formCreateProduct.svelte';
import FormCategory from '../components/products/formCreateCategory.svelte';
import FormOffer from '../components/products/formCreateOffer.svelte';
import OfferPublic from '../components/products/publicOffer.svelte';
import TableCategories from '../components/products/TableCategories.svelte';
import TableOffer from '../components/products/TableOffer.svelte';

let isOpen = {
	products: false,
	category: false,
	offer:false,
	offerPublic:false
};

const handleIsOpen = (event) => {
	
	const {form} = event.detail;

	isOpen = {
		products: form === 'products' ? true: false,
		category: form === 'category' ? true: false,
		offer: form === 'offer' ? true: false,
		offerPublic: form === 'offerPublic' ? true: false
	}
}

$: isOpenProducts = isOpen.products;
$: isOpenCategory = isOpen.category;
$: isOpenOffer = isOpen.offer;
$: isOpenOfferPublic =isOpen.offerPublic;
</script>
<style>
	
</style>


<Sidebard on:showForm={handleIsOpen}/>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
<h1>Administracion de Productos</h1>
<hr>
<OfferPublic {isOpenOfferPublic}/>
<FormOffer {isOpenOffer} />
<FormProduct {isOpenProducts}/>
<FormCategory {isOpenCategory} />
<Container>
<Row>
<Col><Table/></Col>
</Row>
<Row>
	<Col><TableOffer/></Col>
</Row>
<Row>

<Col><TableCategories/></Col>

</Row>
</Container>
</main>