## Mutuiamo

### Overview

L'architettura a microservizi per gestire il case study inviato richiederebbe la costruzione di almeno cinque microservizi. Ogni microservizio potrebbe avere davanti un gateway per gestire il carico e le sue istanze. Si potrebbe dunque creare il ms UTENTI con endpoint

-   POST /user/save : Per salvare un utente
-   GET /users : Per ottenere la lista utenti
-   GET /users/:userId : Per ottenere le informazioni di un singolo utente fornendo in input il suo userId

Analogo discorso per ms BANK, PRODUCT E PROSPECT. Ogni ms deve avere le API basiche per interagire con l'entità. Ogni ms deve poter connettersi al quinto ms, quello basato sulla persistenza in MySQL. Ogni dato deve essere correttamente parsato prima di essere inviato e poter interagire col DB, per evitare sql injection. Tutto questo viene omesso per semplicità. Sempre per semplicità, si creerà un ms unico che gira sulla porta 3000.

### Installazione

Clonare la repository ed installare i pacchetti node. Runnare il comando npm run start e si avvierà il server.

### Configurazione database

Configurare i dati di connessione col DB dentro il file mysql.js. E' possibile lasciare il logger attivo per leggere le operazioni di lettura e scrittura su DB.
Nessun controllo è stato effettuato sul valore dei campi, controlli come stesso nome o stessi valori. L'importante è l'ID univoco auto increment.
Nessun controllo sui LIMIT è inserito, anche nelle condizioni con le WHERE, per semplicità.
Il MySQLManager dovrebbe poter fare tutte le operazioni sulla tabelle ma per semplicità abbiamo aggiunto una funzione ad hoc per preparare i prospetti. Il concetto è sbagliato ma l'utilità è notevole.
