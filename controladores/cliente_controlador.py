from flask import  jsonify,request  #,Flask# del modulo flask importar la clase Flask y los métodos jsonify,request

from app import app, db,ma
from modelos.cliente_modelo import *

class ClienteSchema(ma.Schema):
    class Meta:
        fields=('legajo','nombre','apellido','dni','correo','nivel','clave')

cliente_schema=ClienteSchema()            # El objeto producto_schema es para traer un producto
clientes_schema=ClienteSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/clientes',methods=['GET'])
def get_Clientes():
    all_clientes=Cliente.query.all()         # el metodo query.all() lo hereda de db.Model
    result=clientes_schema.dump(all_clientes)  # el metodo dump() lo hereda de ma.schema y
                                               # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla

@app.route('/clientes/<legajo>',methods=['GET'])
def get_cliente(legajo):
    cliente=Cliente.query.get(legajo)
    return cliente_schema.jsonify(cliente)   # retorna el JSON de un producto recibido como parametro

@app.route('/clientes/<legajo>',methods=['DELETE'])
def delete_cliente(legajo):
    cliente=Cliente.query.get(legajo)
    db.session.delete(cliente)
    db.session.commit()
    return cliente_schema.jsonify(cliente)   # me devuelve un json con el registro eliminado

@app.route('/clientes', methods=['POST']) # crea ruta o endpoint
def create_cliente():
    #print(request.json)  # request.json contiene el json que envio el cliente
    
    nombre=request.json['nombre']
    apellido=request.json['apellido']
    dni=request.json['dni']
    correo=request.json['correo']
    nivel=request.json['nivel']
    clave=request.json['clave']
    new_cliente=Cliente(nombre,apellido,dni,correo,nivel,clave)
    db.session.add(new_cliente)
    db.session.commit()
    return cliente_schema.jsonify(new_cliente)

@app.route('/clientes/<legajo>' ,methods=['PUT'])
def update_cliente(legajo):
    cliente=Cliente.query.get(legajo)
    cliente.nombre=request.json['nombre']
    cliente.apellido=request.json['apellido']
    cliente.dni=request.json['dni']
    cliente.correo=request.json['correo']
    cliente.nivel=request.json['nivel']
    cliente.clave=request.json['clave']

    db.session.commit()
    return cliente_schema.jsonify(cliente)


# @app.route('/2')
# def bienvenida2():
    # return "Bienvenidos al backend 2"   # retorna el JSON de un usuario recibido como parametro
