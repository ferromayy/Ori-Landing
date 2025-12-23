# NOMAD - Landing Page & Tienda Virtual

Proyecto de landing page con tienda virtual para café de especialidad.

## 📁 Estructura del Proyecto

```
Ori-Landing/
├── index.html                 # Página principal / Home
├── pages/                     # Páginas principales
│   ├── shop/                  # Tienda
│   │   ├── index.html         # Listado de productos
│   │   └── product/           # Páginas de productos individuales
│   │       ├── colombia.html
│   │       ├── brasil.html
│   │       ├── uganda.html
│   │       └── triada.html
│   ├── about.html             # Nosotros
│   ├── wholesale.html          # Mayoristas
│   └── coffee.html             # Café
├── assets/                    # Recursos estáticos
│   ├── css/                   # Estilos (preparado para futuro)
│   ├── js/                    # JavaScript (preparado para futuro)
│   └── images/                # Imágenes
│       ├── products/
│       ├── hero/
│       └── icons/
└── components/                # Componentes reutilizables (futuro)
```

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador o usa un servidor local:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   ```

2. Navega a `http://localhost:8000`

## 📝 Páginas

- **Home**: `index.html` - Página principal con productos destacados
- **Tienda**: `pages/shop/index.html` - Listado completo de productos
- **Productos**: `pages/shop/product/*.html` - Páginas individuales de productos
- **Nosotros**: `pages/about.html`
- **Mayoristas**: `pages/wholesale.html`
- **Café**: `pages/coffee.html`

## 🛠️ Tecnologías

- HTML5
- Tailwind CSS (CDN)
- JavaScript Vanilla
- Google Fonts (Inter, Space Mono)
- Material Icons

## 📦 Productos

1. **Colombia - Lavado** - $24.000
2. **Brasil - Natural** - $19.500
3. **Uganda - Natural anaerobico** - $29.000
4. **TRIADA - DEGUSTACION** - $35.000

## 🔄 Próximos pasos sugeridos

1. Extraer CSS/JS a archivos separados
2. Crear componentes reutilizables (navbar, footer)
3. Centralizar configuración (precios, URLs)
4. Preparar para integración con backend/API
5. Implementar sistema de carrito de compras
6. Agregar sistema de checkout

## 📄 Licencia

Todos los derechos reservados - NOMAD

