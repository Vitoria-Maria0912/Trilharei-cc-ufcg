#!/bin/bash

RESPONSE=$(curl -s -X POST http://localhost:8080/login/getTokenByUserEmail \
  -H "Content-Type: application/json" \
  -d '{ 
        "email":"vitoria.nascimento@ccc.ufcg.edu.br",
        "password":"@ccc.ufcg.edu.br"
      }')

echo "Resposta da API de login: $RESPONSE"

TOKEN=$(echo "$RESPONSE" | jq -r '.login .token')

# Verifica se o token foi realmente capturado
if [ -z "$TOKEN" ] || [ "$TOKEN" == "null" ]; then
  echo "Erro: token não obtido. Verifique login e senha."
  exit 1
fi

# Caminho para JSON e URL da API
JSON_FILE_OBRIGATORY="./database/Obrigatories_pre_post_req.json"
JSON_FILE_OPTATIVE="./database/Optatives_pre_post_req.json"
URL="http://localhost:8080/protected/disciplines"

# Verifica se o jq está instalado
if ! command -v jq &> /dev/null; then
  echo "jq não está instalado. Instale com: sudo apt install jq"
  exit 1
fi

# Loop para atualizar as disciplinas
jq -c '.[]' "$JSON_FILE_OBRIGATORY" | while read -r disciplina; do
  DISCIPLINA_ID=$(echo "$disciplina" | jq -r '.id')
  echo "Atualizando disciplina ID $DISCIPLINA_ID: $disciplina"
  curl -X PATCH "$URL/$DISCIPLINA_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$disciplina"
  echo -e "\n---"
done

# Loop para atualizar as disciplinas
jq -c '.[]' "$JSON_FILE_OPTATIVE" | while read -r disciplina; do
  DISCIPLINA_ID=$(echo "$disciplina" | jq -r '.id')
  echo "Atualizando disciplina ID $DISCIPLINA_ID: $disciplina"
  curl -X PATCH "$URL/$DISCIPLINA_ID"  \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$disciplina"
  echo -e "\n---"
done
