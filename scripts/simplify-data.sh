#!/usr/bin/env bash
# Gera as versões simplificadas dos mapas do Brasil usadas pelo globo.
#
# Os originais ficam em data/source/ (detalhe total, não vão para o navegador).
# A saída vai para public/data/ em TopoJSON, que guarda cada divisa uma vez só.
#
# A simplificação é feita sobre a topologia: divisas compartilhadas entre
# dois polígonos são simplificadas uma única vez, então não abrem frestas.
#
# Tolerância = desvio máximo (em metros) em relação à linha original. Foi
# escolhida para ficar abaixo de meio pixel no zoom que o clique aplica:
#   estados: 500 m  (zoom no menor estado, Sergipe: ~1 km por pixel)
#   regiões: 1000 m (zoom na menor região, Sudeste: ~2,7 km por pixel)
set -euo pipefail

SRC="data/source"
OUT="public/data"

simplify() {
  local input="$1" tolerance="$2" fields="$3"
  npx mapshaper "$SRC/$input" \
    -simplify dp interval="$tolerance" keep-shapes \
    -filter-fields "$fields" \
    -o "$OUT/$input" format=topojson quantization=100000 force
}

simplify brazil_states.json "${STATES_TOLERANCE:-500}" "id,name,sigla,codigo_ibg,regiao_id"
simplify brazil_regions.json "${REGIONS_TOLERANCE:-1000}" "CD_REGIA,NM_REGIA,SIGLA_RG,AREA_KM2"
