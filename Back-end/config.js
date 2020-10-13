exports.db = {
    server: "den1.mssql8.gear.host",
    user: "doghunger",
    password: "Cherchil1_",
    database: "doghunger"
};

exports.regex = {
    email: /\w{6,20}@\w{4,10}\.\w{2,6}/,
    password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/
};

exports.lang = {
    "Login": {
        en: "Login",
        ua: "Вхід"
    },
    "Register": {
        en: "Register",
        ua: "Реєстрація"
    },
    "Profile": {
        en: "Profile",
        ua: "Профиль"
    },
    "Dog list": {
        en: "Dog list",
        ua: "Список собак"
    },
    "Main": {
        en: "Main",
        ua: "Головна"
    },
    "Logout": {
        en: "Logout",
        ua: "Вийти"
    },
    "tagline": {
        en: "A dog fed in time is a healthy dog, and a healthy dog is a happy owner!",
        ua: "Собака, що годується вчасно, - це здорова собака, а здоровий собака - щасливий власник!"
    },
    "userFeedback": {
        en: "USER FEEDBACK ON OUR PRODUCTS",
        ua: "ДУМКА КОРИСТУВАЧІВ ПРО НАШ ПРОДУКТ"
    },
    "list": {
        en: "LIST OF DOGS",
        ua: "СПИСОК СОБАК"
    },
    "feedback": {
        en: "Feedback",
        ua: "Відгук"
    },
    "about": {
        en: "About",
        ua: "Про проект"
    },
    "contact": {
        en: "Contact",
        ua: "Зв'язок"
    },
    "contactMe": {
        en: "CONTACT ME",
        ua: "ЗВ'ЯЖІТЬСЯ ЗІ МНОЮ"
    },
    "edit": {
        en: "Edit",
        ua: "Редагувати"
    },
    "save": {
        en: "Save",
        ua: "Зберегти"
    },
    "addDog": {
        en: "Add new dog",
        ua: "Додати нову собаку"
    },
    "addDogInfo": {
        en: "Here you can add a new dog and fill in all its information, as well as add its image with its participation.",
        ua: "Тут ви можете додати нову собаку і заповнити інформацію, а також додати її зображення."
    },
    "addDogClick": {
        en: "Click to add...",
        ua: "Натисніть щоб додати..."
    },
    "moreInfoClick": {
        en: "Click to more info...",
        ua: "Подивитись про собаку..."
    },
    "dogName": {
        en: "Dog name",
        ua: "Ім'я собаки"
    },
    "deleteDog": {
        en: "Delete this dog from list.",
        ua: "Видалити собаку зі списку."
    },
    "dogSize": {
        en: "Size of your dog",
        ua: "Розмір собаки"
    },
    "size": {
        en: "Size:",
        ua: "Розмір:"
    },
    "dogWeight": {
        en: "Your dog's weight",
        ua: "Вага собаки"
    },
    "weight": {
        en: "Weight:",
        ua: "Вага:"
    },
    "kilos": {
        en: "kilos",
        ua: "кілограмів"
    },
    "dogInfo": {
        en: "Information about your dog",
        ua: "Інформація про твою собаку"
    },
    "dogImg": {
        en: "Image with your dog",
        ua: "Фото із твоєю собакою"
    },
    "ntnssr": {
        en: "not necessary",
        ua: "не необхідно"
    },
    "chooseImg": {
        en: "Choose a photo of your dog",
        ua: "Обери фото із собакою"
    },
    "rplInsPic": {
        en: "Replace / insert picture",
        ua: "Замінити / додати фото"
    },
    "stat": {
        en: "Statistic",
        ua: "Статистика"
    },
    "close": {
        en: "Close",
        ua: "Закрити"
    },
    "add": {
        en: "Add",
        ua: "Додати"
    },
    "statSelect": {
        en: "Select a date to display statistics:",
        ua: "Виберіть дату для відображення статистики:"
    },
    "select": {
        en: "Select",
        ua: "Обрати"
    },
    "hrlStat": {
        en: "Hourly statistics in one day",
        ua: "Погодинна статистика за один день"
    },
    "temp": {
        en: "Temperature",
        ua: "Температура"
    },
    "hrtBeat": {
        en: "Heartbeat",
        ua: "Серцебиття"
    },
    "sysPres": {
        en: "Systolic Pressure",
        ua: "Систолічний тиск"
    },
    "diasPres": {
        en: "Diastolic Pressure",
        ua: "Діастолічний тиск"
    },
    "invalidDataOne": {
        en: "Invalid email/password/name/surname data.",
        ua: "Дані недійсної адреси електронної пошти/пароля/імені/ прізвища."
    },
    "invalidDataTwo": {
        en: "Invalid email/password combination.",
        ua: "Дані недійсної адреси електронної пошти/пароля."
    },
    "invalidDataThree": {
        en: "Invalid name/weight/info data.",
        ua: "Недійсні дані ім'я/ваги/інформаційні дані."
    },
    "invalidDataFour": {
        en: "Invalid weight type data.",
        ua: "Недійсний тип даних ваги."
    },
    "invalidDataFive": {
        en: "Unknown error.",
        ua: "Невідома помилка."
    },
    "rgstrSuccess": {
        en: "Registration success.",
        ua: "Успішна реєстрація."
    },
    "lgnSuccess": {
        en: "Login success.",
        ua: "Вхід здійснено."
    },
    "dogAddSuccess": {
        en: "Dog successfully added.",
        ua: "Собаку успішно додано."
    },
    "infoUpdSuccess": {
        en: "Information updated success.",
        ua: "Інформація успішно оновлена."
    },
    "infoDltSuccess": {
        en: "Dog successfully deleted.",
        ua: "Собака була успішно видалена."
    },
    "dogInfoLabel": {
        en: "Dog information",
        ua: "Інформація про собаку"
    },
    "email": {
        en: "Email",
        ua: "Електронна пошта"
    },
    "pass": {
        en: "Password",
        ua: "Пароль"
    },
    "name": {
        en: "Name",
        ua: "Ім'я"
    },
    "surname": {
        en: "Email",
        ua: "Прізвище"
    },
    "confPass": {
        en: "Repeat password",
        ua: "Повторіть пароль"
    },
    "createAcc": {
        en: "Create account",
        ua: "Створити аккаунт"
    },
    "questionOne": {
        en: "Still do not have an account?",
        ua: "Все ще не маєте аккаунту?"
    },
    "questionTwo": {
        en: "Already have an account?",
        ua: "Вже маєте аккаунт?"
    },
    "create": {
        en: "Create.",
        ua: "Створити."
    },
    "purposeOne": {
        en: "The purpose of this project is to track hunger and thirst for animals, with the help of heart rate, blood pressure and animal body temperature. This will help keep the animal in a tone, it will not be undigested or overeat, which will greatly affect its health.",
        ua: "Ціль цього проекту – це відстеження голоду та спраги у тварин, за допомогою серцебиття, артеріального тиску та температури тіла тварини. Це допоможе тримати тварину у тонусі, вона не буде недоїдати або переїдати, що добре позначиться на її здоров’ї."
    },
    "purposeTwo": {
        en: "This application will be in demand among ordinary people who buy the dog for the first time, and early dog breeders who do not have the time or experience of proper feeding of animals who wish to keep the animal in tone and track its health.",
        ua: "Цей застосунок буде користуватися попитом у звичайних людей які вперше купують собаку, та початкових собаківників, які не мають часу або досвіду правильної годівлі тварин, які мають бажання тримати тварину у тонусі та відстежувати її здоров’я."
    },
    "location": {
        en: "Location",
        ua: "Місцеположення"
    },
    "web": {
        en: "AROUND THE WEB",
        ua: "НАШІ СОЦ.СТОРІНКИ"
    },
    "selectLang": {
        en: "SELECT LANGUAGE",
        ua: "ОБРАТИ МОВУ"
    },
    "download": {
        en: "Download now",
        ua: "Завантажити"
    },
    "dogAte": {
        en: "The dog ate",
        ua: "Собака поїла"
    },
    "dateTime": {
        en: "Date time",
        ua: "Дата та час"
    },
    "dailyStat": {
        en: "Daily statistics",
        ua: "Щоденна статистика"
    },
    "weeklyStat": {
        en: "Weekly statistics",
        ua: "Щотижнева статистика"
    },
    "getNutrition": {
        en: "Nutrition and health",
        ua: "Харчування та здоров'я"
    }
};

