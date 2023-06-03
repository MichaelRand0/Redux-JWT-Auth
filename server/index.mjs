import app from './app.mjs';

const port = process.env.NEXT_PUBLIC_PORT || 3001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
