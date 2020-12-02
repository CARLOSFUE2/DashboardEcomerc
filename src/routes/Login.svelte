<script >
  import axios from "axios";
  import {push, pop, replace} from 'svelte-spa-router'
  import { store, toast } from '../store.js'
 // store.useLocalStorage(); 
let form ={};

 
async function submit(e){

 try{
  const { data } = await axios.post('http://localhost:1337/auth/local', {
    identifier: form.identifier,
    password: form.password,
  });

if (data && data.user.role.name == "administrator") {
  $store = {...data};
  push('/')
} else{
   handleToast({
    title:"Error de autentificacion",
    message: "Usted no es usuario administrador"
  }) 
}
console.log(data) 
 }catch (e) { 
   handleToast({
    title:"Error de autentificacion",
    message: "verifica tu correo y contraseña"
  })  
    }
   }


const handleToast = (data) => {
  $toast = {
    isOpen: true,
    title: data.title,
    message: data.message,
    color: 'danger'
  }
}


</script>



<div class="bg-gradient-dark container-fluid cuerpo " style="height:100vh ;" >

  <div class="container" >

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-6 col-lg-6 col-md-6">

        <div class="card o-hidden border-0 shadow-lg my-5" style="background-color: #212529; border-radius: 2rem;">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
              <div class="col-lg-12 ">
                <div class="p-5">
                      <div class=" d-flex justify-content-center" style="position:relative; top:-20px;">
                        <img src="https://api.wynwoodstore.net/uploads/logo_Blanco_3a8678b995.png" alt="" width="200" >
                          </div>
                  <div class="text-center">
                 
                    <h1 class="h4 text-gray-900 mb-4" style="color:white">Bienvenido al Panel de administracion</h1>
                  </div>
                  <form on:submit|preventDefault={submit}>
                    <div class="form-group">
                      <input type="email" name="email" class="form-control form-control-user" bind:value={form.identifier} placeholder="ingresa tu email" required="true">
                    </div>
                    <div class="form-group">
                      <input type="password"  class="form-control form-control-user" id="exampleInputPassword" placeholder="ingresa tu contraseña" required="true" bind:value={form.password}>
                    </div>
                    <div class="form-group">
                      
                    </div>
                   <div class=" d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary btn-lg">Ingresar</button>
                  </div>
                   
                  </form>
                
                 
                </div>
              </div>
            
          </div>
        </div>

      </div>

    </div>

  </div>
</div>
<style>
  .cuerpo{
      background: rgb(116,120,120);
background: linear-gradient(0deg, rgba(116,120,120,1) 0%, rgba(255,255,255,1) 100%);  
}
</style>
