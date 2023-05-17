# servidor-IoT-basico-docker-compose
Este repositorio contiene el archivo YAML necesario para crear un servidor básico del Internet de las Cosas con Mosquitto, NodeRed y MySQL

## Introducción

Este repositorio consiste principalmente de un archivo YAML para hacer un servidor del Internet de las Cosas usando multi contenedores con Docker Compose. Los componentes de este servidor son los siguientes.

- [MQTT Broker Mosquitto](https://mosquitto.org/)
- [NodeRed](https://nodered.org/)
- [MySQL](https://www.mysql.com/)

Este servidor podrá ser arrancado con un solo comando o ser configurado para su arranque automático.

Este servidor es la versión básica. Conforme se desarrollen, enlazaran otros repositorios que generen versiones intermedias ya vanzadas de este Servidor IoT. Se contemplarán los siguientes componentes.

- [Grafana](https://grafana.com/)
- [traccar](https://www.traccar.org/)
- InfluxDB
- TensorFlow
- OpenCV
- Darknet YOLO
- Keras
- DeepDetect

### Limitantes
Este servidor no está configurado bajo logicas de producción.

Este ejercicio está pensado para usar volumenes para configuración y almacenamiento externo al contenedor.

De forma predeterminada, las secciones de volumenes están comentadas. Si deseas configurar el almacenamiento externo, deberás crear los directorios indicados y proporcionar un archivo de configuración.

## Requisitos

### Software necesario
Para realizar este ejercicio necesitas lo siguiente

- [Ubuntu 20.04](https://releases.ubuntu.com/20.04/)
- [Docker Engine](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)
- [Mosquitto Docker Image](https://hub.docker.com/_/eclipse-mosquitto/)
- [NodeRed Docker Image](https://hub.docker.com/r/nodered/node-red-docker/)
- [MySQL Docker Image](https://hub.docker.com/_/mysql)

### Material de referencia

En los siguientes enlaces puedes encontrar cursos en la plataforma de edu.codigoiot.com que contienen el conocimiento necesario para llevar a cabo las configuraciones necesarias.

- [Linux Essentials](https://edu.codigoiot.com/course/view.php?id=984)
- Máquinas Virtuales
- [Instala Ubuntu en Virtual Box](https://edu.codigoiot.com/course/view.php?id=812)
- [Introducción a Docker]()
- [Instalación de Docker]()
- [Docker Compose]()

## Instrucciones

### Requisitos previos
Para poder realziar este servidor, necesitas contar con lo siguiente

1. Contar con un equipo compatible con tecnologías de Virtualización.
    - Comprueba que tu procesador sea compatible
    - Comprueba que la virtualización esté activada en la BIOS de tu equipo
2. Compatibilidad con KVM
    - Sistemas operativos como Ubuntu son compatibles con KVM en equipos con procesadores compatibles con virtualización
    - Si usas linux en un entorno de máquina virtual, activa la casilla de compatibilidad con KVM
3. Docker Engine. Debes tenerlo instalado y actualizado. A continuación puedes encontrar instrucciones generales para instalarlo. Si tienes problemas, consulta la [documentación oficial](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script).
    - ```sudo apt update```
    - ```sudo apt upgrade```
    - ```curl -fsSL https://get.docker.com -o get-docker.sh```
    - ```sudo sh ./get-docker.sh --dry-run```
    - Comprueba la instalación con ```docker -version```
    - Comprueba que docker haya arrancado ```sudo systemctl status docker```
    - En caso de que no sea así, arrancalo con el siguiente comando ```sudo systemctl start docker```
4. Crear los directorios para los volumenes. Este paso es opcional y esta reservado sólo para dar la característica de almacenamiento permanente y externo al contenedor.
    - Crea los directorios de los volumenes

        ```
        mkdir -p ~/DockerVolumes/Mosquitto/config
        mkdir -p ~/DockerVolumes/MySQL/config
        mkdir -p ~/DockerVolumes/MySQL/data
        mkdir -p ~/DockerVolumes/NodeRED/config
        mkdir -p ~/DockerVolumes/NodeRED/data
        ```
    - Coloca en los directorios config los archivos correspondientes a cada volumen segun se indica en el archivo YAML.

5. Crear el directorio local de Compose para el archivo YAML usando el siguiente comando

    ```mkdir -p ~/DockerCompose```

6. Coloca el archivo YAML de este repositorio en el directorio de Compose. Actualiza la contraseña de MySQL en el archivo YAML.
7. Ejecuta las configuraciones del archivo Compose con el siguiente comando ```docker-compose up -d```
8. Comprueba que los contenedores hayan arrancado con el siguiente comando ```docker-compose ps```

## Instrucciones de operación
Para arrancar un contenedor usa el siguiente comando.
    
    ```docker start [id_del_contenedor]```

Para arrancar todos los contenedores usa el siguiente comando

    ```docker start $(docker ps -a -q)```

Para detener un contenedor usa el siguiente comando.
    
    ```docker stop [id_del_contenedor]```

Para detener todos los contenedores usa el siguiente comando

    ```docker stop $(docker ps -a -q)```

Para comprobar el funcionamiento de NodeRed, abre un navegador y dirigete a [localhost:1880](http://localhost:1880)

Para entrar a la terminal de MySQL ejecuta el siguiente comando. Usa la contraseña que colocaste en el archivo YAML.

```
docker exec -it [id_del_contenedor]] mysql -u root -p [contraseña_en_yaml]
```


# FAQ
- En caso de que tengas problemas para ejecutar los comandos de Docker, agrega tu usuario al grupo docker con los siguientes comandos

    ```
    sudo usermod -aG docker $USER
    newgrp docker
    ```
- Si los problemas persisten, puedes consultar el log de cada contenedor con el siguiente comando

    ```docker-compose logs [id_del_servicio]```
