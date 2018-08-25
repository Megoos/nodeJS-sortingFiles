const fs = require('fs');
const path = require('path');

let inputDir = process.argv[2];
let outputDir = process.argv[3];
const delInput = process.argv[4] === '-rm';

if (!inputDir || !outputDir) {
  console.error('Не задана исходная или итоговая папка');
  process.exit(1);
} else {
  inputDir = path.join(__dirname, inputDir);
  outputDir = path.join(__dirname, outputDir);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdir(outputDir, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    main();
  });
} else {
  main();
}

function main () {
  let count = 0;

  const countFiles = base => {
    fs.readdirSync(base).forEach(item => {
      const localBase = path.join(base, item);
      const state = fs.statSync(localBase);
      if (state.isDirectory()) {
        countFiles(localBase);
      } else {
        count += 1;
      }
    });
  };

  const rimraf = dirPath => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach(entry => {
        const entryPath = path.join(dirPath, entry);
        if (fs.statSync(entryPath).isDirectory()) {
          rimraf(entryPath);
        } else {
          fs.unlinkSync(entryPath);
        }
      });
      fs.rmdirSync(dirPath);
    }
  };

  const readDir = base => {
    try {
      const files = fs.readdirSync(base);

      files.forEach(item => {
        const stats = fs.statSync(path.join(base, item));
        if (stats.isDirectory()) {
          readDir(path.join(base, item));
        } else {
          const newBase = path.join(outputDir, item.charAt(0).toLowerCase());

          if (!fs.existsSync(newBase)) {
            fs.mkdirSync(newBase);
          }

          fs.copyFileSync(path.join(base, item), path.join(newBase, item));
          count -= 1;

          if (delInput && count === 0) {
            console.log('Удаление исходной папки');
            rimraf(inputDir);
          }
        }
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  delInput && countFiles(inputDir);
  readDir(inputDir);
}
