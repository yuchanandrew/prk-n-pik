CREATE DATABASE sadboiz;
USE sadboiz;

CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    clover_id VARCHAR(255) NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

INSERT INTO product (clover_id, image_url, description)
VALUES
("BP7KB3CTDG7GT", "https://i.imgur.com/FrZ0JzT.jpeg", "Swipe right on this iced baddie. Thirst Trap Thai Tea is that dangerously sweet, silky orange thirst quencher you pretend you don't usually go for ... but here you are, double-tapping it anyway. Thick, creamy, and just toxic enough to keep you coming back."),
("BXZA3X5QSCV74", "https://i.imgur.com/qdMbapi.jpeg", "Sip on this green elixir that's as complicated as your last text thread. Matcha Daddy Issues hits with a bitter-sweet vibe ... smooth, creamy, and packed with just enough drama to keep you questioning your life choices. Because sometimes, you need a drink that gets you."),
("FNA5KS7E1TTZG", "https://i.imgur.com/qdMbapi.jpeg", "Sip on this green elixir that's as complicated as your last text thread. Matcha Daddy Issues hits with a bitter-sweet vibe ... smooth, creamy, and packed with just enough drama to keep you questioning your life choices. Because sometimes, you need a drink that gets you."),
("607STATV5HXCW", "https://i.imgur.com/qdMbapi.jpeg", "Sip on this green elixir that's as complicated as your last text thread. Matcha Daddy Issues hits with a bitter-sweet vibe ... smooth, creamy, and packed with just enough drama to keep you questioning your life choices. Because sometimes, you need a drink that gets you."),
("6QXHEN60HXEMA", "https://i.imgur.com/JOkW2Qm.jpeg", "For the emotionally unavailable softie in all of us. Sleepyboi Chai wraps you up in a warm, spiced hug and whispers 'you up?' at 11:47 PM. Sweet, cozy, and a little reckless ... like texting your ex on a rainy night."),
("6QP8CNGAX3258", "https://i.imgur.com/lH1PTNY.jpeg", "Hot, dark, and makes you question everything. Existential Drip is the broody indie film of coffee ... no milk, no sugar, just pure liquid dread with notes of 'what am I even doing with my life?' Pairs well with staring out windows and overthinking texts you haven't sent."),
("BBM9CCWB0VZVG", "https://i.imgur.com/gDbKVf0.jpeg", "POV: it's 2:37 PM, you haven't eaten, your third eye's twitching, and Cappuccino Asesino pulls up like 'ciaooo principessa'. One sip and you're fluent in unhinged espresso thirst traps, fake Italian accents, and romanticizing your breakdown on a cobblestone street. Frothy. Feral. Fatal. You didn't choose the latte life ... the latte life chose you. #cappuccinoasesino #espressthot #vespavibesonly"),
("RJ5T53PZMEASJ", "https://i.imgur.com/g205qid.jpeg", "Le Epic Moka isn't just a drink, it's a whole moodboard. Chocolatey, over-caffeinated, and clinging to 2012 Tumblr quotes like 'I'm just a girl, standing in front of a coffee, asking it to love me.' One sip and you're impulse-buying a scented candle called Sad Boi Autumn and re-downloading Pinterest. It's giving quirky, it's giving random, it's giving 'rawr means I love you in dinosaur.'"),
("Q2YKTBQVAXFDE", "https://i.imgur.com/g205qid.jpeg", "Le Epic Moka isn't just a drink, it's a whole moodboard. Chocolatey, over-caffeinated, and clinging to 2012 Tumblr quotes like 'I'm just a girl, standing in front of a coffee, asking it to love me.' One sip and you're impulse-buying a scented candle called Sad Boi Autumn and re-downloading Pinterest. It's giving quirky, it's giving random, it's giving 'rawr means I love you in dinosaur.'"),
("SK1N6YXDVP85W", "https://i.imgur.com/g205qid.jpeg", "Le Epic Moka isn't just a drink, it's a whole moodboard. Chocolatey, over-caffeinated, and clinging to 2012 Tumblr quotes like 'I'm just a girl, standing in front of a coffee, asking it to love me.' One sip and you're impulse-buying a scented candle called Sad Boi Autumn and re-downloading Pinterest. It's giving quirky, it's giving random, it's giving 'rawr means I love you in dinosaur.'"),
("CDQX05SDSV3FC", "https://i.imgur.com/DvrCwH0.jpeg", "Sadboiz Classic is the OG emotional damage brew. Black as your Spotify Wrapped in November, bitter like your ex's passive-aggressive Instagram captions. One sip and you're staring out the window pretending you're in a 2007 indie film soundtrack, hoodie up, rain optional. It's giving 'sorry I'm just really bad at texting back' energy with a side of vague tweets at 2AM.");

-- User table creation:

CREATE TABLE users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    hashed_pw VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT NULL,
    session_id VARCHAR(255) DEFAULT NULL,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_item (
    cart_id INT NOT NULL,
    clover_id VARCHAR(255) NOT NULL UNIQUE,
    quantity INT NOT NULL DEFAULT 1,
    added_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    UNIQUE (cart_id, clover_id)
);