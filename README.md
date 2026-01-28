# Plataforma Ciudadana – Frontend (PWA)

Aplicación web progresiva (PWA) para el reporte ciudadano de incidencias en infraestructura pública, desarrollada como parte del Trabajo Final del curso **APR 440 – Programación Web III**.

## Justificación arquitectónica

Se adoptó una arquitectura **frontend-backend desacoplada** para garantizar escalabilidad, mantenibilidad y experiencia de usuario en contextos móviles con conectividad variable. El frontend es una **PWA offline-first**, lo que permite a los usuarios enviar reportes incluso sin conexión a internet, gracias a estrategias de caché y cola de reintentos.

## Tecnologías utilizadas

- **Framework**: React 18 (SPA moderna, componentes reutilizables)
- **Comunicación asíncrona**: 
  - Fetch API para operaciones CRUD
  - WebSocket para notificaciones en tiempo real
- **Offline-first**: Service Worker con estrategia cache-first para UI y network-first para API
- **Despliegue**: Vercel (CI/CD automático, HTTPS, CDN global)

## Instalación y ejecución

### Requisitos
- Node.js ≥ 18
- npm

### Pasos
```bash
# Clonar el repositorio
git clone https://github.com/AndreaSurdez/plataforma-ciudadana-frontend.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
>>>>>>> f0985fb (feat: frontend listo)
