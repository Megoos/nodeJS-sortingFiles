## Задача

Есть сложная структура папок (обязательна вложенность папок) с файлами 
(тип файлов на ваш выбор - музыкальные, файлы изображений). Необходимо разобрать коллекцию, 
создав новую общую папку и расположив внутри все файлы по папкам в алфавитном порядке, т.е. 
все файлы начинающиеся на “a” должны быть в папке “A” и т.д. 

### Запуск
```
node index.js <input directory> <output directory> -rm
```

Параметр `-rm` используется, если необходимо удалить исходную папку (input directory)