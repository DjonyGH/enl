# Создан на основе темплейта ГНИВЦ

Подробную информацию по созданию приложений ищите в [документации ГНИВЦ](https://dev.gnivc.ru:9443/gnivc/ff-web).

## Доступные команды

### `yarn start`

Запустить приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

### `yarn test`

Запустить выполнение тестов в режиме просмотра.\
[Прочитайте документацию](https://facebook.github.io/create-react-app/docs/running-tests) для получения большей информации.

### `yarn build`

Собрать production-версию приложения в папку `build`.

### `yarn build:ais3`
Собрать production-версию для АИС-3 в папку build.enlweb

### `yarn lint`

Запустить статический анализ кода.

### `yarn generate`

Запустить генератор кода для быстрого создания компонентов или сторов.

Подробнее о генераторе кода вы можете прочитать [здесь](https://dev.gnivc.ru:9443/gnivc/ff/src/branch/master/packages/generator/README.md).



## Настройка LINT
1. Установить 
    npm install -g eslint

2. Установить расширение ESLint в VSCode
3. Выполнить в проекте
    yarn add -D @ff/linting

## Настройка WebStorm    
1. Установить 
    npm install -g sass
2. Включить File watcher для SCSS
3. yarn global add dotenv-cli
4. Добавить конфигурацию запуска на шаблоне npm (yarn start)    

## ui-kit
1. Инструкция по использованию
https://dev.gnivc.ru:9443/demos/gnivc/ff/master/ui-kit/
