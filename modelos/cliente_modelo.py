from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship
from app import app, db   #,ma

# defino las tablas
class Cliente(db.Model):   # la clase Producto hereda de db.Model    
    legajo=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    apellido=db.Column(db.String(100))
    dni=db.Column(db.Integer)
    correo=db.Column(db.String(100))
    nivel=db.Column(db.Integer)
    clave=db.Column(db.String(100))
    #tipoproducto = db.relationship('tipoproducto', backref='funciones')
    
    def __init__(self ,nombre,apellido,dni,correo,nivel,clave):   #crea el  constructor de la clase
         self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
         self.apellido=apellido
         self.dni=dni
         self.correo=correo
         self.nivel=nivel
         self.clave=clave
with app.app_context():
    db.create_all()  # aqui crea todas las tablas