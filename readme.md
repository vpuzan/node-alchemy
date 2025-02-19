# Интеграция для iOS

---

### Шаг 1: Установка SDK через CocoaPods

1. Убедитесь, что CocoaPods установлен на вашем компьютере. Если не установлен, выполните команду:
    
    ```ruby
    sudo gem install cocoapods
    ```
    
2. В вашем Xcode-проекте создайте или откройте файл `Podfile`.
3. Добавьте следующую строку в раздел `target`:
    
    ```ruby
    pod 'YourSDKName'
    ```
    
4. Выполните команду для установки зависимости:
    
    ```ruby
    pod install
    ```
    
5. Откройте сгенерированный `.xcworkspace` файл для продолжения работы.

### Шаг 2: Настройка API-ключа

1. Получите ваш API-ключ от службы поддержки или в личном кабинете.
2. В коде вашего приложения добавьте следующую строку для настройки ключа:
    
    ```
    SDKManager.setApiKey("Ваш_API_ключ")
    ```
    

### Шаг 3: Инициализация SDK

1. Вызовите метод инициализации в `AppDelegate` или другом подходящем месте:
    
    ```
    SDKManager.initialize()
    ```
    

### Шаг 4: Проверка успешности интеграции

1. Убедитесь, что метод `initialize` вызывает callback или проверьте параметр `isInitialized`:
    
    ```
    if SDKManager.isInitialized {
        print("SDK успешно инициализирован.")
    }
    ```
    

cghfthgj