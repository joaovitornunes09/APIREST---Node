import app from './app';

const port = 8765;

app.listen(port, () => {
  console.log();

  console.log(`Aplicação Iniciada na porta ${port}`);
  console.log(`http://localhost:${port}`);
});
