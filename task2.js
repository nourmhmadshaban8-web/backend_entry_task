const fs = require('fs').promises;
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('mergeAndWrite', async ([content1, content2]) => {
    try {
        const merged = content1 + '\n' + content2;
        await fs.writeFile('merged.txt', merged, 'utf8');
        console.log('Files merged and written successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
    }
});

async function processFiles() {
    try {
        const [data1, data2] = await Promise.all([
            fs.readFile('file1.txt', 'utf8'),
            fs.readFile('file2.txt', 'utf8')
        ]);
        
        emitter.emit('mergeAndWrite', [data1, data2]);
    } catch (err) {
        console.error('Error reading files:', err);
    }
}

processFiles();