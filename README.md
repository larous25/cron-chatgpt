Este fue un proyecto un pequeño trabajo que un cliente me pidio y luego no me volvio a hablar :C




HOLA - es necesario que se hagan unos cambios antes de ejecutar


es necesario que a la tabla se de le aplique el siguiente querry antes de ejecutar el codigo
cambie el "consulta" por el nombre de la tabla que guarda las noticias y cambie el nombre de resumen por el campo donde va a guardar su resumen
tenga en cuenta que este tambien debe ser cambiado en el codigo

```SQL
ALTER TABLE consulta
ADD resumen VARCHAR(255);


DELIMITER $$
CREATE TRIGGER affter_news
AFTER INSERT ON consulta
FOR EACH ROW
BEGIN
   INSERT INTO nuevas_noticias(consulta_idconsulta) VALUES (NEW.idconsulta);
END;$$


Este es el ejemplo del entorno
```
API = 'holis'  
HOST= 'localhost'
USER= 'root'
PASS= 'root'
DB= 'noticiasdb'
```