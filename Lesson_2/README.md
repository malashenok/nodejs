- Выполняется console.log("Record 1") на фазе poll.
  Вывод в консоль 1
- На строке 3 регистрируется таймер без задержки, коллбэк которого регистрируется
  в очереди timers.
- На 15 строке выполняет синхронный вызов console.log("Record 5") в фазе poll
  Вывод в консоль 5
- На 17 строке микрозадача - разрешение промиса, вызов then() добавляется в очередь микрозадач.
- Цикл событий завершает фазу poll.
  Выполняются микрозадачи: разрешается промис 17-й строки, в результате в очередь микрозадач
  добавляется ещё одна функция then(), которая выполняется и вызывает функцию console.log("Record 6")
  Вывод в консоль 6
- Выполняется фаза таймеров
  Вывод в консоль 2
- В очередь микрозадач добавляется промис
- Фаза таймеров закончена, выполняется очередь микрозадач - разрешается промис на строке 6 происходит
  регистрация таймера.
- Выполняется фаза таймеров
  Вывод в консоль 3
- В очередь микрозадач добавляется промис
- Фаза таймеров закончена, выполняется очередь микрозадач - разрешается промис на строке 8
  Вывод в консоль 4.
