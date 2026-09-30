const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Sonde de vivacité (Liveness Probe K8s)
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Sonde d'état prêt (Readiness Probe K8s)
app.get('/ready', (req, res) => {
  // Ici on vérifierait la connexion à la BDD ou à RabbitMQ
  res.status(200).json({ ready: true });
});

// Endpoint métier : Catalogue Collector
app.get('/api/v1/items', (req, res) => {
  res.status(200).json([
    { id: 'item-01', title: 'Sneakers Jordan 1 Rétro 1985', price: 450, sellerId: 'usr-92' },
    { id: 'item-02', title: 'Figurine Boba Fett Hasbro 1979', price: 180, sellerId: 'usr-14' }
  ]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Collector-API] Écoute active sur le port ${PORT}`);
});