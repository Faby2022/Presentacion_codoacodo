console.log(location.search)     // lee los argumentos pasados a este formulario
var legajo=location.search.substr(4)  // producto_update.html?id=1
console.log(legajo)
const { createApp } = Vue
  createApp({
    data() {
      return {
        legajo:0,
        nombre:"",
        apellido:"",
        dni:0,
        correo:"",
        nivel:0,
        clave:"",
        //url:'http://127.0.0.1:5000/clientes/'+legajo,
        url:'https://proyectofinal1.pythonanywhere.com/clientes/'+legajo,
       }  
    },
    
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.legajo=data.legajo
                    this.nombre = data.nombre;
                    this.apellido=data.apellido
                    this.dni=data.dni
                    this.correo=data.correo
                    this.nivel=data.nivel
                    this.clave=data.clave                   
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let cliente = {
                nombre:this.nombre,
                apellido: this.apellido,
                dni: this.dni,
                correo: this.correo,
                nivel:this.nivel,
                clave:this.clave,
            }
            var options = {
                body: JSON.stringify(cliente),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./clientes.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
