export default function ControlsTab() {
  return (
    <>
      <h2>Controles</h2>

      <p>
        O globo pode ser explorado de forma interativa utilizando o mouse ou o
        trackpad. Os controles foram projetados para permitir uma navegação
        intuitiva pelo território brasileiro e suas divisões administrativas.
      </p>

      <h3>Navegação do Globo</h3>

      <ul>
        <li>
          <strong>Clique + arrastar:</strong> rotaciona o globo
        </li>
        <li>
          <strong>Scroll do mouse:</strong> aproxima ou afasta o zoom
        </li>
        <li>
          <strong>Clique em um estado ou região:</strong> centraliza a
          visualização
        </li>
      </ul>

      <h3>Interação com o mapa</h3>

      <ul>
        <li>Passar o mouse sobre uma região destaca o território</li>
        <li>Clicar em uma região aproxima a câmera automaticamente</li>
        <li>
          Os limites administrativos podem variar conforme o nível de
          visualização
        </li>
      </ul>

      <h3>Níveis de Visualização</h3>

      <p>
        O projeto pretende permitir explorar o território brasileiro em
        diferentes escalas geográficas:
      </p>

      <ul>
        <li>País</li>
        <li>Regiões</li>
        <li>Estados</li>
        <li>Municípios (planejado)</li>
      </ul>

      <p>
        Novos controles e camadas de dados serão adicionados conforme o
        desenvolvimento da aplicação.
      </p>
    </>
  );
}
