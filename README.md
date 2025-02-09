# Keitokun Waitlist Bot

![Keitokun Waitlist](https://github.com/user-attachments/assets/3d26a3c4-26a4-4d89-ae85-beb83c8547cb)

## Overview

This project is a bot that performs pre-registration using temporary emails. It uses various libraries for different functionalities including displaying banners, handling proxies, generating random user agents, and more.

## Features

- Displays a custom banner using `cfonts`
- Generates random usernames and temporary emails
- Reads proxies from a file
- Uses random user agents for requests
- Performs pre-registration using temporary emails
- Saves registered emails to a file

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/team-project-888.git](https://github.com/marioatmajanugraha/Keitokun-Bot.git
    cd team-project-888
    ```

2. Install the dependencies:

    ```sh
    npm install axios fs readline cfonts chalk user-agents
    ```

3. Create a `proxy.txt` file in the root directory and add your proxy list (one proxy per line).

## Usage

1. Run the bot:

    ```sh
    node index.js
    ```
