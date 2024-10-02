# Intrusiones de uso del servidor correctamente

## Rutas de uso para el servidor

- la siguientes rutas serán del manejo correcto del servidor

#### Rutas de usuario

1.  **Registro:**

    - http://localhost:4000/register
    - _En la Ruta de registro por el_ [ body ] _tiene que venir estos elemento_ { username, password, email }
      _para realizar correctamente in registro de usuario_

2.  **Login**

    - http://localhost:4000/login
    - _en esta ruta el usuario debe mandar por_ [ body ] _los siguientes datos_ { password, email } _para realizar correctamente su acceso_

3.  **session**

    - http://localhost:4000/session
    - _en la ruta **session** lo que vas hacer es un get nada mas para poder validar que el usuario se halla halla tenido acceso en el login lo que te va a traer estas ruta es los datos del usuario que se logueado si no se a logueado solo te va a decir que no tiene acceso y la petición te saldrá en false_

4.  **logout**

    - http://localhost:4000/logout
    - _por ultimo de las rutas de los usuario esta el **logout** que en pocas palabras seria como un cerrar session_

5.  **userUpdated**
    - http://localhost:4000/userUpdated
    - _esta ruta te permitirá actualizar los datos del usuario una ves validado y logueado los datos que puede recibir son imagen/png/jpeg { username, email } si preguntas porque no esta las contraseña tampoco es porque la contraseña para cambiar debe tener un proceso mas grande_

#### Rutas de Eventos

1.  **Para traer todas las publicaciones**

    - http://localhost:4000/publications
    - _esta ruta te permitirá traer toda las publicaciones de eventos_

2.  **Para traer las publicaciones por id**
    - http://localhost:4000/
    - _esta ruta lo que te permitirá es que buscar las publicaciones de eventos por su id_
