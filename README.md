<div align="center">
  <h1>🐟 Portal Web - Atlântida</h1>

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

O **Portal Web - Atlântida** é uma solução digital concebida para o desafio **VR Code Arena (NEXT FIAP/2026)**. O objetivo é integrar e fornecer informações vitais para a população da mítica cidade de Atlântida, localizada no fundo do oceano. Através do portal, os moradores das diversas cúpulas e módulos subaquáticos têm acesso a dados de pressão, rotas de navegação submarina, relatórios operacionais e canal de comunicação entre os setores habitacionais.

---

## 📂 Estrutura do Projeto

```text
AtlantidaFIAPChallenge/
├── assets/
│   ├── css/
│   │   ├── variables.css          # Cores, tipografia e medidas (tokens)
│   │   ├── style.css              # Estilo principal: hero, menu, Mural, Contato, rodapé
│   │   ├── secoes-comuns.css      # Base das seções O Mundo e Habitantes (papel, foto, foco, link de pular)
│   │   ├── secao-mundo.css        # Seção 02 · O Mundo
│   │   └── secao-habitantes.css   # Seção 03 · Habitantes
│   ├── js/
│   │   ├── atlantida-book-anim.js # Animação do livro interativo (GSAP)
│   │   ├── i18n.js                # Troca de idioma (português ⇄ Atlante)
│   │   ├── main.js                # Menu, Mural e formulário de contato
│   │   ├── idioma-secoes.js       # Troca de idioma das seções 02 e 03 (data-atl)
│   │   ├── dados-mundo-habitantes.js # Conteúdo editável de O Mundo e Habitantes
│   │   ├── chasqui-palavras.js    # Palavras-chave, passos e busca do Chasqui
│   │   ├── secao-mundo.js         # Mapa, indicadores e FAQ
│   │   └── secao-habitantes.js    # Crachás e Chasqui
│   ├── lang/
│   │   └── dicionarios.js         # Textos data-i18n nos dois idiomas
│   └── media/                     # Imagens, ícones e mídias
├── docs/                          # Guia de edição, glossário do Atlante e conferências (node)
├── index.html                     # Página única (HTML5 semântico)
├── LICENSE
└── README.md
```

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
