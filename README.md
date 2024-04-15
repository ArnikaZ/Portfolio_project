# Portfolio

## Opis
Portfolio to aplikacja internetowa napisana w HTML, CSS, JS oraz Node.

## Uruchomienie
Aby uruchomić aplikację należy sklonować repozytorium przy pomocy komendy:

`git clone https://github.com/ArnikaZ/Portfolio_project.git`.

Następnie należy wywołać polecenie `npm run initialize`.

Po inicjalizacji jest możliwość użycia następujących komend:

| Komenda | Opis |
| ------- | ----------- |
| `npm run server` | Rozpoczyna proces serwera |
| `npm run client` | Otwiera stronę główną aplikacji |
| `npm run test` | Wykonuje testy jednostkowe serwera i otwiera stronę z raportem |

> [!IMPORTANT]
> Komenda `npm run server` musi być wykonana przed testowaniem/otwarciem aplikacji.

## Funkcjonalności

Aplikacja korzysta pośrednio z API `https://jsonplaceholder.typicode.com` (zapytania trafiają najpierw do naszego serwera a potem dopiero do API). Umożliwia przeglądanie, dodawanie, filtrowanie i sortowanie postów, wyświetlanie informacji o użytkowniku, wyświetlanie jego postów, albumów oraz zawartych w nich zdjęć.

### Strona główna
Po uruchomieniu wyświetla się strona główna:

![Zrzut ekranu 2024-04-15 084637](https://github.com/ArnikaZ/Portfolio_project/assets/139676226/d24f117e-7844-4ed2-a86a-e348457c2209)

Wyświetla posty oraz umożliwia ich filtrowanie oraz sortowanie na podstawie:
- Imienia i nazwiska użytkownika
- Długości posta (w znakach)

### Profil użytkownika
Po kliknięciu w użytkownika w poście wyświetla się profil użytkownika: 

![Zrzut ekranu 2024-04-15 084653](https://github.com/ArnikaZ/Portfolio_project/assets/139676226/56aed150-2428-4fee-8777-e5105e81745f)

Zawiera ona informacje o użytkowniku, jego albumy oraz kilka ostatnich postów.

### Zawartość albumu
Po kliknięciu w album wyświetla się zawartość albumu: 

![Zrzut ekranu 2024-04-15 084722](https://github.com/ArnikaZ/Portfolio_project/assets/139676226/c29b40f9-f003-4570-a174-c51cf9ca4162)

Zawiera ona wszystkie zdjęcia należące do albumu, tytuł oraz ilość zdjęć.

## Testy

Do testowania naszego serwera wykorzystaliśmy biblioteki Jest oraz supertest.

Po uruchomieniu testów, generowany jest raport, z którego można wyciągnąć bardziej szczegółowe dane.

Code coverage wygląda następująco:

![Zrzut ekranu 2024-04-15 090248](https://github.com/ArnikaZ/Portfolio_project/assets/139676226/c5dfce42-98da-4b24-a773-91eeb9dff643)

