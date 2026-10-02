import tmi from '@tmi.js/chat';
import dotenv from 'dotenv';

dotenv.config();

const client = new tmi.Client({
    channels: [process.env.TWITCH_CHANNEL],
    token: process.env.TWITCH_TOKEN
});

const risposteGeneriche = [
    "Sì, direi proprio di sì.",
    "No, non ci conterei troppo.",
    "Forse... il Marione è indeciso.",
    "Le stelle non sono chiarissime.",
    "Direi 50 e 50.",
    "Chiedimelo più tardi.",
    "Oggi il Marione è ottimista.",
    "Meglio non sapere tutto in anticipo."
];

const risposteAmore = [
    "Qui sento delle vibrazioni interessanti 👀",
    "Potrebbe esserci qualcosa.",
    "Non correre troppo con la fantasia.",
    "Secondo me devi osservare meglio i segnali.",
    "Il Marione vede confusione sentimentale.",
    "Possibilità ce ne sono.",
    "Occhio a non diventare troppo preso.",
    "In amore il Marione non garantisce nulla."
];

const risposteGaming = [
    "Oggi si scala.",
    "Prevedo una lose evitabile.",
    "Il matchmaking non sarà dalla tua parte.",
    "Se non tilti, hai speranze.",
    "Il Marione vede punti rank in arrivo.",
    "Questa sa di partita da carry.",
    "Meglio riscaldare le mani prima.",
    "Il team farà cose discutibili."
];

const paroleAmore = [
    "amore",
    "ragazza",
    "ragazzo",
    "fidanzata",
    "fidanzato",
    "ama",
    "piaccio",
    "crush"
];

const paroleGaming = [
    "valorant",
    "league",
    "lol",
    "rank",
    "vinco",
    "partita",
    "game",
    "elo"
];

function getRandomResponse(testoDomanda) {
    if (testoDomanda === "") {
        return "Devi farmi una domanda!";
    }

    if (paroleAmore.some(word => testoDomanda.includes(word))) {
        const randomIndex = Math.floor(Math.random() * risposteAmore.length);
        return risposteAmore[randomIndex];
    }

    if (paroleGaming.some(word => testoDomanda.includes(word))) {
        const randomIndex = Math.floor(Math.random() * risposteGaming.length);
        return risposteGaming[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * risposteGeneriche.length);
    return risposteGeneriche[randomIndex];
}

client.on('message', event => {
    const { channel, user, message } = event;

    console.log(
        `[${channel.login}] ${user.login}: ${message.text}`
    );

    const testoNormalizzato = message.text.toLowerCase().trim();

    if (!testoNormalizzato.startsWith('!ball')) {
        return;
    }

    const testoDomanda = testoNormalizzato
        .slice(5)
        .trim();

    const risposta = getRandomResponse(testoDomanda);

    client.say(
        channel.login,
        `@${user.login} 🎱 ${risposta}`
    );
});

client.connect();

console.log("Marione Ball è online.");