# Boas-vindas ao repositório do projeto `Restaurant Orders`!

Para realizar o projeto, atente-se a cada passo descrito a seguir, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

# Termos e acordos

Ao iniciar este projeto, você concorda com as diretrizes do Código de Conduta e do Manual da Pessoa Estudante da Trybe.

# Entregáveis

<details>
  <summary><strong>🤷🏽‍♀️ Como entregar</strong></summary><br />

  Para entregar o seu projeto você deverá criar um *Pull Request* neste repositório.

  Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/fc998c60-386e-46bc-83ca-4269beb17e17/section/fe827a71-3222-4b4d-a66f-ed98e09961af/day/1a530297-e176-4c79-8ed9-291ae2950540/lesson/2281eade-e2de-436e-a783-6b4108d188cc) e nosso [Blog - Git & GitHub](https://blog.betrybe.com/tecnologia/git-e-github/) sempre que precisar!
</details>

<details>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary>
    <p>O Restaurante  🍝 🦐 Chapa Quente 🍛 🥘 precisa de você para finalizar sua ferramenta de construção de cardápios. O restaurante necessita desta ferramenta para que possa, de maneira simples, gerar seus cardápios considerando possíveis restrições alimentares e também a disponibilidade dos ingredientes em estoque. Hoje, a gestão das receitas e de estoque do restaurante acontece de forma muito ineficiente através de arquivos csv e, por essa razão, as pessoas fundadoras do estabelecimento desejam melhorar esta gestão.</p>
    <p>Um primeiro time iniciou o desenvolvimento deste projeto e já preparou uma estrutura inicial para que você possa finalizar essa construção. Assim, ao longo deste projeto você será responsável por construir testes para classes já implementadas, implementará uma nova classe para mapear os pratos e suas respectivas receitas (ingredientes e quantidades), também implementará uma classe que gerará os cardápios que devem ser mostrados para as pessoas que frequentam o estabelecimento e outra que fará a gestão de estoque dos ingredientes.</p>
    <p>Lembre-se de construir um <em>código limpo, com boa manutenção e legibilidade</em>. </p>

🚵 Habilidades exercitadas: </br>
  - Praticar o conceito de `Hashmaps` através das estruturas de dados `Dict` e `Set`do Python; </br>
  - Praticar a ferramenta `Pandas` junto a sua estrutura de dados `DataFrame`; </br>
  - Praticar os conhecimentos de testes de software; </br>
  - Praticar os conhecimentos de orientação a objetos. </br>

</details>

<details>
  <summary><strong>🗓 Data de Entrega</strong></summary><br />
  
  * Este projeto é `individual`;
  * Serão `2` dias de projeto;
  * Data para entrega no prazo regular: `24/04/2023 14:00`.

</details>

# Orientações
<details>
  <summary><strong>⚠️ Antes de começar a desenvolver</strong></summary><br />

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:tryber/sd-022-b-restaurant-orders.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-022-b-restaurant-orders`

  2. Crie o ambiente virtual para o projeto

  - `python3 -m venv .venv && source .venv/bin/activate`

  3. Instale as dependências

  - `python3 -m pip install -r dev-requirements.txt`
  
  4. Crie uma branch a partir da branch `main`

  - Verifique que você está na branch `main`
    - Exemplo: `git branch`
  - Se não estiver, mude para a branch `main`
    - Exemplo: `git checkout main`
  - Crie uma branch à qual você vai submeter os `commits` do seu projeto
    - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    - Exemplo: `git checkout -b joaozinho-sd-022-b-restaurant-orders`

  5. Adicione as mudanças ao _stage_ do Git e faça um `commit`

  - Verifique que as mudanças ainda não estão no _stage_
    - Exemplo: `git status` (deve aparecer listada a pasta _joaozinho_ em vermelho)
  - Adicione o novo arquivo ao _stage_ do Git
    - Exemplo:
      - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
      - `git status` (deve aparecer listado o arquivo _joaozinho/README.md_ em verde)
  - Faça o `commit` inicial
    - Exemplo:
      - `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
      - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

  6. Adicione a sua branch com o novo `commit` ao repositório remoto

  - Usando o exemplo anterior: `git push -u origin joaozinho-sd-022-b-restaurant-orders`

  7. Crie um novo `Pull Request` _(PR)_

  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-022-b-restaurant-orders/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Coloque um título para a sua _Pull Request_
    - Exemplo: _"Cria tela de busca"_
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - **Não se preocupe em preencher mais nada por enquanto!**
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-022-b-restaurant-orders/pulls) e confira que o seu _Pull Request_ está criado

</details>

<details>
  <summary><strong>⌨️ Durante o desenvolvimento</strong></summary><br />

  - Faça `commits` das alterações que você fizer no código regularmente

  - Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

  - Os comandos que você utilizará com mais frequência são:
    1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
    2. `git add` _(para adicionar arquivos ao stage do Git)_
    3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
    4. `git push -u origin nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
    5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

</details>

<details>
  <summary><strong>🧱 Estrutura do Projeto</strong></summary><br />

  No diretório `src/` você vai encontrar os principais arquivos do projeto, alguns deles já se encontram implementados e outros irão requerer que você os implemente. 

  No diretório `data/` você vai encontrar os arquivos csv que eram utilizados pelas pessoas fundadoras do restaurante para a gestão antiga, eles serão muito importantes para o seu desenvolvimento.

  Este repositório já contém um _template_ com a estrutura de diretórios e arquivos, tanto de código quanto de teste criados. Veja abaixo:

  ```tree
.
├── data
│   ├──🔸 inventory_base_data.csv
│   └──🔸 menu_base_data.csv
├── src
│   ├──🔸 __init__.py
│   ├──🔸 app.py
│   ├── models
│   │   ├──🔸 __init__.py
│   │   ├──🔸 dish.py
│   │   └──🔸 ingredient.py
│   └── services
│       ├──🔸 __init__.py
│       ├──🔹 inventory_control.py
│       ├──🔹 menu_builder.py
│       └──🔹 menu_data.py
├── tests
│   ├──🔸 __init__.py
│   ├──🔸 conftest.py
│   ├── dish
│   │   ├──🔸 __init__.py
│   │   ├──🔸 conftest.py
│   │   ├──🔸 mocks.py
│   │   └──🔹 test_dish.py
│   ├── ingredient
│   │   ├──🔸 __init__.py
│   │   ├──🔸 conftest.py
│   │   ├──🔸 mocks.py
│   │   └──🔹 test_ingredient.py
│   ├──🔸 ingredients.py
│   ├── mocks
│   │   ├──🔸 inventory_base_data.csv
│   │   ├──🔸 inventory_base_data_2.csv
│   │   └──🔸 menu_base_data.csv
│   ├──🔸 test_app.py
│   ├──🔸 test_inventory_control.py
│   ├──🔸 test_menu_builder.py
│   └──🔸 test_menu_data.py
├──🔸 README.md
├──🔸 dev-requirements.txt
├──🔸 pyproject.toml
├──🔸 requirements.txt
├──🔸 setup.cfg
├──🔸 setup.py
├──🔸 trybe-filter-repo.sh
└──🔸 trybe.yml

Legenda:
  🔸 Arquivos que não podem ser alterados.
  🔹 Arquivos a serem alterados para realizar os requisitos.
```

  Na estrutura deste _template_, você deve implementar as classes e métodos necessários. Novos arquivos e funções podem ser criados conforme a necessidade da sua implementação, porém não remova arquivos já existentes.
</details>

<details>
  <summary><strong>🎛 Linter</strong></summary><br />

  Para garantir a qualidade do código, vamos utilizar neste projeto o linter `Flake8`.
  Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível
  e de fácil manutenção! Para rodá-lo localmente no projeto, execute o comandos abaixo:

  ```bash
  python3 -m flake8
  ```

  ⚠️ **PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO!** ⚠️
</details>

<details>
  <summary><strong>🏕️ Ambiente Virtual</strong></summary><br />
  O Python oferece um recurso chamado de ambiente virtual que permite sua máquina rodar, sem conflitos, diferentes tipos de projetos com diferentes versões de bibliotecas.

  1. **criar o ambiente virtual**

  ```bash
  $ python3 -m venv .venv
  ```

  2. **ativar o ambiente virtual**

  ```bash
  $ source .venv/bin/activate
  ```

  3. **instalar as dependências no ambiente virtual**

  ```bash
  $ python3 -m pip install -r dev-requirements.txt
  ```

  Com o seu ambiente virtual ativo, as dependências serão instaladas neste ambiente.
  :eyes: Caso precise desativar o ambiente virtual, execute o comando "deactivate". 
  :warning: Lembre-se de ativar novamente o ambiente virtual quando voltar a trabalhar no projeto.

  O arquivo `dev-requirements.txt` contém todas as dependências que serão utilizadas no projeto, ele está agindo como se fosse um `package.json` de um projeto `Node.js`.
</details>

<details>
  <summary><strong>🛠 Testes</strong></summary><br />

  Para executar os testes certifique-se de que você está com o ambiente virtual ativado.

  <strong>Executar os testes</strong>

  ```bash
  $ python3 -m pytest
  ```

  O arquivo `pyproject.toml` já configura corretamente o pytest. Entretanto, caso você tenha problemas com isso e queira explicitamente uma saída completa, o comando é:

  ```bash
  python3 -m pytest -s -vv
  ```

  Caso precise executar apenas um arquivo de testes basta executar o comando:

  ```bash
  python3 -m pytest tests/nomedoarquivo.py
  ```

  Caso precise executar apenas uma função de testes basta executar o comando:

  ```bash
  python3 -m pytest -k nome_da_func_de_tests
  ```

  Se desejar rodar os testes de um arquivo específico, execute com `-x nome_do_arquivo`

  ```bash
  pytest -x tests/test_jobs.py
  ```
  
  Para executar um teste específico de um arquivo, basta executar o comando:

  ```bash
  pytest -x tests/nomedoarquivo.py::test_nome_do_teste
  ```

  Se quiser saber mais sobre a instalação de dependências com `pip`, veja esse [artigo](https://medium.com/python-pandemonium/better-python-dependency-and-package-management-b5d8ea29dff1).
</details>

<details>
  <summary><strong>🤝 Depois de terminar o desenvolvimento (opcional)</strong></summary><br />

  Para sinalizar que o seu projeto está pronto para o _"Code Review"_, faça o seguinte:

  - Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas:

    - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**;

    - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**;

    - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-022-b`.

  Caso tenha alguma dúvida, veja o [video explicativo](https://vimeo.com/362189205).

</details>

<details>
  <summary><strong>🕵🏿 Revisando um pull request</strong></summary><br />

  Use o conteúdo sobre [Code Review](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/f04cdb21-382e-4588-8950-3b1a29afd2dd/section/b3af2f05-08e5-4b4a-9667-6f5f729c351d/lesson/36268865-fc46-40c7-92bf-cbded9af9006/) para te ajudar a revisar os _Pull Requests_.
</details>

<details>
  <summary><strong>🗣 Nos dê feedbacks sobre o projeto!</strong></summary><br />

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário. 
**Leva menos de 3 minutos!**

[FORMULÁRIO DE AVALIAÇÃO DE PROJETO](https://be-trybe.typeform.com/to/ZTeR4IbH#cohort_hidden=CH22-B&template=betrybe/sd-0x-restaurant-orders)

</details>

<details>
  <summary><strong>🗂 Compartilhe seu portfólio!</strong></summary><br />

  Agora que você finalizou os requisitos, chegou a hora de mostrar ao mundo que você aprendeu algo novo! 🚀

  Siga esse [**guia que preparamos com carinho**](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/a3cac6d2-5060-445d-81f4-ea33451d8ea4/section/d4f5e97a-ca66-4e28-945d-9dd5c4282085/day/eff12025-1627-42c6-953d-238e9222c8ff/lesson/49cb103b-9e08-4ad5-af17-d423a624285a) para disponibilizar o projeto finalizado no seu GitHub pessoal.

  Esse passo é super importante para ganhar mais visibilidade no mercado de trabalho, mas também é útil para manter um back-up do seu trabalho.

  E você sabia que o LinkedIn é a principal rede social profissional e compartilhar o seu aprendizado lá é muito importante para quem deseja construir uma carreira de sucesso? Compartilhe esse projeto no seu LinkedIn, marque o perfil da Trybe (@trybe) e mostre para a sua rede toda a sua evolução.

</details>

# Requisitos obrigatórios

## 1 - Testando classes já implementadas parte 1

> Implemente testes para a classe `Ingredient`, que se encontra no módulo `src/models/ingredient.py`.

Antes de você começar a trabalhar neste projeto, uma equipe contratada pelo Restaurante  🍝 🦐 Chapa Quente 🍛 🥘  fez a implementação de algumas das classes que serão usadas ao longo do seu desenvolvimento, contudo, a equipe não implementou os testes para estas mesmas classes e cabe a você implementá-los.

A primeira das classes implementadas é a `Ingredient` que representa os ingredientes, um objeto desta classe contém o nome e restrições alimentares do ingrediente como atributos.

A classe já possui alguns métodos mágicos já implementados que garantem funcionalidades específicas. Os métodos já implementados são: `__repr__`, `__eq__` e `__hash__`.

### Implementação

Escreva os testes para a classe `Ingredient` no arquivo `tests/ingredient/test_ingredient.py`. Seus testes devem garantir que:

- a classe pode ser instanciada corretamente de acordo com a assinatura esperada;
- o atributo conjunto `restrictions` é populado como esperado;
- o método mágico `__repr__` funcione como esperado;
- o método mágico `__eq__` funcione como esperado;
- o método mágico `__hash__` funcione como esperado.

</br>
<details>
  <summary>
    <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
  </summary>

- 1.1 - Será validado que seu teste falha caso a classe retorne hashes diferentes para dois ingredientes iguais;

- 1.2 - Será validado que seu teste falha caso a classe retorne hashes iguais para dois ingredientes diferentes;

- 1.3 - Será validado que seu teste falha caso a comparação de igualdade de dois ingredientes iguais (ou de um ingrediente com ele mesmo) seja falsa;

- 1.4 - Será validado que seu teste falha caso a comparação de igualdade de dois ingredientes diferentes seja verdadeira;

- 1.5 - Será validado que seu teste falha caso a implementação do método `__repr__` retorne um valor inadequado.

- 1.6 - Será validado que seu teste falha caso o atributo `name` de um ingrediente seja diferente que o passado ao construtor.

- 1.7 - Será validado que seu teste falha caso o atributo `restrictions` de um ingrediente não contenha os valores corretos para o alimento passado.

- 1.8 - Será validado que seu teste passa com a implementação correta da classe `Ingredient`.

</details>
</br>

<details>
  <summary>
    <b>📌Como seu teste é avaliado</b>
  </summary>

  <br>

  O <strong>teste da Trybe</strong> irá avaliar se o <strong>seu teste</strong> está passando conforme o objetivo proposto, além disso, confirmará que seu teste falha em alguns casos em que deveria falhar.

  Para estes testes, em que esperemos a falha, o requisito será aprovado quando a resposta do Pytest for <code>XFAIL(Expected Fail)</code>, ao invés de <code>PASSED</code>.

</details>
</br>

## 2 - Testando classes já implementadas parte 2

> Implemente testes para a classe `Dish`, que se encontra no módulo `src/models/dish.py`.

A outra classe a ser testada é a `Dish`, que representa um prato do cardápio. Uma instância desta classe possui atributos representando o nome, o preço e a receita do prato.

Tal como a classe `Ingredient`, a classe `Dish` já possui alguns métodos já implementados: `add_ingredient_dependency`, `get_restrictions`, `get_ingredients`, `__repr__`, `__eq__` e `__hash__`.

### Implementação

Escreva os testes para a classe `Dish` no arquivo `tests/dish/test_dish.py`. Seus testes devem garantir que:

- a classe pode ser instanciada corretamente de acordo com a assinatura esperada;
- os métodos da classe, inclusive os métodos mágicos, funcionem como esperado;
- o dicionário de receita do prato devolve a quantidade correta de um ingrediente;
- são levantados erros ao criar pratos inválidos;

</br>
<details>
  <summary>
    <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
  </summary>

- 2.1 - Será validado que seu teste falha caso o atributo `name` de um prato seja diferente que o passado ao construtor.

- 2.2 - Será validado que seu teste falha caso os hashes de dois pratos iguais sejam diferentes;

- 2.3 - Será validado que seu teste falha caso os hashes de dois pratos diferentes sejam iguais;

- 2.4 - Será validado que seu teste falha caso a comparação de igualdade de dois pratos iguais (ou de um prato com ele mesmo) seja falsa;

- 2.5 - Será validado que seu teste falha caso a comparação de igualdade de dois pratos diferentes seja verdadeira;

- 2.6 - Será validado que seu teste falha caso a implementação do método `__repr__` retorne um valor inadequado;

- 2.7 - Será validado que seu teste falha caso um `TypeError` não seja levantado ao criar um prato com um valor de tipo inválido;

- 2.8 - Será validado que seu teste falha caso um `ValueError` não seja levantado ao criar um prato com um valor inválido;

- 2.9 - Será validado que seu teste falha caso o acesso a um valor do atributo `recipe`, ao ser indexado com um ingrediente válido retorne uma quantidade inválida (dica: use o método `get` do dicionário, por exemplo `dish.recipe.get(ingredient)`);

- 2.10 - Será validado que seu teste falha caso o método `get_restrictions` retorne um set de restrições diferente do esperado;

- 2.11 - Será validado que seu teste falha caso o método `get_ingredients` retorne um set de ingredientes diferente do esperado;

- 2.12 - Será validado que seu teste passa com a implementação correta da classe `Dish`.

</details>
</br>

<details>
  <summary>
    <b>📌Como seu teste é avaliado</b>
  </summary>

  <br>

  O <strong>teste da Trybe</strong> irá avaliar se o <strong>seu teste</strong> está passando conforme o objetivo proposto, além disso, confirmará que seu teste falha em alguns casos em que deveria falhar.

  Para estes testes, em que esperemos a falha, o requisito será aprovado quando a resposta do Pytest for <code>XFAIL(Expected Fail)</code>, ao invés de <code>PASSED</code>.

</details>
</br>

## 3 - Mapeamento Pratos <> Ingredientes

> Implemente a classe `MenuData` que fará todo o mapeamento de pratos e ingredientes baseado nos arquivo csv disponibilizado. Ela se encontra no módulo `src/services/menu_data.py`.

Hoje, a gestão de pratos e receitas do Restaurante  🍝 🦐 Chapa Quente 🍛 🥘 é feita por meio de um arquivo csv. Em cada linha deste arquivo há o nome do prato, seu preço no cardápio, um dos ingredientes que o compõe e a quantidade necessária daquele ingrediente na receita. Essa organização faz com que um único prato seja representado por múltiplas linhas no mesmo arquivo.

Sua tarefa é implementar uma classe que fará a leitura do arquivo csv mencionado e fará o relacionamento do prato do cardápio com sua respectiva receita, isto é, ingrediente e quantidade. Vale lembrar que já existem classes implementadas para os pratos (`Dish`) e os ingredientes (`Ingredient`). Além disso, a classe que você vai implementar precisa conter um atributo `dishes`, que deverá ser um _set_ que liste todos os pratos presentes no arquivo csv.

### Implementação

Implemente a classe `MenuData` no arquivo `src/services/menu_data.py`.  
O teste utiliza o [arquivo de mock `tests/mocks/menu_base_data.csv`](./tests/mocks/menu_base_data.csv).

Ao longo da sua implementação você deve garantir que:

- a classe, ao ser instanciada, recebe o caminho para o arquivo csv no parâmetro `source_path`;

- a classe fará a leitura do arquivo csv e baseado em seu conteúdo fará as devidas instanciações de pratos e ingredientes;

- a classe contenha o atributo `dishes` que deverá ser um _set_ com todos os pratos devidamente instanciados;

- cada um dos pratos contenha sua respectiva receita, isto é, seus ingredientes e quantidades, bem como seu preço.


<details>
  <summary>
    <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
  </summary>

- 3.1 - O tamanho do _set_ `menu_data.dishes` está correto;

- 3.2 - O _set_ `menu_data.dishes` possui os pratos corretos (com base no método de comparação dos pratos `Dish.__eq__`);

- 3.3 - A quantidade de ingredientes diferentes presentes nos pratos em `menu_data.dishes` está correta;

- 3.4 - A quantidade de cada ingrediente de cada prato presente em `menu_data.dishes` está correta.

</details>

---

## 4 - Geração dos cardápios

Atualmente o cardápio do Restaurante 🍝 🦐 Chapa Quente 🍛 🥘 tem estrutura fixa e, apesar disso não ser um problema, as pessoas fundadoras do estabelecimento desejavam que este cardápio fosse dinâmico, isso porque muitas das pessoas que frequentam o restaurante possuem restrições alimentares, e seria ideal mostrar-lhes o cardápio contendo apenas os pratos que possam comer.

Com este objetivo, a equipe que trabalhou no projeto antes de você começou a implementação de uma classe que interagisse ao mesmo tempo com o cardápio e com o estoque, e que ainda pudesse exibir os pratos do cardápio de acordo com uma determinada restrição alimentar. Sua tarefa neste requisito é fazer a implementação do método que mostrará os cardápios evitando os pratos com determinada restrição alimentar.

### Implementação

Você deve implementar o método `get_main_menu` dentro da classe `MenuBuilder` que se encontra no arquivo `src/services/menu_builder.py`. O método tem como parâmetro opcional uma restrição que deve ser levada em conta na hora de gerar o cardápio.

Seguindo a assinatura do método que foi deixada pela equipe anterior, o retorno deste método deve ser do tipo `DataFrame` original do pacote `pandas`. Assim, é necessário que o método retorne um `DataFrame` que contenham as colunas `dish_name`, `ingredients`, `price` e `restrictions` que se referem, respectivamente, ao **nome** do prato, **ingredientes** que o compõem, seu **preço** no cardápio e **restrições** daquele mesmo prato.

Ao longo de sua implementação você deve garantir que:

- a classe possa ser instanciada corretamente;

- o método `get_main_menu` retorna um `DataFrame` com o cardápio completo quando não é passado nenhum parâmetro;

- o método `get_main_menu` retorna um `DataFrame` com os cardápios corretos respeitando a restrição alimentar passada como parâmetro;

<br>
<details>
  <summary>
    <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
  </summary>

- 4.1 - O método `get_main_menu` retorna uma instância de `pandas.DataFrame`;

- 4.2 - O `DataFrame` retornado possui as chaves `dish_name`, `ingredients`, `price` e `restrictions`;

- 4.3 - O `DataFrame` retornado possui todos os pratos do arquivo do banco de dados quando o método for chamado sem especificar uma restrição;

- 4.4 - O `DataFrame` retornado possui os pratos corretos quando chamado com uma restrição específica;

- 4.5 - O `DataFrame` retornado não possui pratos incorretos quando chamado com uma restrição específica.

</details>
<br>


# Requisitos bônus:

## 5 - Estoque de ingredientes

A gestão de estoque do Restaurante 🍝 🦐 Chapa Quente 🍛 🥘 também é feita por meio de um arquivo csv. Para o controle de estoque é usado um arquivo em que cada uma das linhas contém um ingrediente e sua respectiva quantidade inicial no estoque. Seu objetivo neste requisito é finalizar o desenvolvimento da classe que fará o controle do estoque de ingredientes.

Assim como no requisito anterior, o time que trabalhou antes de você no projeto já iniciou a implementação da classe e cabe a você finalizar esta implementação. Você deve implementar dois métodos para a classe: `check_recipe_availability` e `consume_recipe`.

O primeiro dos métodos (`check_recipe_availability`) deve checar se a receita passada como parâmetro está ou não disponível para consumo, para isso, deve retornar `True` caso o prato esteja disponível para consumo e `False` caso contrário.

O segundo método (`consume_recipe`) também recebe uma receita como parâmetro, mas deve subtrair a quantidade de ingredientes usados na receita do total disponível em estoque. Vale lembrar que a subtração só deve acontecer caso a receita esteja disponível para consumo, caso contrário, deverá ser levantada uma exceção `ValueError`.

### Implementação

A classe `InventoryMapping` se encontra no arquivo `src/services/inventory_control.py`, nela você deverá implementar os métodos `check_recipe_availability` e `consume_recipe`. Ao longo da sua implementação você deve garantir que:

- A classe possa ser devidamente instanciada;

- o método `check_recipe_availability` retorna `True` caso a receita esteja disponível para consumo e `False` caso contrário;

- o método `consume_recipe` subtrai os ingredientes da receita do total disponível em estoque caso a receita esteja disponível para consumo e levanta uma exceção `ValueError` caso contrário.

<details>
  <summary>
    <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
  </summary>

- 5.1 - Valida o funcionamento do método `check_recipe_availability`;
    - 5.1.1 - O método retorna `True` se a receita pode ser feita usando os ingredientes disponíveis (mas não mais do que o disponível). O teste roda para cada um dos ingredientes do arquivo do banco de dados.
    - 5.1.2 - O método retorna `False` se a receita usa mais de algum ingrediente do que o que está disponível. O teste roda para cada um dos ingredientes do arquivo do banco de dados
- 5.2 - Valida o funcionamento do método `consume_recipe`;
    - 5.2.1 - O método retorna `None` ao consumir uma receita disponível e, não havendo nenhum erro, o inventário é atualizado conforme a receita consumida. O teste roda com várias receitas disponíveis.
    - 5.2.2 - O método levanta um `ValueError` ao tentar consumir uma receita indisponível. O teste roda com várias receitas indisponíveis, incluindo uma que só fica indisponível após uma que estava disponível ser consumida corretamente.

</details>

## 6 - Cardápios baseados no estoque 

Com a implementação que foi feita até o momento, o método gerador de cardápios, `get_main_menu`, considera apenas as restrições alimentares para fazer a geração do cardápio com os pratos que as pessoas podem comer. Isso ainda é um problema, dado que ainda não é feita a verificação se os ingredientes do prato estão disponíveis em estoque.

Sua tarefa neste requisito é complementar a implementação do método `get_main_menu` para considerar a disponibilidade em estoque dos ingredientes do prato além das restrições alimentares. Assim, o Restaurante 🍝 🦐 Chapa Quente 🍛 🥘 possuirá a ferramenta capaz de gerar cardápios dinâmicos considerando restrições alimentares e disponibilidade em estoque.

<br>

### Implementação

Você deve complementar a implementação do método `get_main_menu`, feito no requisito 4. O método agora precisa considerar também a disponibilidade em estoque dos ingredientes dos pratos. Use a classe implementada no requisito anterior, `InventoryMapping`, para ter acesso a informações do estoque.

Ao longo de sua implementação você deve garantir que:

- o método `get_main_menu` retorna um `DataFrame` com o cardápio completo caso não exista restrição e todos os ingredientes estiverem disponíveis;

- o método `get_main_menu` retorna um `DataFrame` com os cardápios corretos respeitando a restrição alimentar passada como parâmetro e também a disponibilidade de ingredientes no estoque;

<br>
<details>
  <summary>
    <b>🤖 Clique aqui para ver o que será verificado pelo avaliador.</b>
  </summary>

- Os testes dos requisitos 4.3 e 4.4 passando são pré-requisitos para o teste do requisito 6 rodar.

- 6 - O método `get_main_menu` retorna um `DataFrame` vazio quando o arquivo do estoque não possui os ingredientes necessários para a confecção dos pratos.

</details>
<br>
