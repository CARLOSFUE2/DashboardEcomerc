<script >
  import { Media, Card } from 'sveltestrap';
  import { onMount } from 'svelte';

  let products =[];
 

  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/products`)
      let respuestas= await res.json(); 
      let src ;
      let apoyo=[];
      respuestas.forEach(respuesta =>{
        src =`https://api.wynwoodstore.net${respuesta.images[0].url}`;
        console.log(src);
        apoyo.push({...respuesta,src})  
      })
      products= apoyo;      
      console.log(products);
      return products;
  });

</script>
{#each products as product}
<Card>
<Media>
  <Media left href="#/products/{product.slug}">
    <Media
      class="img-thumbnail"
      object
      src={product.src}
      alt="Generic placeholder image" />
  </Media>
  <Media body>
    <Media heading><a href="#/products/{product.slug}">{product.title}</a></Media>
    {product.price}
    {product.resume}
  </Media>
</Media>
</Card>
{/each}

