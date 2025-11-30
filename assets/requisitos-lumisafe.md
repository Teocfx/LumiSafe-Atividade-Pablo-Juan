# Documentação do Sistema Lumisafe

## 📖 Visão Geral

A aplicação Lumisafe tem como objetivo melhorar a segurança nas ruas, oferecendo mais liberdade e voz às comunidades. Sua principal função é fortalecer a comunicação sobre as condições de segurança nos bairros.

Os usuários do aplicativo poderão adicionar marcadores em regiões para indicar a situação da iluminação pública em suas ruas, aumentando a visibilidade dos problemas e criando uma ponte entre a população e as autoridades responsáveis pela correção dessas falhas.

## 🎯 Principais Funcionalidades

- Denúncias com Fotos e Marcadores de região
- Acompanhamento em Tempo Real
- Histórico de Ocorrências
- Mapa Interativo de Incidências

---

## ⚙️ Requisitos Funcionais (RF)

| ID | Descrição |
|----|-----------|
| **RF01** | O sistema deve permitir que o usuário faça cadastro, informando nome completo, e-mail e senha. |
| **RF02** | O sistema deve autenticar usuários por e-mail e senha. |
| **RF03** | O sistema deve permitir a criação de marcadores de pontos de luz no mapa. |
| **RF04** | O sistema deve permitir a visualização e leitura de marcadores. |
| **RF05** | O sistema deve permitir anexar fotos a uma denúncia. |
| **RF06** | O sistema deve permitir selecionar/registrar uma região no mapa para associar à denúncia. |
| **RF07** | O sistema deve classificar cada marcador com um status: 'Bom Funcionamento' ou 'Com Defeito'. |
| **RF08** | O sistema deve permitir que o usuário edite ou remova suas próprias denúncias. |
| **RF09** | O sistema deve permitir que visitantes (não autenticados) visualizem o mapa em modo somente leitura. |
| **RF10** | O sistema deve permitir filtrar a visualização de marcadores por status, data e bairro. |
| **RF11** | O sistema deve permitir buscar marcadores por endereço. |
| **RF12** | O sistema deve permitir capturar e registrar trajetos no mapa utilizando a geolocalização do navegador para o mapeamento de ruas. |
| **RF13** | O sistema deve permitir que o usuário permaneça autenticado em sessões persistentes, mantendo-o conectado sem precisar inserir credenciais a cada acesso. |
| **RF14** | O sistema deve permitir que os dados do usuário sejam sincronizados automaticamente entre dispositivos. |

---

## 🔧 Requisitos Não Funcionais (RNF)

| ID | Categoria | Descrição |
|----|-----------|-----------|
| **RNF01** | Disponibilidade | O sistema deve estar disponível 99,5% do tempo ao mês (exceto manutenção programada). |
| **RNF02** | Performance | O mapa e os marcadores visíveis devem carregar em até 3 segundos em conexão móvel 4G típica. |
| **RNF03** | Segurança | O acesso aos dados dos usuários deve ser restrito e criptografado. |
| **RNF04** | Internacionalização | A aplicação deve estar disponível em português (pt-BR). |
| **RNF05** | Usabilidade | O layout deve ser responsivo e adaptável. |
| **RNF06** | Escalabilidade | O backend deve ser escalável, suportando aumento gradual de usuários e marcadores sem degradação significativa de desempenho. |
| **RNF07** | Usabilidade | A interface deve ser intuitiva, interativa e de fácil navegação, adequada para usuários leigos. |
| **RNF08** | Privacidade | O aplicativo deve solicitar consentimento expresso para coleta de dados de localização (GPS). |
| **RNF09** | Segurança | As fotos enviadas pelos usuários devem ser armazenadas em ambiente seguro, sem acesso público não autorizado. |
| **RNF10** | Compatibilidade | Suportar as últimas 2 versões dos principais navegadores (Chrome, Edge, Firefox, Safari) e navegadores móveis modernos. Funcionalidade básica deve degradar graciosamente em navegadores antigos. |
| **RNF11** | Conformidade | O sistema deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados) - incluindo consentimento, direito de acesso/remoção, e processos para requisições de dados. |

---

## 👤 Histórias de Usuário (HU)

### Autenticação e Cadastro

**HU01**: Como usuário, quero poder me cadastrar no sistema usando dados pessoais, para que eu tenha acesso à conta.

**HU02**: Como usuário cadastrado, quero entrar no app usando e-mail e senha, para acessar minhas denúncias e funcionalidades protegidas.

**HU03**: Como usuário, quero uma opção para permanecer conectado, para não precisar inserir minhas credenciais toda vez.

**HU04**: Como usuário, quero poder sincronizar facilmente os dados em vários dispositivos, para acessar minhas informações de qualquer lugar.

### Denúncias e Marcadores

**HU05**: Como usuário autenticado, quero criar um marcador de ponto de luz no mapa, para denunciar a condição da iluminação em um local específico.

**HU06**: Como usuário autenticado, quero registrar uma região/bairro no mapa para associar à denúncia, para que seja classificada geograficamente.

**HU07**: Como usuário, quero que cada marcador tenha status 'Bom Funcionamento' ou 'Com Defeito', para refletir corretamente a condição da iluminação.

**HU08**: Como usuário autenticado, quero editar ou remover minhas próprias denúncias, para corrigir informações ou remover dados obsoletos.

### Visualização e Busca

**HU09**: Como visitante, quero visualizar o mapa em modo somente leitura, para consultar pontos sem criar conta.

**HU10**: Como usuário ou visitante, quero filtrar a visualização dos marcadores por status, data e bairro, para encontrar rapidamente denúncias relevantes.

**HU11**: Como usuário, quero buscar marcadores por endereço, para encontrar denúncias relacionadas a um local específico.

### Trajetos

**HU12**: Como usuário autenticado, quero registrar trajetos via geolocalização do navegador, para mapear ruas e registrar pontos de luz percorridos.

---

## 📋 Casos de Uso

### UC01 - Cadastro de Usuário

**Ator**: Usuário não autenticado  
**Descrição**: Permitir que um novo usuário crie uma conta informando nome completo, e-mail e senha.

**Fluxo Principal**:
1. Usuário acessa a tela inicial.
2. Preenche os campos obrigatórios (nome, e-mail, senha).
3. Sistema valida o formato do e-mail e da senha.
4. Usuário confirma o cadastro.
5. Sistema cria a conta e envia um e-mail de confirmação.

**Fluxos Alternativos**:
- **E-mail já cadastrado**: o sistema exibe mensagem de erro e oferece a opção de recuperação de senha.

**Pré-condição**: Usuário não possui cadastro prévio.  
**Pós-condição**: Conta criada e e-mail de confirmação enviado.

---

### UC02 - Autenticação (Login)

**Ator**: Usuário cadastrado  
**Descrição**: Permitir que o usuário acesse sua conta utilizando e-mail e senha, com suporte a sessão persistente.

**Fluxo Principal**:
1. Usuário insere e-mail e senha.
2. Sistema valida as credenciais.
3. Sistema cria um token de sessão e redireciona o usuário para o mapa.
4. Usuário pode optar pela opção "Permanecer conectado".

**Fluxos Alternativos**:
- **Credenciais inválidas**: sistema exibe mensagem de erro.
- **Esquecimento de senha**: redireciona para o fluxo de recuperação.

**Pós-condição**: Usuário autenticado e sessão válida.

---

### UC03 - Visualizar Mapa

**Ator**: Visitante ou Usuário autenticado  
**Descrição**: Exibir mapa com marcadores representando os pontos de iluminação e suas condições. Visitantes têm acesso somente de leitura.

**Fluxo Principal**:
1. Usuário acessa a tela do mapa.
2. Sistema carrega os marcadores existentes.
3. Usuário pode clicar em um marcador para visualizar detalhes (status, fotos, data, bairro).

**Fluxos Alternativos**:
- **Conexão lenta**: sistema exibe placeholders até que os dados sejam carregados (tempo máximo desejado: ≤ 3s em rede 4G).

---

### UC04 - Criar Marcador / Fazer Denúncia

**Ator**: Usuário autenticado  
**Descrição**: Permitir que o usuário crie um novo marcador de ponto de luz no mapa, incluindo fotos, status e localização.

**Pré-condição**: Usuário autenticado e com permissão de acesso à localização concedida.

**Fluxo Principal**:
1. Usuário seleciona a opção "Adicionar denúncia".
2. Marca a posição no mapa (manualmente ou via GPS).
3. Informa o status, adiciona fotos e seleciona o bairro/região.
4. Envia a denúncia.
5. Sistema valida os dados e armazena a denúncia.

**Fluxos Alternativos**:
- **Permissão de GPS negada**: o sistema permite marcar o ponto manualmente no mapa.

---

### UC05 - Editar ou Remover Denúncia

**Ator**: Usuário autenticado  
**Descrição**: Permitir que o usuário edite ou remova suas próprias denúncias.

**Fluxo Principal**:
1. Usuário acessa suas denúncias cadastradas.
2. Seleciona a opção "Editar" ou "Remover".
3. Se editar: altera os dados e salva.
4. Se remover: confirma a exclusão.
5. Sistema atualiza ou exclui a denúncia.

**Pré-condição**: Denúncia existente criada pelo usuário.  
**Pós-condição**: Denúncia atualizada ou removida com sucesso.

---

### UC06 - Filtrar e Buscar Marcadores

**Ator**: Usuário autenticado ou Visitante  
**Descrição**: Permitir filtragem e busca de marcadores por status, data, bairro ou endereço.

**Fluxo Principal**:
1. Usuário abre o painel de filtros.
2. Seleciona filtros ou insere um endereço.
3. Sistema aplica os filtros e exibe os resultados correspondentes.

**Fluxos Alternativos**:
- **Nenhum resultado encontrado**: sistema exibe mensagem informativa e sugestões de busca.

---

### UC07 - Registrar Trajetos via GPS

**Ator**: Usuário autenticado  
**Descrição**: Capturar o trajeto percorrido por meio do GPS, registrando automaticamente pontos e gerando um status agregado da via.

**Fluxo Principal**:
1. Usuário ativa o modo "Mapear Rua".
2. Sistema solicita consentimento de localização e inicia a captura GPS.
3. Usuário pode marcar pontos manualmente ou deixar que o sistema detecte automaticamente.
4. Usuário encerra o trajeto.
5. Sistema processa e calcula o status agregado da via percorrida.

**Pré-condição**: Permissão de localização ativa.  
**Pós-condição**: Trajeto registrado e armazenado no sistema.

---

### UC08 - Sincronização entre Dispositivos

**Ator**: Usuário autenticado  
**Descrição**: Manter os dados do usuário atualizados entre diferentes dispositivos, sincronizando automaticamente alterações.

**Fluxo Principal**:
1. Alterações locais geram eventos de sincronização.
2. Sistema envia as alterações ao servidor (backend).
3. Atualizações são propagadas para os demais dispositivos do usuário.

**Fluxos Alternativos**:
- **Usuário offline**: alterações são armazenadas localmente e sincronizadas automaticamente ao reconectar.

**Pós-condição**: Dados atualizados e consistentes entre dispositivos.
