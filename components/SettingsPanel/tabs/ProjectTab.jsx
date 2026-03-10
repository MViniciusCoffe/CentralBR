export default function ProjectsTab() {
  return (
    <>
      <h2>Sobre o Projeto</h2>

      <p>
        Este projeto é uma plataforma interativa para visualização de dados
        geográficos, políticos e socioeconômicos do Brasil. A aplicação utiliza
        um globo 3D como interface principal, permitindo explorar o território
        brasileiro em diferentes níveis administrativos, como país, regiões,
        estados e municípios.
      </p>

      <p>
        O objetivo é transformar dados públicos em uma experiência visual
        intuitiva, permitindo ao usuário compreender melhor a distribuição de
        informações ao longo do território nacional. Entre os dados que podem
        ser explorados estão indicadores econômicos, informações demográficas,
        resultados eleitorais e dados históricos ao longo do tempo.
      </p>

      <p>
        O projeto também pretende incluir uma linha do tempo interativa,
        permitindo acompanhar a evolução de diferentes indicadores ao longo das
        décadas, além de visualizar mudanças políticas e econômicas no Brasil.
      </p>

      <h3>Tecnologias Utilizadas</h3>

      <ul>
        <li>React / Next.js — estrutura da aplicação e interface</li>
        <li>Three.js / React Three Fiber — renderização do globo 3D</li>
        <li>GeoJSON e TopoJSON — representação dos dados geográficos</li>
        <li>D3.js — manipulação e conversão de dados geoespaciais</li>
        <li>JavaScript (ES6+) — lógica da aplicação</li>
        <li>CSS Modules — estilização dos componentes</li>
      </ul>

      <p>
        Os dados geográficos utilizados são provenientes de bases públicas,
        principalmente do IBGE, e poderão ser complementados por outras fontes
        oficiais ao longo do desenvolvimento do projeto.
      </p>

      <p>
        Repositório:{" "}
        <a href="https://github.com/MViniciusCoffe/CentralBR">
          https://github.com/MViniciusCoffe/CentralBR
        </a>
      </p>
    </>
  );
}
