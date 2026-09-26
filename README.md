# Pulso · Primeiros socorros

<img src="public/favicon.svg" alt="Símbolo do Pulso" width="64" height="64" />

**O primeiro cuidado. Um passo de cada vez.**

[Acessar o Pulso](https://ccm-pulso.vercel.app)

O Pulso é um manual digital de primeiros socorros para pessoas sem treinamento que precisam ajudar alguém nos primeiros minutos de uma emergência. Reúne orientações em português, leitura em voz alta, navegação por voz e representações animadas das ações.

Quem ajuda pode estar nervoso, com pouco tempo e com as mãos ocupadas. Por isso, o projeto apresenta a ação principal em destaque, explica os cuidados em frases curtas e faz perguntas quando a resposta muda a orientação. A ideia é que a pessoa consiga acompanhar o guia sem precisar tocar na tela a cada etapa.

**Em emergência no Brasil: SAMU 192 · Bombeiros 193.** O Pulso é educativo. Não faz diagnóstico nem substitui treinamento prático ou as instruções da central de emergência.

## Para quem foi feito

- Pessoas que presenciam uma emergência em casa, na rua, no trabalho ou na escola.
- Familiares e cuidadores que procuram uma orientação inicial acessível.
- Quem deseja conhecer cuidados básicos antes de precisar deles.

O objetivo é ajudar a reconhecer riscos, pedir socorro e acompanhar uma orientação inicial. Chegar à última etapa não confirma que alguém está fora de perigo.

## Recursos

| Recurso | Como ajuda |
| --- | --- |
| 19 entradas de orientação | Busca por situação e filtros para encontrar o assunto. Algumas entradas compartilham o mesmo fluxo de avaliação inicial. |
| Uma ação por etapa | Instrução principal, detalhes, alertas e opções de acordo com o que a pessoa observa. |
| Mãos livres | Após uma ativação, alterna leitura e escuta; escolhas claras por voz seguem sem confirmação na tela. |
| Leitura completa | Inclui alertas, detalhes e opções; permite repetir e ajustar a velocidade. |
| Representações animadas | Ilustrações esquemáticas de compressões, engasgo, resfriamento, pressão sobre sangramento e outros cuidados. |
| Ritmo de compressões | Recurso sonoro opcional de 110 batidas por minuto nas etapas indicadas. |
| Acesso ao socorro | Links de ligação para 192 e 193. Nenhuma chamada é feita automaticamente. |
| Acessibilidade | Texto ampliável, navegação por teclado, foco visível e respeito à preferência de movimento reduzido. |

Os assuntos incluem pessoa que não responde, respiração anormal, parada cardíaca, engasgo, sangramento, queimadura, convulsão, desmaio, choque elétrico, acidentes, suspeita de fratura, bebês e crianças, sinais de AVC, reação alérgica, dor no peito, incêndio, afogamento e intoxicação. Há também uma área de proteção e encaminhamento veterinário para animais.

## Como funciona a voz

1. Abra uma orientação e toque em **Ativar mãos livres**. O navegador pode pedir acesso ao microfone.
2. Ouça a etapa. Durante a leitura, o microfone fica interrompido para não reconhecer a própria fala do site.
3. Depois da leitura, responda por voz. Em uma pergunta, diga **“opção um”**, **“opção dois”** e assim por diante.
4. Use **“repetir”**, **“próximo passo”**, **“voltar”**, **“não consigo”** ou **“ajuda”** quando precisar. **“Pausar voz”** encerra o modo mãos livres.

“Próximo passo” não pula uma pergunta que exige observar a pessoa. Falas incertas não escolhem uma resposta. O guia não avança pelo tempo decorrido: aguarda um comando ou um toque. Ao sair da aba, o modo mãos livres pausa.

Também é possível apenas ouvir, usar o teclado ou tocar nas opções. Em **Ajustes de voz**, ficam a velocidade, a leitura automática e a escuta de um comando por vez.

O reconhecimento usa a Web Speech API, cuja disponibilidade varia entre navegadores e aparelhos. O microfone precisa de HTTPS ou localhost, permissão e, em alguns serviços, internet. A síntese depende das vozes instaladas. A página deve permanecer aberta e ativa; o projeto não promete escuta em segundo plano ou com a tela bloqueada.

## Conteúdo e referências

A revisão registrada no projeto é de **setembro de 2026**, baseada nas referências abaixo. A data da revisão não significa que todas as diretrizes sejam de 2026.

- [American Heart Association — Suporte básico de vida em adultos, 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support).
- [AHA / American Academy of Pediatrics — Suporte básico de vida pediátrico, 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support).
- [AHA / American Red Cross — Primeiros socorros, 2024](https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines).
- [AHA — Circunstâncias especiais de ressuscitação, 2025](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation).
- [Ministério da Saúde — SAMU 192](https://www.gov.br/saude/pt-br/composicao/saes/samu-192).

Cada guia indica suas referências; a página **Sobre** explica o escopo. A revisão documental e os testes de software **não equivalem à validação clínica por um profissional responsável**. Mudanças em técnicas, faixas etárias, contraindicações ou critérios de emergência precisam de revisão clínica antes de serem apresentadas como orientação validada.

As animações são esquemáticas: ajudam a localizar o gesto, mas não demonstram força, profundidade ou ritmo com precisão de treinamento. A animação de compressões não substitui as instruções numéricas da etapa. O guia pediátrico distingue bebês de crianças e não abrange reanimação durante o parto.

## Privacidade e conexão

O código do Pulso não cria cadastro, prontuário, histórico de emergências ou gravação de áudio. A preferência de tamanho do texto fica no armazenamento local do navegador. A leitura automática vale para a sessão atual.

Ao ativar a voz, o navegador pode enviar áudio ou texto ao serviço de reconhecimento ou síntese de seu fornecedor. Evite dizer nomes, documentos e outras informações pessoais. Os links de referência levam a sites externos, com suas próprias políticas.

Esta versão precisa de conexão para abrir ou recarregar o manual. O antigo cache incompleto foi desativado para evitar páginas presas a versões anteriores. O arquivo service-worker.js permanece apenas para remover essa instalação antiga; não intercepta novas requisições. O reconhecimento e algumas vozes também podem depender de rede.

## Executar o projeto

Use **Node.js 24 LTS** e **pnpm 11**. Preserve o arquivo `pnpm-lock.yaml`.

```sh
git clone https://github.com/SouBeatrizKaroline/ClaroCampusMobile_Pulso.git
cd ClaroCampusMobile_Pulso
pnpm install --frozen-lockfile
pnpm dev
```

O endereço padrão é `http://localhost:8080`. Não são necessárias chaves de API para os recursos atuais.

| Comando | Finalidade |
| --- | --- |
| `pnpm dev` | Desenvolvimento com atualização automática. |
| `pnpm test` | Testes das decisões, comandos de voz e interface. |
| `pnpm typecheck` | Verificação de tipos TypeScript. |
| `pnpm lint` | Análise estática do código. |
| `pnpm build` | Gera a versão de produção em `dist/`. |
| `pnpm preview` | Serve localmente a versão de produção. |

## Organização do código

```text
src/
  components/       Interface, animações, controles de voz e ritmo
  context/          Preferências e estado dos diálogos
  data/             Protocolos, ordem dos guias e referências
  hooks/            Leitura e reconhecimento de voz
  lib/              Comandos e regras de navegação entre etapas
  pages/            Início, guia e página Sobre
  types/            Estrutura tipada dos protocolos
public/             Ícones, imagem de compartilhamento e manifest
tests/              Testes de fluxo, segurança da navegação e voz
```

A aplicação usa React 19, TypeScript, Vite, React Router, Tailwind CSS e componentes Radix. As ilustrações são SVG e CSS, sem vídeos externos necessários à reprodução. Os testes combinam o executor do Node, Vitest e Testing Library.

## Publicação e manutenção

Publique o conteúdo de `dist/` em uma hospedagem estática com HTTPS. Configure o servidor para responder com `index.html` nas rotas da aplicação, como `/emergencia/engasgo`, preservando arquivos estáticos existentes. A configuração atual considera publicação na raiz do domínio.

Antes de publicar alterações:

- Execute testes, verificação de tipos e build.
- Confira a leitura no celular, texto ampliado, teclado e movimento reduzido.
- Teste as bifurcações de resposta e a recuperação de erros de voz.
- Se alterar orientação de saúde, registre fonte, data e escopo e providencie revisão clínica.
- Confira microfone e síntese em aparelhos reais; testes automatizados simulam esses serviços.

Ao adicionar um guia, inclua seus dados em `src/data/`, registre a entrada em `CARD_ORDER`, indique fontes e verifique os destinos das opções. Preserve instruções de cuidados nas etapas finais; não crie uma mensagem de “emergência resolvida” baseada apenas na navegação.

## Projeto e autoria

Mantido por [SouBeatrizKaroline](https://github.com/SouBeatrizKaroline).

Este é o repositório de continuidade do Pulso: [ClaroCampusMobile_Pulso](https://github.com/SouBeatrizKaroline/ClaroCampusMobile_Pulso). A base anterior às alterações foi preservada no repositório [Pulso](https://github.com/SouBeatrizKaroline/Pulso).

Para sugerir melhorias, descreva a situação, o comportamento esperado e o aparelho ou navegador usado. Não inclua dados identificáveis de pacientes em issues, exemplos ou testes.
