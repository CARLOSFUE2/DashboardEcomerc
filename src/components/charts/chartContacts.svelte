<script>
  import Chart from 'svelte-frappe-charts';
  import { onMount } from 'svelte';

  let contacts;
  let timesCreates=[];
  let frecuentForDay=[];

  onMount(async ()=>{
    const res =await fetch(`https://api.wynwoodstore.net/contacts`)
      contacts= await res.json(); 
      contacts.forEach(contact =>{
      let apoyo = contact.created_at;
      apoyo= apoyo.substr(8, 2);
      timesCreates.push(apoyo);
      });
      timesCreates.forEach( time =>{
      	if( time>0 && time<8){
      		data.datasets[0].values[0]= data.datasets[0].values[0] +1;
      	}else if ( time>7 && time<16){
      		data.datasets[0].values[1]= data.datasets[0].values[1] +1;
      	}else if (time>15 && time<24){
      		data.datasets[0].values[2]= data.datasets[0].values[2] +1;
      	} else {
      		data.datasets[0].values[3]= data.datasets[0].values[3] +1;
      	}
      })
  });

   let data = {
    labels: ['01-07', '08-15', '16-23', '24-31'],
    datasets: [
      {
        values: [0,0,0,0]
      }
    ]
  };

  let chartRef;

 
</script>
<h1>Grafica de Registro de Contactos por semana (Noviembre)</h1>
<Chart data={data} type="line" bind:this={chartRef} />

