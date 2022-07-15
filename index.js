require('dotenv').config();
const puppeteer = require('puppeteer');

// dependências do projeto: 
// nodemon (para recarregar automaticamente ao salvar)

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  //direciona para a página a ser testada
  await page.goto('https://github.com/login');

  await page.waitForSelector('input[name="login"]');
  //.type para digitar o usuário
  await page.type('input[name="login"]', process.env.user);
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', process.env.password);

  // localiza botão do tipo submit e clica
  await page.waitForSelector('input[type="submit"]');
  await page.click('input[type="submit"]');

  // checa se após logado será redirecionado para a url em questão
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  if (page.url() !== 'https://github.com')
    throw new Error('Login fail!');
  await browser.close();

})();

// referência: https://chihching.net/login-puppeteer