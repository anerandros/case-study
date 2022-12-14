## Mutuiamo

### Overview

L'architettura a microservizi per gestire il case study inviato richiederebbe la costruzione di almeno cinque microservizi. Ogni microservizio dovrebbe poter essere connesso ad un gateway per gestire il carico e le sue istanze. Ogni ms deve avere le API basiche per interagire con l'entità. Ogni ms deve poter connettersi ms writer, quello basato sulla persistenza in MySQL. Ogni dato deve essere correttamente parsato prima di essere inviato e poter interagire col DB, per evitare sql injection. Tutto questo viene omesso per semplicità. Sempre per semplicità, si creerà un ms unico che gira sulla porta 3000. Analogamente, ogni dato dovrebbe sempre avere il proprio modello in JavaScript per lavorare opportunamente con esso.

### Installazione

Clonare la repository, installare i pacchetti `npm install`. Importare il database MySQL, cambiare la configurazione al database (punto successivo) dunque avviare il microservizio `npm run start`.

### Configurazione database

Configurare i dati di connessione col DB dentro il file mysql.js. Creare un database `mutiamo`. Importare il file db.sql dentro il database appena creato. E' possibile lasciare il logger attivo per leggere le operazioni di lettura e scrittura su DB.
Nessun controllo è stato effettuato sul valore dei campi, controlli come stesso nome o stessi valori. L'importante è l'ID univoco auto increment.
Nessun controllo sui LIMIT è inserito, anche nelle condizioni con le WHERE, per semplicità.
Il MySQLManager dovrebbe poter fare tutte le operazioni sulla tabelle ma per semplicità abbiamo aggiunto una funzione ad hoc per preparare i prospetti. Il concetto è sbagliato ma l'utilità è notevole.

### Costruzione del microservizio

Il server ha i seguenti endpoint:

-   POST /user/save
-   GET /user/:id
-   GET /user/:userId/prospect
-   GET /user/
-   POST /bank/save
-   GET /bank/:id
-   GET /bank/
-   POST /product/save
-   GET /product/:id
-   GET /product/
-   POST /prospect/save
-   GET /prospect/:id
-   GET /prospect/

Ogni endpoint di tipo `/entity/save` salva sulla tabella entity l'oggetto passato in POST. E' opportuno configurare le chiavi dell'oggetto così come i nomi delle colonne del database.
Ogni endpoint di tipo `/entity/:id` eseguirà una ricerca (senza LIMIT) sulla chiave primaria della tabella entity.
Ogni endpoint di tipo `/entity/` eseguirà una SELECT \* sulla tabella.
L'endpoint finale `/user/:userId/prospect` è una get che restituisce l'ultima prospect suggerita per l'utente con :userId come id_user. Si noti che viene rilasciata in risposta la tabella MySQL, ma internamente, nel codice, viene parsato opportunamento con il modello. Un ultimo appunto, si fa l'esempio di inserimento di un utente nel database, quindi POST su /user/save con formato raw JSON tramite Postman. Il payload sarà:

```
{
    "nome_user": "Mutu",
    "cognome_user": "iamo",
    "email_user": "mutiamo@mutuiamo.com",
    "cf_user": "XXXXXXXXXXXXXX"
}
```

### Typescript

Si omette TypeScript per semplicità. Ovviamente è opportuno lavorare tipizzati.
