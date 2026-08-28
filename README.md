# 🇦🇷 FEDETUR - Plataforma Federal de Turismo Social y Solidario

**Federación de Cooperativas y Mutuales de la Red Federal de Turismo Coop. Ltda.**  
*Matrícula I.N.A.E.S. 25450 • Sede Central CABA, República Argentina*  
*Slogan:* **"Viajar, en busca de uno mismo"**

---

## 📖 Descripción General
Plataforma web y transaccional diseñada por el **Regimiento Antigravity** para interconectar a mutuales y cooperativas de todo el país con una red federal de alojamientos hoteleros, ofreciendo tarifas bonificadas exclusivas, reservas en tiempo real, emisión de vouchers con código QR y pagos online integrados con **MercadoPago**.

---

## 🏛️ Características Principales

1. **Portal Institucional & Público**:
   - Resguardo de la identidad federal de FEDETUR (Matrícula INAES 25450, Misión, Autoridades, Accionar en F.I.T. y Censo 2025).
   - Catálogo abierto de destinos para visitantes no afiliados.
   - Mapa interactivo de las 6 Regionales (NEA, NOA, Centro, Cuyo, Buenos Aires, Patagonia, Malvinas).
   - Red de Entidades Adheridas (Mu.Pe.Sa SAMEEP, Mutual Capital, FECOVIMA, DECAM, FOCOMEJ, etc.).

2. **Portal de Afiliados**:
   - **Carnet Digital Holográfico con QR**: Identificación oficial para check-in prioritario en hoteles.
   - Motor de búsqueda y reservas con **descuento mutual (20% al 30% OFF)**.
   - Historial de reservas y descarga/impresión de vouchers oficiales.

3. **Portal de Hoteles y Prestadores**:
   - Formulario de alta y autogestión de alojamientos.
   - Gestión de tipos de habitación, inventario de plazas y tarifas.
   - **Validador de Vouchers QR** para recepción en el mostrador del hotel.

4. **Backoffice FEDETUR (Auditoría & Control Estricto)**:
   - Panel de KPIs de reservas, transacciones monetarias ($ ARS) y hoteles activos.
   - **Padrón General de Afiliados** auditado.
   - **Registro Inmutable de Auditoría**: Trazabilidad de cada pago, reserva y aprobación con IP y timestamp.

5. **Pasarela de Pagos MercadoPago**:
   - Checkout Pro con soporte de tarjetas de débito/crédito, cuotas y dinero en cuenta.
   - Sincronización automática de estados de reserva vía Webhook.

6. **PWA & Mobile Ready (Android / iOS)**:
   - Web App Progresiva instalable en celulares con soporte offline mediante Service Worker y manifest estándar.

---

## 🛠️ Stack Tecnológico

- **Frontend & Backend**: Next.js 15 (App Router, Server Components & Server Actions)
- **Lenguaje**: TypeScript 5+ (Strict Mode)
- **Estilos & UI**: Tailwind CSS + Lucide Icons + Framer Motion + Canvas Confetti
- **Base de Datos & Auth**: Supabase (PostgreSQL 15 con Row Level Security)
- **Pasarela de Pagos**: MercadoPago SDK Oficial
- **Generación de QR**: `qrcode.react`
- **Despliegue**: Vercel + Repositorio GitHub (`Sargentxxx/fedetur-app`)

---

## 🚀 Puesta en Marcha Local

### 1. Clonar e Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Completa con tus credenciales:
```env
# SUPABASE (Cuenta: albertoezequielcrm@gmail.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MERCADOPAGO
MERCADOPAGO_ACCESS_TOKEN=TEST-your-access-token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-your-public-key

# APP URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Ejecutar Migraciones en Supabase
Copia el contenido del script [`supabase/schema.sql`](supabase/schema.sql) y ejecútalo en el **SQL Editor** de tu proyecto Supabase.

### 4. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 🐙 Despliegue en GitHub & Vercel

```bash
git init
git add .
git commit -m "feat: complete FEDETUR fullstack platform"
git branch -M main
git remote add origin https://github.com/Sargentxxx/fedetur-app.git
git push -u origin main
```

---

## 📜 Licencia & Derechos
Desarrollado para la **Federación de Cooperativas y Mutuales de la Red Federal de Turismo Coop. Ltda. (INAES 25450)**.  
Todos los derechos reservados.
