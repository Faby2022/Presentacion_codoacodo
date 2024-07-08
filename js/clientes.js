const { createApp } = Vue
  createApp({
    data() {
      return {
        clientes:[],
        //url:'http://127.0.0.1:5000/clientes', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://proyectofinal1.pythonanywhere.com/clientes',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        legajo:0,
        nombre:"", 
        apellido:"",
        dni:0,
        correo:"",
        nivel:0,
        clave:"",
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.clientes = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(legajo) {
            const url = this.url+'/' + legajo;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let cliente = {
                nombre:this.nombre,
                apellido: this.apellido,
                dni: this.dni,
                correo:this.correo,
                nivel:this.nivel,
                clave:this.clave
            }
            var options = {
                body:JSON.stringify(cliente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")                    
                        window.location.href = "./clientes.html";  // recarga clientes.html 
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        },
        login() {
            let cliente = {
                nombre:this.nombre,
                nivel:this.nivel,
                clave:this.clave,
            }
            sessionStorage.setItem("nombre","apellido","dni","correo","nivel","clave")
            var i=0
            var s=0
            while ( i < this.clientes.length){                                
                  
                if ((this.clientes[i].clave==this.clave) && (this.clientes[i].nombre==this.nombre)){
                    
                    if (this.clientes[i].nivel==0){
                        alert('Bienvenido CLIENTE ya puedes comprar')
                        s=1
                        window.location.href = "./index.html";
                    }
                    if (this.clientes[i].nivel==1){                        
                        alert('Bienvenido ADMINISTRADOR')
                        s=1
                        window.location.href = "./productos.html";
                    }                                                         
               
                }                  
                           
                i++                    
            }
            if (s==0){
                alert('Usuario o Clave erronea')
                window.location.href = "./login.html"
            }
        }
        
    },    
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')