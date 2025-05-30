import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import books from './src/books/booksArray'; 
const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/books', (req, res) => {
  res.json([
    { id: 1, name: 'Book 1', author: 'Author 1' },
    { id: 2, name: 'Book 2', author: 'Author 2' },
    { id: 3, name: 'Book 3', author: 'Author 3' },
  ]);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/bookPage', (req, res) => {
  res.sendFile(path.join(__dirname, 'bookCafurna.html'));
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 