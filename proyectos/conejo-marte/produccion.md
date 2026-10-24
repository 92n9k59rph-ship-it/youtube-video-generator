# Producción: Pompón en Marte. ¿Por qué todavía no podemos vivir allí?

- **Tema:** por qué los humanos todavía no podemos vivir en Marte, explicado por un conejo que viaja hasta allí.
- **Duración objetivo:** 15 min · **Duración estimada:** unas 1.800 palabras ≈ 14 min 45 s a 130 palabras por minuto, más unos 15 s de pantalla final ≈ 15 min.
- **Estilo visual:** animación 2D plana (*flat vector*), colores vivos (morados, naranjas, azules), formas redondeadas y estrellas de puntitos. Infantil, sin realismo.
- **Formato:** horizontal **16:9** (vídeo largo). El Short va aparte en `short.md`.
- **Voz:** Pompón narra en primera persona. Voz artificial en español, alegre, cálida y clara, sin prisa.
- **Archivos de este proyecto:**
  - `narracion.txt`: la narración completa por escenas, lista para pegar en «Texto a voz».
  - `subtitulos.srt`: los subtítulos, con tiempos estimados.
  - `short.md`: la versión para YouTube Shorts.

> **Sobre el canal de referencia:** las capturas que me enviaste sirven solo como inspiración del *tipo* de estilo (2D plano y colorido). Pompón es un personaje propio y los prompts no mencionan ningún canal, estudio ni marca. No copies sus personajes (los pájaros), sus escenas, su música ni sus textos.

---

## 1. Público objetivo y enfoque

- **Público:** niños de 7 a 12 años, y familias o profesores que buscan vídeos de ciencia.
- **Conocimiento previo:** saben que Marte es un planeta rojo; no saben qué lo hace peligroso para las personas.
- **Promesa del vídeo:** al terminar, el niño sabrá explicar con sus palabras los 6 grandes problemas de vivir en Marte.
- **Ángulo:** un viaje con un personaje simpático. Cada problema se descubre cuando a Pompón «le pasa algo»: quiere quitarse el casco, tiene frío, se acerca una tormenta… El mensaje es optimista y honesto: es muy difícil, pero se está investigando. La Tierra es especial y hay que cuidarla.

## 2. Títulos propuestos

1. ¿Por qué todavía no podemos vivir en Marte? Un conejo te lo explica
2. Pompón viaja a Marte: 6 problemas para vivir allí
3. Un conejo en Marte: ¿podríamos vivir en el planeta rojo?
4. ¿Te irías a vivir a Marte? Descubre lo que pasaría
5. Marte para niños: aire, frío, radiación y tormentas de polvo

**Recomendado: n.º 1.** Plantea la pregunta exacta que responde el vídeo, presenta al personaje y el «todavía» es honesto: no dice que sea imposible para siempre.

## 3. Guía visual (léela antes de generar imágenes)

### Cómo construir cada prompt
Cada prompt se monta así: **[descripción del plano] + [PERSONAJE] (si sale Pompón) + [ESTILO]**. Copia estos dos bloques y pégalos detrás de cada descripción:

**ESTILO** (va en todos los prompts):
```
flat 2D vector illustration for a children's science cartoon, bold rounded shapes, no outlines, vibrant saturated palette of deep navy, purple, orange, coral and teal, soft gradients, simple geometric details, stars drawn as small dots and sparkles, clean and friendly, 16:9 — avoid: text, letters, logos, watermark, photorealism, 3D render
```

**PERSONAJE** (va solo cuando sale Pompón):
```
featuring Pompón, a small round friendly white rabbit with long ears with pink insides, big shiny black eyes, a small pink nose, wearing a little orange space suit with a round clear glass helmet
```

### Para que Pompón salga siempre igual
1. Genera primero una **hoja de personaje**:
   ```
   character sheet of Pompón, a small round friendly white rabbit with long ears with pink insides, big shiny black eyes, a small pink nose, shown in front, side and back views, and with happy, surprised, worried and cold expressions, one version wearing a little orange space suit with a round clear glass helmet and one without, plain light background, flat 2D vector illustration, bold rounded shapes, no outlines, vibrant colors, children's cartoon — avoid: text, logos
   ```
2. Si tu generador permite **imagen de referencia**, usa siempre esa hoja.
3. **Truco de animación:** genera algunas imágenes de Pompón solo, sobre fondo liso, y recórtalo en CapCut (**Eliminar fondo** / «Recorte»). Así puedes ponerlo encima de cualquier fondo y moverlo con fotogramas clave: que camine, salte, flote o tiemble. Así se consigue el efecto de dibujo animado sin animar a mano.

### Cuántas imágenes
Hay unas **70 descripciones de plano**. En un vídeo de 15 minutos, cada imagen dura entre 10 y 15 s con zoom o desplazamiento. Puedes reutilizar fondos (el espacio, el paisaje marciano) y cambiar solo lo que hay encima.

## 4. Guion por escenas

La narración de cada escena está en `narracion.txt`, con el mismo número de escena. Aquí está todo lo que va en pantalla.

### Escena 1: ¿Y si te despertaras en Marte? (00:00–00:44)
- **Objetivo:** gancho y presentación.
- **En pantalla:** una habitación con ventana a un paisaje marciano. Pompón, en pijama, abre la ventana y quiere salir corriendo. Una gran señal de «¡ALTO!» lo detiene. Luego Pompón saluda a cámara, ya con su traje.
- **Planos (descripción + ESTILO):**
  1. `cozy bedroom with a round window showing a red Martian landscape with a caramel-colored sky and red mountains`
  2. `Pompón the white rabbit in pajamas stretching and yawning next to the round window, excited face` + PERSONAJE (sin casco)
  3. `Pompón running happily toward a door that opens to the Martian desert, motion lines`
  4. `big round red stop sign shape popping up in front of a surprised Pompón, comic style`
  5. `Pompón in his orange space suit waving hello to the viewer, starry purple background, big smile` + PERSONAJE
- **Rótulos:** «¿POR QUÉ NO PODEMOS VIVIR EN MARTE?» (en «por qué los humanos todavía no podemos vivir en Marte»)
- **Música / SFX:** música alegre y curiosa; sonido de ventana, frenazo cómico en «¡alto ahí!» y «pop» al saludar.

### Escena 2: El sueño de Pompón (00:44–01:38)
- **Objetivo:** presentar Marte y la misión.
- **En pantalla:** Pompón de noche en una colina mirando las estrellas; un puntito rojo brilla. Zoom al puntito, que se convierte en Marte. Pompón prepara el cohete y la mochila de zanahorias. Cuenta atrás y despegue.
- **Planos:**
  1. `Pompón sitting on a grassy hill at night looking up at a starry purple sky, one small glowing red dot among the stars` + PERSONAJE (sin casco)
  2. `the planet Mars in space, round and red-orange with darker patches and a small white polar cap, starry navy background`
  3. `simple diagram of the Sun and the first four planets in a row, Mars highlighted with a glow` (la etiqueta «4.º» se añade en CapCut)
  4. `small cartoon rover robots on the red surface of Mars, no humans`
  5. `Pompón packing a backpack full of carrots next to a small white and purple rocket on a launch pad` + PERSONAJE
  6. `cartoon rocket launching into a purple night sky with big orange and yellow round flames and puffy smoke clouds`
- **Rótulos:** «MARTE · 4.º planeta», «0 personas en Marte · solo robots»
- **Música / SFX:** grillos nocturnos, brillo mágico en el puntito rojo, cuenta atrás «3, 2, 1» y rugido de despegue.
- **⚠️ VERIFICAR:** que ningún ser humano haya viajado a Marte a la fecha de publicación.

### Escena 3: Un viaje larguísimo (01:38–03:07)
- **Objetivo:** distancia, duración del viaje y ventanas de lanzamiento.
- **En pantalla:** la Tierra y Marte separados por una línea punteada larguísima; un cochecito diminuto que no llega nunca; el calendario de 6–9 meses; el tiovivo (las órbitas como carriles); el interior de la nave con comida y agua; Pompón arreglando algo con una llave inglesa; Pompón aburrido en la ventanilla y Marte apareciendo.
- **Planos:**
  1. `Earth on the left and Mars on the right, very far apart, connected by a long dotted line across a starry navy background`
  2. `tiny cartoon car driving along a dotted line in space, Mars very far away, funny`
  3. `small spaceship cruising through space past glowing stars, calendar pages flying behind it`
  4. `simple orbit diagram: the Sun in the center, Earth and Mars on two circular orbits, a curved dotted path from Earth to Mars`
  5. `colorful merry-go-round seen from above, playful, as a metaphor for planets orbiting`
  6. `cutaway of a small spaceship interior with food packets, water tanks and air tanks on shelves, Pompón floating inside` + PERSONAJE
  7. `Pompón floating in zero gravity fixing a panel with a big wrench, sparks, determined face` + PERSONAJE
  8. `Pompón pressing his helmet against a round spaceship window, Mars growing big outside` + PERSONAJE
- **Rótulos:** «+50 millones de km», «6–9 meses de viaje», «Cada ~2 años»
- **Música / SFX:** música de viaje, suave y continua; motor de coche cómico, clic de llave inglesa y «¡ahí está!» con subida musical.
- **⚠️ VERIFICAR:** la distancia mínima Tierra–Marte (más de 50 millones de km), la duración del viaje con la tecnología actual (6–9 meses), las ventanas de lanzamiento (aproximadamente cada 26 meses) y la comparación con el coche (décadas).

### Escena 4: ¡Bienvenido a Marte! (03:07–04:23)
- **Objetivo:** presentar Marte: color, tamaño, día, año y Monte Olimpo.
- **En pantalla:** la nave aterriza; la superficie roja; una bici oxidada para comparar; la Tierra y Marte uno al lado del otro; un reloj con 24 h 40 min; una tarta de cumpleaños con un calendario; el Monte Olimpo junto al Everest; Pompón a punto de abrir la puerta.
- **Planos:**
  1. `small spaceship landing on red Martian ground with dust puffs, red mountains and caramel sky`
  2. `close-up of red Martian soil and rocks next to an old rusty bicycle, playful comparison`
  3. `Earth and Mars side by side to scale on a starry background, Mars about half the width of Earth`
  4. `cartoon clock and a Martian sunset with a small blue-tinted sun`
  5. `Pompón looking at a birthday cake with one candle next to a calendar with many pages` + PERSONAJE
  6. `huge wide shield volcano on Mars next to a much smaller Earth mountain for scale, side view diagram`
  7. `Pompón in his space suit reaching for the spaceship door handle, helmet off in his other hand` + PERSONAJE
- **Rótulos:** «Óxido de hierro = color rojo», «Marte ≈ la mitad de ancho que la Tierra», «1 día = 24 h 40 min», «1 año = 687 días», «MONTE OLIMPO · ~2,5 × Everest»
- **Música / SFX:** «¡Bienvenido!» con fanfarria corta; viento suave marciano; «¡Uy!» con disco rayado (*record scratch*).
- **⚠️ VERIFICAR:** el color por óxido de hierro, el diámetro (aproximadamente la mitad del de la Tierra), la duración del día (unas 24 h 40 min) y del año (unos 687 días terrestres), y la altura del Monte Olimpo (unas 2,5 veces el Everest) y su lugar entre los volcanes más grandes del sistema solar.

### Escena 5: Problema 1: el aire (04:23–05:46)
- **Objetivo:** el aire de Marte es poco y no tiene oxígeno; la presión; el traje como «Tierra portátil».
- **En pantalla:** un gran cartel «PROBLEMA 1: EL AIRE»; pulmones felices en la Tierra; dos cajas de aire (la de la Tierra llena de bolitas, la de Marte casi vacía); bolitas de CO₂ frente a bolitas de O₂; Pompón con cara de agobio sin casco (solo en imaginación, con un bocadillo de pensamiento); el «abrazo invisible» (flechas suaves que rodean a Pompón); el traje como una Tierra pequeñita; Pompón saliendo y tiritando.
- **Planos:**
  1. `big rounded title card shape with an air swirl icon, purple background` (el texto se añade en CapCut)
  2. `two transparent boxes side by side: left box labeled with an Earth icon full of many small colorful air particles, right box with a Mars icon with only a few particles`
  3. `air particles shown as round balls: most are grey-blue carbon dioxide balls, almost no red oxygen balls, playful science diagram`
  4. `Pompón in a thought bubble without helmet looking uncomfortable, holding his breath, comic style, Mars background` + PERSONAJE
  5. `Pompón surrounded by many soft gentle arrows pressing inward like an invisible hug, Earth background` + PERSONAJE
  6. `Pompón in his space suit, a tiny glowing Earth drawn on the suit's chest like a shield, proud pose` + PERSONAJE
  7. `Pompón stepping out of the spaceship onto Mars, shivering, small frost crystals around him` + PERSONAJE
- **Rótulos:** «PROBLEMA 1: EL AIRE», «Más de 100 veces más fino», «Casi todo CO₂ · casi nada de O₂», «Traje = Tierra portátil»
- **Música / SFX:** «ding» de título; respiración tranquila; «¡Brrrr!» y castañeteo de dientes.
- **⚠️ VERIFICAR:** la presión atmosférica de Marte (menos del 1 % de la terrestre, es decir, más de 100 veces menor) y su composición (alrededor del 95 % de CO₂ y muy poco oxígeno).
- **Nota de tono:** no se explica qué le pasaría al cuerpo con detalles que puedan asustar. Basta con «no podría respirar» y «el cuerpo no funciona bien».

### Escena 6: Problema 2: el frío (05:46–07:02)
- **Objetivo:** distancia al Sol, la atmósfera no abriga, temperaturas.
- **En pantalla:** el Sol con rayos que llegan menos a Marte; una manta agujereada como metáfora; un termómetro gigante; un congelador para comparar; el día y la noche con el termómetro bajando; los polos helados; una casita marciana con calefacción; las orejas de Pompón calentitas.
- **Planos:**
  1. `the Sun on the left with long rays, Earth receiving many rays and Mars farther away receiving fewer rays, diagram`
  2. `thin see-through blanket with holes floating over Mars, warmth escaping as wavy lines`
  3. `giant cartoon thermometer stuck in red Martian ground with frost on it, blue color at the bottom`
  4. `open home freezer with frost next to a much colder icy Mars landscape, comparison`
  5. `split scene: sunny Martian afternoon on the left, freezing dark Martian night with frost on the right`
  6. `icy white polar cap of Mars under a dark sky, cold blue tones`
  7. `small rounded Martian habitat dome with warm orange light glowing from its windows at night` (sin personaje)
  8. `close-up of Pompón smiling inside his helmet, his ears tucked in, little heart-shaped warmth icon` + PERSONAJE
- **Rótulos:** «PROBLEMA 2: EL FRÍO», «Media: ~ −60 °C», «Polos en invierno: < −100 °C»
- **Música / SFX:** viento helado; cristal congelándose; «ahhh» de alivio y un tono misterioso al final («otro peligro que no se ve»).
- **⚠️ VERIFICAR:** la temperatura media (unos −60 °C), las máximas en el ecuador en verano (alrededor de 20 °C) y las mínimas en los polos en invierno (por debajo de −100 °C).

### Escena 7: Problema 3: la radiación (07:02–08:36)
- **Objetivo:** qué es la radiación, los dos escudos de la Tierra y por qué Marte no los tiene.
- **En pantalla:** partículas como chispitas que salen del Sol y de muy lejos; la Tierra con una burbuja magnética (líneas curvas) y una capa gruesa de atmósfera; Marte sin burbuja y con una capa fina; casas bajo tierra y en cuevas; Pompón feliz en su madriguera; una nube enorme en el horizonte.
- **Planos:**
  1. `the Sun shooting tiny glowing sparkle particles into dark space, plus faster sparkles coming from distant stars`
  2. `Earth surrounded by a soft glowing magnetic bubble of curved lines deflecting sparkle particles`
  3. `Earth with a thick soft blue atmosphere layer slowing down sparkle particles`
  4. `Mars with a very thin atmosphere layer and no bubble, sparkle particles reaching its surface`
  5. `cutaway of underground Martian habitat rooms dug below red ground, cozy lights, like a burrow`
  6. `Martian habitat dome covered by a thick layer of red soil and ice blocks`
  7. `Pompón happily lying inside a cozy underground burrow-like room on Mars, thumbs up` + PERSONAJE
  8. `Pompón on the Martian plain shading his eyes looking at a huge orange dust cloud on the horizon` + PERSONAJE
- **Rótulos:** «PROBLEMA 3: LA RADIACIÓN», «Escudo 1: campo magnético», «Escudo 2: atmósfera», «Casas = madrigueras 🐰»
- **Música / SFX:** zumbido eléctrico suave para las partículas; «bloop» cuando rebotan en la burbuja; risita de Pompón y viento creciente.
- **⚠️ VERIFICAR:** que Marte perdió su campo magnético global hace miles de millones de años, que a su superficie llega más radiación que a la de la Tierra, y que existen propuestas de hábitats bajo tierra o cubiertos de regolito o hielo.

### Escena 8: Problema 4: el polvo (08:36–09:53)
- **Objetivo:** tormentas de polvo, la energía solar, el caso de Opportunity y los percloratos.
- **En pantalla:** polvo finísimo (con una bolsa de harina para comparar); tormenta pequeña; tormenta que envuelve el planeta; paneles solares tapados; un rover dormido bajo el polvo; Pompón limpiándose las botas con un cepillo antes de entrar; Pompón dando un salto gigante.
- **Planos:**
  1. `close-up of very fine red dust next to a small bag of flour, playful comparison`
  2. `small swirling dust devil on the Martian plain`
  3. `Mars seen from space gradually covered by an orange global dust storm, before and after`
  4. `solar panels covered in red dust under a dim orange sky, sad low-battery icon`
  5. `small six-wheeled rover with solar panels resting under a layer of dust, sleepy closed-eye lights, gentle and sad`
  6. `Pompón in an airlock brushing red dust off his boots and suit with a big brush, little warning sign shape on the wall` + PERSONAJE
  7. `Pompón jumping very high above the Martian ground, huge happy smile, motion lines` + PERSONAJE
- **Rótulos:** «PROBLEMA 4: EL POLVO», «Opportunity · 2018», «Percloratos = tóxicos»
- **Música / SFX:** viento fuerte y arena; zumbido de batería agotándose; cepillo frotando; «boing» del salto.
- **⚠️ VERIFICAR:** las tormentas globales de polvo, la pérdida de contacto con Opportunity durante la tormenta de 2018 (la misión se dio por terminada en 2019) y la presencia de percloratos en el suelo de Marte y su toxicidad.
- **Imágenes:** dibuja un rover genérico, no una copia exacta del real, y no uses logotipos de agencias.

### Escena 9: Problema 5: la gravedad (09:53–10:57)
- **Objetivo:** gravedad más baja y sus efectos en el cuerpo.
- **En pantalla:** una báscula que marca 30 en la Tierra y 11 en Marte; Pompón saltando altísimo; huesos y músculos dibujados de forma amable; astronauta flotando en una estación espacial; signos de interrogación; la barriga de Pompón haciendo ruido.
- **Planos:**
  1. `two cartoon bathroom scales side by side, one on Earth and one on Mars, the Mars one showing a much smaller number` (los números se añaden en CapCut)
  2. `Pompón jumping much higher on Mars than a small Earth comparison silhouette, playful arc lines` + PERSONAJE
  3. `friendly cartoon bone and muscle characters lifting weights, smiling, simple`
  4. `cartoon astronaut floating inside a space station module, generic, no flags or logos`
  5. `big floating question marks over the Martian landscape, curious mood`
  6. `Pompón holding his tummy with a funny growling sound effect shape, carrot thought bubble` + PERSONAJE
- **Rótulos:** «PROBLEMA 5: LA GRAVEDAD», «30 kg → ~11 kg», «¿Qué pasaría en muchos años? ❓»
- **Música / SFX:** «boing» en los saltos; un «hmm» de misterio en las preguntas; ruido de tripa cómico.
- **⚠️ VERIFICAR:** la gravedad de Marte (alrededor del 38 % de la terrestre, así que 30 kg × 0,38 ≈ 11 kg), la pérdida de masa ósea y muscular en astronautas en microgravedad, y que los efectos de vivir muchos años con la gravedad de Marte no se conocen todavía.

### Escena 10: Problema 6: el agua y la comida (10:57–12:13)
- **Objetivo:** el hielo como fuente de agua y la dificultad de cultivar.
- **En pantalla:** la mochila de zanahorias casi vacía; un mapa de Marte con hielo en los polos y bajo el suelo; una máquina que excava, derrite y filtra; el suelo marciano frente a la tierra de huerto; un invernadero en Marte; un laboratorio en la Tierra con macetas de tierra roja.
- **Planos:**
  1. `Pompón looking sadly into an almost empty backpack with one carrot left` + PERSONAJE
  2. `Mars with white icy polar caps and a cutaway showing hidden ice layers under the red ground`
  3. `simple cartoon machine on Mars digging ice, melting it and filtering it into a water tank, step by step`
  4. `split image: dark rich garden soil with worms and sprouts on the left, dry red Martian soil with a small warning sign on the right`
  5. `glowing greenhouse dome on Mars full of green plants and carrots growing under purple grow lights`
  6. `scientist in a lab coat in an Earth laboratory watering small plants in pots of red soil, generic and friendly`
  7. `Pompón sitting on a red rock looking thoughtful at the Martian sunset` + PERSONAJE
- **Rótulos:** «PROBLEMA 6: AGUA Y COMIDA», «Agua = hielo (polos y subsuelo)», «Invernaderos 🥕»
- **Música / SFX:** música más pausada; excavadora suave, burbujeo de agua y riego.
- **⚠️ VERIFICAR:** la existencia de hielo de agua en los polos y en el subsuelo de Marte, que el suelo marciano no sirve tal cual para cultivar (faltan nutrientes y hay percloratos), y los experimentos en la Tierra con suelos que imitan al de Marte.

### Escena 11: ¿Algún día? (12:13–13:36)
- **Objetivo:** mensaje optimista y honesto: los robots, MOXIE y lo que se investiga.
- **En pantalla:** dos rovers genéricos trabajando; una cajita (MOXIE) que suelta burbujitas de oxígeno; una pizarra con dibujos de casas, hielo, plantas y salud; una base científica en la Antártida que se transforma en una base en Marte; un niño o niña con casco de astronauta de juguete mirando al cielo.
- **Planos:**
  1. `two different generic six-wheeled rovers exploring red Martian rocks, one with a small drill, sunny caramel sky`
  2. `small golden box on a rover releasing tiny bubbles labeled with oxygen symbols, magical science moment` (el texto «O₂» se añade en CapCut)
  3. `cartoon chalkboard with doodles of a protected habitat, ice, plants and a heart for health`
  4. `cozy research station in snowy Antarctica transforming into a research base on Mars, split screen`
  5. `a child wearing a toy astronaut helmet looking up at a starry sky with a tiny red dot, hopeful`
- **Rótulos:** «Curiosity · desde 2012», «Perseverance · desde 2021», «MOXIE → oxígeno», «Nadie vive en Marte… TODAVÍA»
- **Música / SFX:** la música crece, esperanzadora; pitidos de robot; burbujitas al salir el oxígeno.
- **⚠️ VERIFICAR:** los aterrizajes de Curiosity (agosto de 2012) y Perseverance (febrero de 2021), que ambos siguen activos a la fecha de publicación, y que el experimento MOXIE produjo oxígeno a partir del CO₂ marciano.
- **Imágenes:** dibuja rovers genéricos. Si usas imágenes reales de NASA, consulta sus normas de uso de imágenes (normalmente permiten el uso educativo, pero no usar el logotipo como respaldo).

### Escena 12: Nuestro planeta es especial (13:36–14:28)
- **Objetivo:** cierre emotivo y cuidado de la Tierra.
- **En pantalla:** la Tierra azul y verde desde el espacio; iconos que aparecen a su alrededor (aire, termómetro agradable, escudo, gotas de agua, zanahoria); Pompón abrazando un globo terráqueo; Pompón en su madriguera en la Tierra.
- **Planos:**
  1. `beautiful blue and green Earth in space with soft glowing atmosphere, calm and warm`
  2. `Earth surrounded by friendly floating icons: an air swirl, a comfortable thermometer, a shield, water drops, a carrot`
  3. `Pompón without helmet hugging a small globe, happy and peaceful, green meadow background` + PERSONAJE (sin casco)
  4. `Pompón resting in a cozy burrow under a green meadow, carrots on a shelf, warm light` + PERSONAJE (sin casco)
- **Rótulos:** «Solo hay una Tierra 🌍»
- **Música / SFX:** música tierna; pajaritos y viento suave sobre la hierba.

### Escena 13: Despedida (14:28–15:00)
- **Objetivo:** invitar a hablar en familia y presentar la pantalla final.
- **En pantalla:** Pompón saluda con la mochila y los planetas de fondo. Después, la pantalla final de 15 s con huecos para «vídeo recomendado» y «suscribirse».
- **Planos:**
  1. `Pompón waving goodbye with his carrot backpack, Mars and Earth in the starry background, big smile` + PERSONAJE
  2. `simple starry purple end screen background with two empty rounded rectangle areas, room for video thumbnails`
- **Rótulos:** «¿Te irías a vivir a Marte?» y «¡Nos vemos en el próximo viaje!»
- **Música / SFX:** la música alegre del principio vuelve como cierre.

## 5. Narración completa

Está en **`narracion.txt`**, separada por escenas.

- **Voz:** en CapCut, Texto → **Texto a voz**, con una voz española alegre y clara a velocidad normal. Haz **una voz por escena** para cuadrar las imágenes con facilidad.
- Las marcas **[pausa]** no se pegan: bórralas y deja un punto y aparte en su lugar, o divide el texto ahí.
- **Pronunciación:** si la voz lee mal «MOXIE», escribe «Moxi»; si lee mal «Opportunity», «Oportúniti»; si lee mal «Curiosity», «Kiuriósiti».
- Si la voz va más rápida de lo previsto y el vídeo se queda en unos 13 minutos, deja respirar las imágenes con 1–2 s de música entre escenas. No hace falta añadir texto.

## 6. Música y efectos de sonido

| Parte | Música / SFX | Energía | Fuente con licencia sugerida | Nota de licencia |
|---|---|---|---|---|
| Escenas 1–2 y 13 | Música alegre y curiosa (*ukulele*, *glockenspiel* o *pizzicato*), sin letra | Media-alta | Biblioteca de audio de YouTube (busca estados de ánimo como «Feliz» o «Divertido») | Comprueba si pide atribución |
| Escenas 3–4 | Música de viaje espacial: sintetizadores suaves | Media | Biblioteca de audio de YouTube | Igual |
| Escenas 5–10 | Una base tranquila y curiosa; un toque de misterio en la radiación y más intensidad en la tormenta | Media, con variaciones | Biblioteca de audio de YouTube | Cambia de pista cada 2 o 3 escenas para no cansar |
| Escenas 11–12 | Música esperanzadora y emotiva | Creciente → tierna | Biblioteca de audio de YouTube | — |
| Efectos | «Pop», «boing», «ding», viento, cohete, burbujas, pitidos de robot, cepillo, ruido de tripa | — | Efectos de sonido de la Biblioteca de audio de YouTube y Freesound con filtro CC0 | CC0: no requiere atribución. CC-BY: hay que poner atribución |

Mantén la música **baja (15–20 %)** bajo la voz: en un vídeo infantil largo, la claridad de la voz es lo más importante. No uses canciones infantiles conocidas ni música de series o películas.

## 7. Subtítulos y rótulos

- **Subtítulos:** archivo `subtitulos.srt`, con 227 bloques generados a partir de la narración. Los tiempos son **estimados** (130 palabras por minuto): importa el archivo y ajústalo, o usa los subtítulos automáticos de CapCut y corrígelos con `narracion.txt`. Usa letra grande, redondeada, blanca, con fondo oscuro semitransparente: se lee mejor para niños que están aprendiendo a leer.
- **Rótulos:** los de cada escena (sección 4). Estilo: tipografía redondeada y gruesa (por ejemplo, Nunito Black o la equivalente de CapCut), dentro de «píldoras» de color, con entrada de rebote (*bounce*). Los títulos «PROBLEMA 1…6» deben ser iguales todos: haz uno y duplícalo cambiando el número y el color.

## 8. Miniatura

- **Concepto:** Pompón con su traje naranja, en primer plano a la derecha, con cara de sorpresa y preocupación; detrás, Marte enorme y rojo; a la izquierda, un casco con un signo de interrogación.
- **Texto (4 palabras como máximo):** «¿VIVIR EN MARTE?»
- **Colores / composición:** fondo azul marino con estrellas, Marte naranja intenso, el traje naranja con borde de luz blanco y el texto amarillo con contorno morado oscuro. Nada de clickbait: no pongas «¡PELIGRO MORTAL!» ni nada parecido.
- **Prompt de generación:**
  ```
  Pompón, a small round white rabbit with long ears, big shiny black eyes and a little orange space suit with a round clear glass helmet, close-up on the right side with a surprised and worried expression, a huge red-orange planet Mars behind him, deep navy starry background, bright rim light, flat 2D vector illustration, bold rounded shapes, vibrant colors, children's cartoon, 16:9 — avoid: text, letters, logos, watermark
  ```

## 9. Descripción para YouTube

```
¿Por qué todavía no podemos vivir en Marte? 🚀🐰 Viaja con Pompón, un conejo explorador, y descubre los 6 grandes problemas de vivir en el planeta rojo: el aire, el frío, la radiación, el polvo, la gravedad y el agua y la comida.

Un vídeo de ciencia para niños, perfecto para ver en familia o en clase.

Capítulos:
00:00 ¿Y si te despertaras en Marte?
00:44 El sueño de Pompón
01:38 Un viaje larguísimo
03:07 ¡Bienvenido a Marte!
04:23 Problema 1: el aire
05:46 Problema 2: el frío
07:02 Problema 3: la radiación
08:36 Problema 4: el polvo
09:53 Problema 5: la gravedad
10:57 Problema 6: el agua y la comida
12:13 ¿Algún día?
13:36 Nuestro planeta es especial
14:28 Despedida

Música y efectos: [nombre de la pista y autor, según la licencia]
Imágenes: ilustraciones generadas con IA.
Fuentes: [añadir las fuentes verificadas, por ejemplo páginas de divulgación de agencias espaciales o museos de ciencia]

#Marte #ciencia para niños #espacio
```

> Los capítulos tienen **tiempos estimados**: cámbialos por los reales cuando termines el montaje. YouTube exige que el primero sea 00:00.

- **Etiquetas:** Marte para niños, vivir en Marte, planeta Marte, ciencia para niños, sistema solar, espacio para niños, astronomía infantil, conejo explorador
- **Configuración obligatoria al subirlo:** en «Audiencia», marca **«Sí, es contenido creado para niños»**. Es una obligación legal en YouTube para vídeos dirigidos a niños: desactiva los comentarios y los anuncios personalizados. Por eso la despedida no pide que dejen comentarios.
- **Divulgación de IA:** las ilustraciones de dibujos animados no suelen requerir la etiqueta de contenido «alterado o sintético», pero revisa las opciones al subirlo.

## 10. Checklist de edición en CapCut (iPad)

> Los nombres de los menús pueden variar según la versión. Un proyecto de 15 minutos es pesado: trabaja **por partes**.

**Preparación**
- [ ] Genera la hoja de personaje y, después, las imágenes de cada escena. Guárdalas en álbumes de Fotos con nombres como «Marte E01», «Marte E02»…
- [ ] Genera también 4–6 imágenes de **Pompón solo** (saludando, saltando, con frío, pensando, sorprendido) para recortarlo y reutilizarlo.
- [ ] Libera espacio en el iPad: un proyecto de 15 minutos con muchas imágenes puede ocupar varios GB.

**Montaje (te recomiendo 3 proyectos: escenas 1–4, 5–9 y 10–13; luego los unes)**
- [ ] **Nuevo proyecto** → formato **16:9**.
- [ ] Voz: Texto → **Texto a voz**, una voz por escena con el texto de `narracion.txt` (sin las marcas [pausa]). Usa siempre la misma voz.
- [ ] Coloca las imágenes de la escena y ajusta su duración a su trozo de voz.
- [ ] **Movimiento:** usa fotogramas clave (el rombo con +) con zoom o desplazamiento lento en cada imagen.
- [ ] **Pompón animado:** añade el recorte de Pompón como **Superposición** (*Overlay*) → **Eliminar fondo** y muévelo con fotogramas clave: que entre andando, salte (arriba y abajo rápido) o tiemble de frío (pequeños movimientos de lado a lado).
- [ ] **Transiciones:** suaves (deslizar o fundido) entre escenas; cortes rápidos dentro de una escena.
- [ ] **Rótulos:** Texto → Añadir texto con estilo «píldora» y animación de rebote. Duplica el de «PROBLEMA 1» para los demás.
- [ ] **Música:** importa desde Archivos las pistas descargadas de la Biblioteca de audio de YouTube y bájalas al 15–20 %.
- [ ] **Efectos de sonido** en sus momentos (sección 4), al 40–60 %.
- [ ] **Subtítulos:** Texto → **Subtítulos automáticos** (español) y corrígelos con la narración, o importa `subtitulos.srt` si tu versión lo permite.
- [ ] Exporta cada parte en 1080p y únelas en un proyecto final (o, si tu iPad aguanta, monta todo en uno).
- [ ] **Pantalla final:** deja los últimos 15 s con el fondo de la escena 13 para colocar los elementos finales en YouTube Studio.

**Revisión y exportación**
- [ ] Mira el vídeo entero con un niño, si puedes: si algo le aburre o no lo entiende, acorta esa parte.
- [ ] Comprueba que Pompón tiene el mismo aspecto en todas las escenas.
- [ ] **Exportar:** 1080p, 30 fps. Guarda en Fotos y comprueba el archivo antes de subirlo.

## 11. Revisión de calidad

- **Coherencia:** cada problema se presenta igual (cartel «PROBLEMA N» → explicación → solución que imaginan los científicos → enlace al siguiente). El hilo de las zanahorias y la madriguera da continuidad y humor.
- **Ritmo:** con 13 escenas de entre 50 y 95 s, cambia de imagen cada 10–15 s y añade un movimiento de Pompón al menos cada 30 s. La escena 7 (radiación) es la más abstracta: es la que más ayuda visual necesita (burbuja, chispitas).
- **Duración:** unos 14 min 45 s de narración estimada más la pantalla final ≈ 15 min. Con una voz más rápida puede quedarse en 13–14 min.
- **Lenguaje infantil:** las explicaciones son simples sin dejar de ser correctas. Comparaciones usadas: el abrazo invisible (presión), la manta (atmósfera), la burbuja (campo magnético), el tiovivo (órbitas), la harina (polvo). Se evitan detalles médicos que puedan asustar.
- **Datos a verificar (todos marcados en la sección 4):**
  - Distancia y duración del viaje, ventanas de lanzamiento cada ~26 meses.
  - Tamaño, día, año, color y Monte Olimpo.
  - Presión y composición del aire.
  - Temperaturas.
  - Campo magnético y radiación.
  - Tormentas de polvo, Opportunity y percloratos.
  - Gravedad (38 %) y efectos en el cuerpo.
  - Hielo de agua y cultivos.
  - Curiosity, Perseverance y MOXIE, y que ningún ser humano haya ido a Marte.

  Fuentes recomendadas: páginas de divulgación de agencias espaciales (NASA, ESA), museos de ciencia o planetarios. **No he consultado ni enlazado fuentes concretas**: añádelas tú tras comprobarlas, y actualiza lo que haya cambiado (por ejemplo, el estado de los rovers).
- **Derechos de autor / políticas:**
  - El estilo 2D plano es genérico, pero no copies personajes, escenas ni composiciones concretas de otros canales, y no menciones canales ni estudios en los prompts.
  - Dibuja rovers genéricos y no uses logotipos de agencias espaciales.
  - Música y efectos solo con licencia, con los créditos en la descripción.
  - Marca el vídeo como **contenido para niños**.

## 12. Versión para YouTube Shorts

**Sí tiene sentido**: un Short con una pregunta corta atrae a gente hacia el vídeo largo. El guion completo está en **`short.md`** («¿Puede Pompón quitarse el casco en Marte?», unos 45 s, formato 9:16).
