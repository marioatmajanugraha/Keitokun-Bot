// Suppress warnings
process.removeAllListeners('warning');
process.env.NODE_NO_WARNINGS = '1';

const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const cfonts = require('cfonts');
const chalk = require('chalk'); // Pastikan menggunakan chalk@4.x
const UserAgent = require('user-agents'); // Library to generate random user agents

// Fungsi untuk menampilkan banner
function showBanner() {
    cfonts.say('Team Project 888', {
        font: 'block',
        align: 'center',
        colors: ['cyan', 'blue'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
    });

    // Menampilkan teks sebagai paragraf biasa
    console.log(chalk.yellow('\nScript coded by - Mario || Waitlist Keitokun\n'));
}

// Panggil fungsi untuk menampilkan banner
showBanner();

// Array untuk menyimpan email yang telah terdaftar
const registeredEmails = [];

// Fungsi untuk menghasilkan username acak
function generateRandomUsername() {
    const randomString = Math.random().toString(36).substring(2, 8);
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomString}${randomNumber}`;
}

// Fungsi untuk mendapatkan email sementara
function getTempEmail(userUsername) {
    const email = `${userUsername}${generateRandomUsername()}@mailnesia.com`;
    return email;
}

// Fungsi untuk mendapatkan proxy dari file
function getProxy() {
    try {
        const proxies = fs.readFileSync('proxy.txt', 'utf-8').split('\n').filter(Boolean);
        if (proxies.length > 0) {
            return proxies[Math.floor(Math.random() * proxies.length)];
        }
    } catch (error) {
        console.error(chalk.red('Error reading proxy file:'), error.message);
    }
    return null;
}

// Fungsi untuk mendapatkan random user agent
function getRandomUserAgent() {
    const userAgent = new UserAgent();
    return userAgent.toString();
}

// Fungsi untuk melakukan pra-registrasi
async function praRegister(email, proxy) {
    const url = 'https://www.keitokun.com/webapi/v1/activity/collectEmail';
    const data = { email: email };
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': getRandomUserAgent(),
            'XToken': '1738592482919'
        },
        proxy: proxy ? {
            host: proxy.split(':')[0],
            port: parseInt(proxy.split(':')[1])
        } : undefined
    };

    if (proxy) {
        console.log(chalk.green(`Using proxy: ${proxy}`));
    } else {
        console.log(chalk.yellow('No proxy used'));
    }

    try {
        const response = await axios.post(url, data, axiosConfig);
        if (response.status === 200) {
            console.log(chalk.green(`Successfully registered: ${email}`));
            registeredEmails.push(email);
        } else {
            console.error(chalk.red(`Failed to register: ${email}`));
        }
    } catch (error) {
        console.error(chalk.red(`Error registering ${email}:`), error.message);
    }
}

// Fungsi untuk menyimpan email yang telah terdaftar ke file
function saveRegisteredEmails() {
    fs.appendFileSync('accounts.txt', registeredEmails.join('\n') + '\n');
    console.log(chalk.blue('Registered emails saved to accounts.txt'));
}

// Fungsi untuk menambahkan jeda
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fungsi utama untuk menjalankan bot
async function runBot(userUsername, numEmails, proxy) {
    for (let i = 0; i < numEmails; i++) {
        const email = getTempEmail(userUsername);
        console.log(chalk.blue(`Generated temporary email: ${email}`));
        await praRegister(email, proxy);
        console.log(chalk.magenta('[Jeda] -- 5 detik --'));
        await delay(5000); // Jeda 5 detik
    }

    saveRegisteredEmails();
}

// Prompt user for the number of emails to register and username
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your username: ', (userUsername) => {
    rl.question('How many emails do you want to register? ', async (answer) => {
        const numEmails = parseInt(answer);
        if (isNaN(numEmails) || numEmails <= 0) {
            console.log(chalk.red('Invalid number of emails. Exiting...'));
            rl.close();
            return;
        }

        // Membaca proxy sebelum bot dimulai
        const proxy = getProxy();
        if (proxy) {
            console.log(chalk.green(`Proxy loaded: ${proxy}`));
        } else {
            console.log(chalk.yellow('No proxy loaded. Continuing without proxy...'));
        }

        console.log(chalk.blue(`Starting bot to register ${numEmails} emails...`));
        await runBot(userUsername, numEmails, proxy);
        console.log(chalk.green('Bot finished running.'));
        rl.close();
    });
});