require('colors');

const { readFileSync } = require('fs');

const title = readFileSync('./title.txt', 'utf8');
const image = readFileSync('./image.txt', 'utf8');

const waitAsync = ms => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  console.clear();
  for (let i = 0; i < 300; i += 1) console.log();

  let lines = title.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    console.log(lines[i].yellow);
    await waitAsync(50);
  }

  await waitAsync(500);
  console.log();
  console.log();
  console.log();

  lines = image.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    console.log(lines[i]);
    await waitAsync(30);
  }
};

main();
