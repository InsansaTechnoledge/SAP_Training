import { Account, Client } from 'appwrite';

const client = new Client();
client.setProject('67b6c19200039343be3b');

const account = new Account(client);

export {account, client};