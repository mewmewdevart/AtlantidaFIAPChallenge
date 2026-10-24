<div align="center">
  <h1>🐟 Khipu- Os laços que conectam Guaraci.</h1>

  <p>
    <b>VR Code Arena - NEXT FIAP/2026</b>
  </p>

  <p>
    Um portal que mantém conectada uma cidade inteira no fundo do mar, aproximando seus habitantes entre cúpulas, túneis e estruturas pressurizadas.
  </p>

  <p align="center">
    <a href="https://github.com/mewmewdevart/AtlantidaFIAPChallenge">🔗 Acessar o Projeto</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Desafio-VR%20Code%20Arena-538CFF?style=for-the-badge&logo=fiap&logoColor=white" alt="Desafio VR Code Arena" />
    <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-538CFF?style=for-the-badge&logo=github&logoColor=white" alt="Status Em Desenvolvimento" />
    <img src="https://img.shields.io/badge/Projeto-Acad%C3%AAmico-538CFF?style=for-the-badge&logo=bookstack&logoColor=white" alt="Projeto Acadêmico" />
  </p>
</div>

<br>

## 📌 Resumo do Projeto

O **Portal Khipu - Os laços que conectam Guaraci** é uma solução digital concebida para o desafio **VR Code Arena (NEXT FIAP/2026)**. O objetivo é integrar e fornecer informações vitais para a população da mítica cidade de Guaraci(que seus moradores chamam de Ñandeyaku: nossa água), localizada no fundo do oceano. Através do portal, os moradores das diversas cúpulas e módulos subaquáticos têm acesso a dados de pressão, rotas de navegação submarina, relatórios operacionais e canal de comunicação entre os setores habitacionais.

---

## 📂 Estrutura do Projeto

```text
AtlantidaFIAPChallenge/
├── assets/
│   ├── css/                       # Estilos globais e estilos por seção
│   │   ├── variables.css          # Tokens de cores, tipografia e medidas
│   │   ├── style.css              # Estilos compartilhados e estrutura geral
│   │   ├── secao-hero.css
│   │   ├── secao-mundo.css
│   │   ├── secao-habitantes.css
│   │   ├── secao-mural.css
│   │   ├── secao-contato.css
│   │   ├── rodape.css
│   │   └── radio-comunal.css
│   ├── fonts/                     # Fontes locais
│   ├── js/                        # Comportamentos e conteúdo do site
│   │   ├── secao-hero.js
│   │   ├── idioma-geral.js        # Troca de idioma global
│   │   ├── idioma-conteudo.js     # Tradução de conteúdo das seções
│   │   ├── portal-navegacao.js    # Navegação, Mural e Contato
│   │   ├── dados-secoes.js        # Dados de O Mundo e Habitantes
│   │   ├── chasqui-motor.js       # Busca e recomendações do Chasqui
│   │   ├── secao-mundo.js
│   │   ├── secao-habitantes.js
│   │   ├── radio-comunal.js
│   │   └── tests/                 # Conferências automatizadas com Node.js
│   ├── lang/
│   │   └── dicionarios.js         # Textos da interface em português e Atlante
│   └── media/
│       ├── habitantes/            # Retratos dos habitantes
│       ├── mundo/                 # Mapa e imagens dos lugares
│       ├── favicon_io/            # Ícones e manifesto do site
│       └── ...                    # Ilustrações, cenários e elementos visuais
├── docs/
│   ├── como-editar.md             # Guia para editar conteúdo e estilos
│   └── glossario-atlantida.md     # Vocabulário e regras do Atlante
├── index.html                     # Página principal e conteúdo das seções
├── VR CODE ARENA - Atlantida.pptx # Apresentação do projeto
├── LICENSE
└── README.md
```

### Como o projeto se organiza

- **`index.html`** reúne a estrutura da página e carrega os estilos e scripts na ordem necessária.
- **`assets/css/`** separa os estilos compartilhados dos estilos específicos de cada seção.
- **`assets/js/`** contém a navegação, as interações, a troca de idioma e a renderização das seções; os dados de O Mundo e Habitantes ficam em `dados-secoes.js`.
- **`assets/lang/`** mantém os dicionários dos textos da interface. Textos associados diretamente a elementos da página também podem estar no HTML.
- **`assets/media/`** agrupa imagens e ilustrações por contexto, como habitantes e lugares do mundo.
- **`assets/js/tests/`** contém verificações executáveis com Node.js para traduções e comportamento do Chasqui.
- **`docs/`** reúne instruções de edição e referência do idioma Atlante.

---

## 🛠️ Tecnologias Utilizadas

- **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)** — Estruturação semântica e acessível das páginas.
- **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)** — Estilização moderna utilizando CSS Variables e Flexbox/Grid.
- **[JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** — Interatividade e manipulação do DOM.
- **[Google Fonts](https://fonts.google.com/)** — Tipografia `Outfit` para um visual moderno e futurista.

---

## 🚀 Como Executar Localmente

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/mewmewdevart/AtlantidaFIAPChallenge.git
   ```

2. **Acessar o Diretório do Projeto:**
   ```bash
   cd AtlantidaFIAPChallenge
   ```

3. **Abrir a Aplicação:**
   - Abra o arquivo `index.html` diretamente em seu navegador preferido; **OU**
   - Utilize a extensão **Live Server** no VS Code para simular um servidor local de desenvolvimento (`http://127.0.0.1:5500`).

---

## 🌐 Idiomas e conferências

O site tem dois idiomas: português e **Atlante**, um dialeto inventado de Atlântida (regras e vocabulário em `docs/glossario-atlantida.md`). Guia de edição para a arena: `docs/como-editar.md`. Com Node.js instalado, três comandos conferem o projeto:

```bash
node assets/js/tests/verificar-atlante.js        # O Mundo e Habitantes: tudo tem Atlante?
node assets/js/tests/verificar-idiomas.js        # menu, hero, Mural, Contato, rodapé
node assets/js/tests/testar-chasqui.js           # o Chasqui acerta as frases de exemplo?
node assets/js/tests/verificar-palavras-chave.js # as listas de palavras têm repetição ou palavra comum demais?
```

---

## 👥 Integrantes — Grupo Ctrl + People

* **Ingrid Silva de Lima** — RM 570149 — [rm570149@fiap.com.br](mailto:rm570149@fiap.com.br)
* **Larissa Cristina Benedito** — RM 570970 — [rm570970@fiap.com.br](mailto:rm570970@fiap.com.br)
* **Mayla Mayumi Motobe** — RM 571213 — [rm571213@fiap.com.br](mailto:rm571213@fiap.com.br)

---

## 📚 Referências

- Guia de Boas Práticas da FIAP para desenvolvimento de projetos Web Design.
- [MDN Web Docs](https://developer.mozilla.org/) — Padrões e Referências da Web (W3C).
- [Shields.io](https://shields.io/) — Badges para documentação de projetos.
