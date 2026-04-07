fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1').then(res => res.json()).then(console.log).catch(console.error);
