# Recuperação de senha

**Requisitos funcionais**
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não funcionais**
- Utilizar Mailtrap para testar em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job com filas);

**Regras de negócio**
- O link enviado por email para rester senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a senha;

# Atualização do perfil

**Requisitos funcionais**
- O usuário deve poder atualizar seu nome, email e senha;

**Regras de negócio**
- O usuário não pode atualizar seu email por um email já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário deve confirma-la;

# Painel do prestador

**Requisitos funcionais**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos não funcionais**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- as notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real usando socket.io;

**Regras de negócio**
- a notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**Requisitos funcionais**
- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos não funcionais**
- A listagem de prestadores deve ser armazenada em cache;

**Regras de negócio**
- Cada agendamento deve durar uma hora;
- Os agendamentos devem estar disponíveis entre 8h e 18h (primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário passado;
- O usuário não pode agendar serviços consigo mesmo;

docker container run --name gobarber_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker container run --name gobarber_mongo -p 27017:27017 -d -t mongo
