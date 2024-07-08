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
                    window.location.href = "./index.html";  // recarga index.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        },
        
        
        
    },    
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')