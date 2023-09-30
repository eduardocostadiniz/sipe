# Configuração da Elastic Stack para o Projeto Sipe

**Tecnologias Utilizadas da Stack**
>Elasticsearch: Armazenar os dados capturados e fornecer dados para processamento
Kibana: Construção e visualização dos dados através de dashboards
Logstash: Coleta os dados do Elasticsearch para processar e gerar sumários para o Sipe
Filebeat (Beats): Captura os dados dos arquivos de xml gerados dos pedidos e salva no Elasticsearch

**Versões Utilizadas da Stack**
>Elasticsearch 8.9.1
Filebeat 8.10.2
Kibana 8.9.1
Logstash 8.9.1

Após baixar essas versões, descompactar e deixar cada uma das pastas separadas.

### Configurar o Elasticsearch
Entrar no diretório onde o Elasticsearch está e executar o comando:
```sh
./bin/elasticsearch
```

Esse comando serve para iniciar o elasticsearch e fazer as configurações iniciais de segurança e também irá gerar uma saída no terminal, que é a configuração de segurança (se o módulo de segurança estiver ativo no **config/elasticsearch.yml**)
Guarde essa configuração.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Elasticsearch security features have been automatically configured!
✅ Authentication is enabled and cluster connections are encrypted.

ℹ️  Password for the elastic user (reset with `bin/elasticsearch-reset-password -u elastic`):
  Cy*zzPmBFsarn108WwJ=
  `SENHA GERADA ACIMA - GUARDE ELA`

ℹ️  HTTP CA certificate SHA-256 fingerprint:
  aa49466c1b90f858d61e169097edf47327d55c6c46296fe50b63533a5ab17686

ℹ️  Configure Kibana to use this cluster:
• Run Kibana and click the configuration link in the terminal when Kibana starts.
• Copy the following enrollment token and paste it into Kibana in your browser (valid for the next 30 minutes):
  eyJ2ZXIiOiI4LjkuMSIsImFkciI6WyIxNzIuMTguMC4xOjkyMDAiXSwiZmdyIjoiYWE0OTQ2NmMxYjkwZjg1OGQ2MWUxNjkwOTdlZGY0NzMyN2Q1NWM2YzQ2Mjk2ZmU1MGI2MzUzM2E1YWIxNzY4NiIsImtleSI6IlJCT0J3b29CbHVpSGZMeUJvV05zOmFGZk4wcnNIU2NhMk5ON05IckdJOXcifQ==

ℹ️  Configure other nodes to join this cluster:
• On this node:
  ⁃ Create an enrollment token with `bin/elasticsearch-create-enrollment-token -s node`.
  ⁃ Uncomment the transport.host setting at the end of config/elasticsearch.yml.
  ⁃ Restart Elasticsearch.
• On other nodes:
  ⁃ Start Elasticsearch with `bin/elasticsearch --enrollment-token <token>`, using the enrollment token that you generated.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agora, precisamos configurar o elasticsearch para aceitar as requisições do Kibana. Isso é necessário para a segurança básica entre o ElasticSearch e o Kibana através de um token de inscrição.
```sh
bin/elasticsearch-create-enrollment-token -s kibana
```

***O comando irá gerar um token de inscrição que iremos usar no comando abaixo.***

### Configurar o Kibana

Primeiro precisamos entrar na pasta da home do Kibana, depois abrir o arquivo **config/kibana.yml**, identificando o host do Elasticsearch. Abra esse arquivo e modifique a linha `elasticsearch.hosts` com o seu host do elastic:

```yml
elasticsearch.hosts: ["http://localhost:9200"]
```

Salve o arquivo. Agora iremos configurar o Kibana com o token de inscrição gerado acima, para isso execute o comando:

```sh
./bin/kibana-setup --enrollment-token <token de inscrição>
```

Isso irá gerar uma saída de sucesso:

**✔ Kibana configured successfully.**

Agora o arquivo **config/kibana.yml** terá configurações adicionais de certificado, token de acesso e outras informações:

```yml
# This section was automatically generated during setup.
elasticsearch.hosts: ['https://172.18.0.1:9200']
elasticsearch.serviceAccountToken: AkaUVjNm13V1E0Zw
elasticsearch.ssl.certificateAuthorities: [<kibana home>/data/ca_1695481081961.crt]
xpack.fleet.outputs: [{id: fleet-default-output, hosts: ['https://172.18.0.1:9200']}]
```

Agora podemos executar o kibana:
```sh
./bin/kibana
```

Acessar o seu host ou se estiver local: http://localhost:5601

A página de login irá solicitar um usuário e senha. Iremos usar o usuário root para o primeiro acesso:

```properties
usuário: elastic
senha: <senha gerada quando executamos o elasticsearch pela primeira vez>
```

`Obs.: Por questões de segurança é recomendado não usar esse usuário em produção. O ideal é criar outro com acessos específicos.`

### Configurar o Filebeat

O Filebeat faz parte de uma série de Beats disponibilizados pela Elastic, no nosso caso, usaremos apenas o Filebeat para a coleta de dados de arquivos, que são os conteúdos dos XMLs gerados através dos pedidos.
Nesse passo, precisamos entrar na pasta home do Filebeat e fazer algumas configurações, para isso iremos abrir o arquivo **filebeat.yml**:

#### 1 - Configurar os diretórios que pegaremos os dados de arquivo

Em `filebeat.inputs` precisamos adicionar onde estão nossos dados para captura, para isso adicionar a configuração:

```yml
- type: filestream
  id: sipe_orders_xml
  enabled: true
  paths:
    - /home/eduardoc/Projetos/sipe/gerador-xml/xml/*.xml
```

#### 2 - Configurar o Kibana com o Filebeat

Nessa parte precisamos configurar a parte de geração dos Dashboards do Kibana. Para isso precisamos permitir que o Kibana possa ler os dados coletados e gerar esses Dashboards. A configuração é:

```yml
setup.dashboards.enabled: true
```

No nosso cenário, teremos índice customizado, então também precisamos configurar o índice que o Kibana precisa gerar os Dashboards. A configuração é:

```yml
setup.dashboards.index: "sipe_orders_xml"
```

O Kibana trabalho com uma série de templates e também tem um padrão para toda a aplicação. Esse é o que usaremos no momento.
Iremos configurar o uso dos templates e também configurar qual é o template e o padrão do índice que o Kibana deve gerar. A configuração é:

```yml
setup.template.settings:
  index.number_of_shards: 1
setup.template.name: "sipe_orders_xml"
setup.template.pattern: "sipe_orders_xml"
```

#### 3 - Configurar o host do Kibana no Filebeat

Agora que temos toda a configuração dos templates e dashboards, precisamos configurar qual host está autorizado a usar esses dados através do Filebeat. A configuração é:

```yml
setup.kibana:
  host: "localhost:5601"
```

#### 4 - Configurar acesso para enviar dados ao Elasticsearch

Essa é parte de configurar a saída dos dados do Filebeat para o Elasticsearch. As principais configurações são *hosts, usuário, senha, certificado, índice customizado e permissão de versões antigas*. A configuração é:

```yml
output.elasticsearch:
  hosts: ["localhost:9200"]
  #api_key: "id:api_key"
  username: "elastic"
  password: "<senha gerada quando executamos o elasticsearch pela primeira vez>"
  
  # nome customizado do seu índice
  index: "sipe_orders_xml"
  
  # caminho do certificado. Podemos usar o que o elasticsearch disponibiliza, basta adicionar o caminho
  ssl.certificate_authorities: ["<elasticsearch-8.9.1 home>/config/certs/http_ca.crt"]

  # essa propriedade permite o filebeat trabalhar com versões anteriores do elasticsearch
  allow_older_versions: true
```
 
 `OBS.: Nesse cenário de teste, estamos usando usuário e senha para mandar os dados para o Elasticsearch, no entanto é mais seguro gerar uma chave API de acesso ao invés de usar usuário e senha.`
 
 Documentação sobre API Key: https://www.elastic.co/guide/en/beats/filebeat/current/beats-api-keys.html
 
 Agora que já está tudo pronto, podemos executar o Filebeat, para isso salve o arquivo e execute o comando:
 
 ```sh
 ./filebeat -e -c filebeat.yml
 ```
 
