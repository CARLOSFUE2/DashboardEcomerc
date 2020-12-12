<script>
  import Chart from 'svelte-frappe-charts';
  import { onMount } from 'svelte';

  
  let clients =[];
  let orders;
  let timesCreates=[];
  let dateActuallity;
  var today= new Date();
  let months =['Enero', 'Febrero', 'Marzo', 'Abril' ,' Mayo', 'Junio' , 'Julio', 'Agosto', 'Septiembre', 'Octubre','Noviembre', 'Diciembre' ]

  onMount(async ()=>{
    dateActuallity = today.getMonth() +1;
    const res =await fetch(`https://api.wynwoodstore.net/users`)
      clients= await res.json();
      let clientOrders = [];
      let clientName;
      let clientId;
      clients.forEach(client =>  {
        if (client.buyedProducts) {
          clientName= client.name;
          clientId= client.id;
          client.buyedProducts.forEach(order => {
            clientOrders.push({...order,clientName,clientId});
          })
        }
      })
      orders = clientOrders;
     orders.forEach(order =>{
      let apoyo = order.date;
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
<h1>Grafica de Registro de Ventas por semana ({months[today.getMonth()]})</h1>
<Chart  class="grafica" data={data} type="line" bind:this={chartRef} />

