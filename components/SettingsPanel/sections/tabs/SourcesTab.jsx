export default function SourcesTab() {
  return (
    <>
      <h2>Fontes de Dados</h2>

      <p>
        Este projeto utiliza dados públicos provenientes de instituições
        oficiais e bases de dados abertas. O objetivo é garantir
        transparência, confiabilidade e acessibilidade das informações
        apresentadas na plataforma.
      </p>

      <h3>Instituições</h3>

      <ul>
        <li>
          IBGE – Instituto Brasileiro de Geografia e Estatística
        </li>

        <li>
          TSE – Tribunal Superior Eleitoral
        </li>

        <li>
          Dados públicos governamentais e bases abertas
        </li>
      </ul>

      <h3>Tipos de Dados Utilizados</h3>

      <ul>
        <li>Divisões territoriais do Brasil</li>
        <li>Informações demográficas</li>
        <li>Indicadores socioeconômicos</li>
        <li>Resultados eleitorais</li>
        <li>Dados históricos</li>
      </ul>

      <h3>Formatos de Dados</h3>

      <ul>
        <li>GeoJSON</li>
        <li>TopoJSON</li>
        <li>APIs públicas</li>
      </ul>

      <p>
        Os dados geográficos utilizados no projeto são baseados
        principalmente nas malhas territoriais disponibilizadas pelo
        IBGE e podem ser atualizados conforme novas versões forem
        publicadas.
      </p>
    </>
  );
}