# 🏟️ Backend – Sistema de Reservas de Canchas Comunitarias

## 📘 Descripción del Proyecto
Este backend forma parte del proyecto académico "Sistema de reservas para canchas sintéticas en comunidades urbanas", cuyo objetivo es ofrecer una herramienta tecnológica que permita gestionar de forma justa, transparente y accesible el uso de espacios deportivos comunitarios.

El proyecto busca resolver problemáticas como:
- Falta de organización en las reservas  
- Conflictos y favoritismos  
- Doble asignación de horarios  
- Exclusión de ciertos grupos  
- Falta de transparencia  

Este backend implementa la lógica necesaria para:
- Gestión de usuarios (registro, login, actualización)  
- Administración de espacios deportivos  
- Creación y control de reservas  
- Validación para evitar dobles reservas  
- Manejo de roles (usuario y administrador)  

Desarrollado bajo los principios de **Clean Architecture**, lo que permite mayor escalabilidad y mantenibilidad del proyecto.

---

## 🚀 Tecnologías Utilizadas
- Node.js  
- Express  
- TypeScript  
- MongoDB  
- Mongoose  
- JWT  
- bcrypt  
- Clean Architecture  

---

## 🛢️ Base de Datos
El backend utiliza **MongoDB** como motor principal y **Mongoose** como ODM.

Colecciones principales:
- `users` — información y credenciales  
- `sportsvenues` — espacios deportivos administrados  
- `reservations` — reservas creadas por los usuarios  

---

## 🔐 Autenticación y Autorización
- Autenticación mediante **JWT**  
- Contraseñas cifradas con **bcrypt**  
- Middleware de autenticación para validar tokens  
- Middleware de autorización para restringir acciones administrativas  

Flujo general:
1. El usuario se registra.  
2. Inicia sesión y obtiene su token.  
3. Accede a rutas protegidas utilizando `Authorization: Bearer <token>`.  

---

## 📌 Funcionalidades Principales

### Usuarios
- Registro de nuevos usuarios  
- Inicio de sesión  
- Consulta de perfil  
- Actualización de datos personales  

### Espacios Deportivos
- Creación de espacios (solo administrador)  
- Actualización de espacios  (solo administrador)  
- Eliminación o deshabilitación  (solo administrador)  
- Consulta y listado de espacios  

### Reservas
- Crear reservas  (solo usuario)  
- Modificar reservas  (solo usuario)
- Cancelar reservas  (solo administrador)
- Validaciones para evitar solapamientos de horarios  (solo administrador)


## ⚙️ Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/maherrera603/sports_venues_back.git
```
---
### 2. navegar al proyecto
```bash
cd sports_venues_back
```
---
### 3. instalacion de dependencias
```bash
npm install
```
---
### 4. variables de entorno
```bash
copiar y pegar el archivo .env.template y renombralo a .env 
```

---
### 5. configuracion de variables de entorno
```bash
editar el archivo .env y configurar las variables de entorno
```


### 6. creacion de usuario administrador
```bash
npm run create:admin -- -e "email del administrador" -p "contraseña"
```

### 7. iniciar proyecto
```bash
npm run dev
```


