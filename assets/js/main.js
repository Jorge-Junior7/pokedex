// Selecionando elementos do DOM
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

// Definindo variáveis para controle de paginação
const maxRecords = 11;  // Número máximo de registros
const limit = 5;  // Número de registros a serem carregados por vez
let offset = 0; // Valor inicial do deslocamento (offset)

// Função para carregar itens de Pokémon com base no deslocamento e limite
function loadPokemonItens(offset, limit) {
  // Chamada à API pokeApi para obter os Pokémons com base no deslocamento e limite
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // Mapeando os Pokémons retornados para criar o HTML correspondente
    const newHtml = pokemons.map((pokemon) => `
          <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
            </div>
          </li>
      `).join('')
       // Adicionando o HTML gerado à lista de Pokémons no DOM
    pokemonList.innerHTML += newHtml
  })
}

// Carregando os primeiros itens de Pokémon
loadPokemonItens(offset, limit)

// Adicionando um evento de clique para o botão "Carregar Mais"
loadMoreButton.addEventListener('click', () => {
  offset += limit; // Incrementando o deslocamento com base no limite

  const qtdRecordNexPage = offset + limit; // Calculando a quantidade de registros na próxima página

  // Verificando se a próxima página excede o número máximo de registros
  if (qtdRecordNexPage >= maxRecords) {
    const newLimit = maxRecords- offset; // Definindo um novo limite para evitar ultrapassar o número máximo de registros
    loadPokemonItens(offset, newLimit);  // Carregando os Pokémons restantes dentro do novo limite

    loadMoreButton.parentElement.removeChild(loadMoreButton); // Removendo o botão "Carregar Mais" se atingir ou exceder o número máximo de registros
  } else {
    
    loadPokemonItens(offset, limit); // Carregando mais Pokémons dentro do limite estabelecido
  }

})
