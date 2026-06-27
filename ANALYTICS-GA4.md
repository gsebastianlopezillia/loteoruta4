# Análisis atómico de analytics - Loteo Ruta 4

## Eventos implementados

| Evento | Parámetros | Significado |
|--------|------------|-------------|
| `whatsapp_click` | `cta_location` (hero, nav, footer, floating, lote_card, calculadora) | Click en CTA de WhatsApp |
| `email_submit` | `form_location`, `language` | Envío del formulario de email (ru/de) |
| `calculadora_link` | `lote_num`, `precio_usd` | Click en "Simular cuotas" desde una LoteCard |
| `calculadora_simulate` | `lote_num`, `precio_usd`, `plazo_meses` | Usuario completó simulación UVA |
| `scroll_depth` | `percent` (25, 50, 75, 100), `page` | Profundidad de scroll por página |

Page views se registran automáticamente en `/` y `/calculadora`.

---

## Configuración en GA4

1. **Admin** → **Propiedad** → **Eventos** → Verificar que aparezcan los eventos custom.
2. **Marcar conversiones**: Admin → Eventos → Marcar como conversión:
   - `whatsapp_click`
   - `email_submit`
   - `calculadora_simulate` (opcional: alta intención)

---

## Datos a exportar para análisis

Para que pueda evaluar desempeño y proponer mejoras, exportá estos reportes desde GA4 (rango: últimos 30–90 días):

### 1. Eventos por nombre
**Informes** → **Compromiso** → **Eventos**  
Exportar CSV con: Evento, Total de eventos, Usuarios que activaron el evento.

### 2. Parámetros de eventos
**Explorar** → **Exploración libre** → Nueva exploración:
- Dimensión: `Nombre del evento`, `cta_location` (para whatsapp_click)
- Métrica: `Recuento de eventos`
- Filtro: `Nombre del evento` = `whatsapp_click`  
Exportar para ver qué CTAs generan más clicks.

### 3. Embudo de conversión
**Explorar** → **Embudo**:
- Paso 1: `page_view` (página = /)
- Paso 2: `calculadora_link` o `scroll_depth` (percent >= 50)
- Paso 3: `whatsapp_click` o `calculadora_simulate`
- Paso 4: `email_submit`  
Exportar tasas de conversión entre pasos.

### 4. Páginas y sesiones
**Informes** → **Compromiso** → **Páginas y pantallas**  
Exportar: Ruta de página, Vistas de página, Usuarios, Tasa de rebote, Tiempo promedio de participación.

### 5. Fuentes de tráfico
**Informes** → **Adquisición** → **Tráfico de usuarios**  
Exportar: Fuente/Medio, Sesiones, Usuarios, Conversiones (por evento marcado).

---

## Métricas clave para conversión

| Métrica | Fórmula | Objetivo |
|---------|---------|----------|
| Tasa de contacto | (whatsapp_click + email_submit) / sesiones | Subir |
| Tasa de scroll 75% | scroll_depth 75% / page_view | Subir = más engagement |
| Conversión calculadora | calculadora_simulate / calculadora_link | Subir = menos fricción |
| CTA más efectivo | whatsapp_click por cta_location | Optimizar el que más convierte |

---

## Cómo pasarme los datos

1. Exportar cada reporte como **CSV** o **Excel**.
2. Pegar aquí el contenido o adjuntar los archivos.
3. Indicar el rango de fechas usado.

Con eso puedo hacer un análisis atómico y proponer cambios concretos (copy, UX, CTAs, embudo).
