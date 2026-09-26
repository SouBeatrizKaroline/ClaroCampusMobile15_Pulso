import type { Protocol } from '../types/protocol.ts'

export const STANDARD_PROTOCOLS: Record<string, Protocol> = {
  "desmaio": {
    "id": "desmaio",
    "title": "Desmaio",
    "summary": "Tontura, fraqueza ou perda breve da consciência.",
    "urgencyLevel": "alta",
    "initialAlert": "Se não responde, verifique a respiração e ligue 192.",
    "steps": [
      {
        "id": 1,
        "title": "Confira a resposta e a respiração",
        "mainInstruction": "Chame a pessoa e observe se respira normalmente.",
        "detailedText": "Não presuma que toda perda de consciência é um desmaio simples. Sem resposta e sem respiração normal, inicie RCP. Se ainda inconsciente, mas respirando normalmente, coloque de lado quando não houver trauma.",
        "illustrationType": "default",
        "relatedProtocol": "pessoa-nao-responde"
      },
      {
        "id": 2,
        "title": "Se está acordada e sente que vai desmaiar",
        "mainInstruction": "Ajude a deitar em local seguro.",
        "detailedText": "Se não houve trauma e isso não piorar a respiração, eleve um pouco as pernas. Não faça a pessoa caminhar. Afrouxe roupas apertadas.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Acompanhe a recuperação",
        "mainInstruction": "Só ajude a levantar quando estiver plenamente recuperada, devagar.",
        "detailedText": "Dor no peito, falta de ar, gestação, queda com ferimento, nova perda de consciência ou recuperação incompleta exigem atendimento. Não ofereça nada pela boca enquanto estiver sonolenta.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "firstaid"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "reacao-alergica": {
    "id": "reacao-alergica",
    "title": "Reação alérgica grave",
    "summary": "Inchaço de língua ou garganta, falta de ar, desfalecimento.",
    "urgencyLevel": "critica",
    "initialAlert": "Suspeita de anafilaxia: ligue 192 imediatamente.",
    "steps": [
      {
        "id": 1,
        "title": "Reconheça os sinais",
        "mainInstruction": "Falta de ar ou sensação de garganta fechando após uma exposição é emergência.",
        "detailedText": "Pode haver urticária, vômitos, tontura ou inchaço. A reação grave também pode acontecer sem manchas na pele. Não espere todos os sinais.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Ajude com a adrenalina prescrita",
        "mainInstruction": "Se a pessoa tem autoinjetor prescrito, ajude a usá-lo na parte externa da coxa.",
        "detailedText": "Siga as instruções do próprio dispositivo; o tempo de aplicação varia por modelo. Informe ao SAMU o horário de uso. Antialérgico não substitui adrenalina nem atendimento.",
        "illustrationType": "default",
        "warningNote": "Não improvise doses ou injeções com ampolas."
      },
      {
        "id": 3,
        "title": "Não deixe levantar ou caminhar",
        "mainInstruction": "Mantenha deitada; se respirar melhor sentada, apoie nessa posição.",
        "detailedText": "Evite mudanças bruscas. Se inconsciente e respirando normalmente, coloque de lado. Sem resposta e sem respiração normal, inicie RCP.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      }
    ],
    "sources": [
      "firstaid"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "acidente": {
    "id": "acidente",
    "title": "Acidente de trânsito",
    "summary": "Colisão, atropelamento ou pessoa presa no veículo.",
    "urgencyLevel": "critica",
    "initialAlert": "Pare em local seguro. Ligue 193 para resgate e 192 para atendimento.",
    "steps": [
      {
        "id": 1,
        "title": "Evite uma segunda vítima",
        "mainInstruction": "Não entre na via sem segurança nem se aproxime de fogo, combustível ou fios.",
        "detailedText": "Sinalize apenas sem se expor. Informe localização, sentido da via, número de vítimas e se alguém está preso.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Evite movimentações",
        "mainInstruction": "Não retire capacete nem puxe a pessoa do veículo.",
        "detailedText": "Movimentar pode agravar lesões. Só mova diante de perigo imediato ou necessidade de abrir vias aéreas/RCP, seguindo orientação da central e sem se colocar em risco.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Observe e acompanhe",
        "mainInstruction": "Converse, proteja do frio e controle sangramento com pressão direta.",
        "detailedText": "Não dê água, comida ou medicamentos. Informe ao SAMU se perder a resposta ou a respiração ficar anormal.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "sangramento"
      }
    ],
    "sources": [
      "samu",
      "firstaid"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "queda-fratura": {
    "id": "queda-fratura",
    "title": "Queda ou fratura",
    "summary": "Dor, deformidade ou dificuldade para mover um membro.",
    "urgencyLevel": "alta",
    "initialAlert": "Não tente alinhar o osso nem levantar a pessoa à força.",
    "steps": [
      {
        "id": 1,
        "title": "Evite movimentos",
        "mainInstruction": "Apoie o membro na posição encontrada, com almofadas ou panos.",
        "detailedText": "Não force talas nem tente endireitar. Em suspeita de lesão na cabeça, pescoço, coluna ou quadril, mantenha a pessoa parada e ligue 192.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Proteja a área",
        "mainInstruction": "Em lesão fechada, use compressa fria envolta em pano por até 20 minutos.",
        "detailedText": "Não coloque gelo direto na pele. Em ferida com osso exposto, cubra com material limpo sem empurrar o osso. Controle sangue ao redor, sem pressionar o osso.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Procure atendimento",
        "mainInstruction": "Observe palidez, dormência ou extremidade fria.",
        "detailedText": "Esses sinais, sangramento importante, fratura exposta ou dor intensa precisam de socorro urgente. Mesmo que consiga mexer, pode haver fratura.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "firstaid"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "emergencia-bebe": {
    "id": "emergencia-bebe",
    "title": "Bebês e crianças",
    "summary": "Engasgo e ausência de respiração: cuidados por idade.",
    "urgencyLevel": "critica",
    "initialAlert": "Peça ajuda e ligue 192 no viva-voz. Não sacuda o bebê.",
    "steps": [
      {
        "id": 1,
        "title": "O que você observa?",
        "mainInstruction": "Primeiro, confira se responde e respira normalmente.",
        "detailedText": "Em engasgo, tosse forte ou choro indicam passagem de ar. Suspiros irregulares não são respiração normal. Este guia não cobre reanimação de recém-nascido no parto.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Tosse forte ou chora",
            "nextStepId": 2
          },
          {
            "text": "Consciente, mas não tosse ou chora",
            "nextStepId": 3
          },
          {
            "text": "Não responde e não respira normalmente",
            "nextStepId": 6
          },
          {
            "text": "Não responde, mas respira normalmente",
            "nextStepId": 9
          }
        ]
      },
      {
        "id": 2,
        "title": "Observe de perto",
        "mainInstruction": "Deixe tossir e acompanhe a respiração.",
        "detailedText": "Não dê golpes enquanto a tosse for eficaz, não ofereça água e não enfie os dedos na boca. Se piorar, volte à pergunta anterior e escolha o sinal observado.",
        "illustrationType": "default",
        "isFinal": true
      },
      {
        "id": 3,
        "title": "Qual é a idade?",
        "mainInstruction": "A manobra de engasgo depende da idade.",
        "detailedText": "Peça para outra pessoa ligar 192 enquanto você ajuda.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Menor de 1 ano",
            "nextStepId": 4
          },
          {
            "text": "1 ano ou mais",
            "nextStepId": 5
          }
        ]
      },
      {
        "id": 4,
        "title": "Engasgo grave no bebê consciente",
        "mainInstruction": "Alterne 5 golpes nas costas e 5 impulsos no tórax.",
        "detailedText": "Apoie o bebê de bruços no antebraço, com cabeça abaixo do tronco e mandíbula apoiada sem apertar o pescoço. Dê 5 golpes na parte alta das costas, entre as omoplatas. Vire-o de costas, mantendo apoio e cabeça baixa; faça 5 impulsos sobre o osso no centro do peito com a base de uma mão. Repita até desobstruir ou perder a resposta.",
        "illustrationType": "default",
        "warningNote": "Nunca faça compressões abdominais em menores de 1 ano. Não retire objetos que não consegue ver.",
        "choices": [
          {
            "text": "Perdeu a resposta",
            "nextStepId": 6
          },
          {
            "text": "Desobstruiu e respira bem",
            "nextStepId": 8
          }
        ]
      },
      {
        "id": 5,
        "title": "Engasgo grave a partir de 1 ano",
        "mainInstruction": "Alterne 5 golpes nas costas e 5 compressões abdominais.",
        "detailedText": "Incline para a frente e dê os golpes na parte alta das costas, entre as omoplatas. Por trás, posicione o punho acima do umbigo e abaixo do osso do peito e comprima para dentro e para cima. Adeque a força ao tamanho da criança. Pare quando o objeto sair.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Perdeu a resposta",
            "nextStepId": 6
          },
          {
            "text": "Desobstruiu e respira bem",
            "nextStepId": 8
          }
        ]
      },
      {
        "id": 6,
        "title": "Sem resposta e sem respiração normal",
        "mainInstruction": "Coloque em superfície firme e comece RCP.",
        "detailedText": "Bebê: use a base de uma mão ou os dois polegares envolvendo o tórax. Criança: use uma ou duas mãos no centro do peito. Comprima 100 a 120 vezes por minuto, cerca de um terço da profundidade do tórax: aproximadamente 4 cm no bebê e 5 cm na criança. Deixe o peito retornar.",
        "illustrationType": "default",
        "warningNote": "Ventilações são especialmente importantes em crianças. Se treinado e disposto, sozinho alterne 30 compressões e 2 ventilações que elevem o peito, de cerca de 1 segundo cada. Se não conseguir ventilar, faça compressões e siga o SAMU.",
        "hasRhythmMetronome": true,
        "rhythmBpm": 110
      },
      {
        "id": 7,
        "title": "Continue e use o DEA",
        "mainInstruction": "Peça um DEA e siga as instruções do aparelho.",
        "detailedText": "Use pás pediátricas se disponíveis; se não, use as disponíveis sem sobrepor. Retome RCP após análise/choque. Se engasgou, retire somente objeto claramente visível antes das ventilações. Não pare para procurar pulso. Continue até ajuda assumir ou a criança responder e respirar normalmente.",
        "illustrationType": "default",
        "isFinal": true
      },
      {
        "id": 8,
        "title": "Após o engasgo",
        "mainInstruction": "Procure avaliação médica após as manobras.",
        "detailedText": "Continue observando. Se houver dificuldade para respirar, sonolência, dor ou tosse persistente, mantenha contato com o SAMU.",
        "illustrationType": "default",
        "isFinal": true
      },
      {
        "id": 9,
        "title": "Mantenha a respiração livre",
        "mainInstruction": "Ligue 192 e observe a respiração continuamente.",
        "detailedText": "Sem suspeita de trauma, coloque de lado com cuidado, mantendo a cabeça apoiada e a passagem de ar livre. Não dê água ou alimentos. Se houver trauma, evite movimentar e siga a central. Se parar de respirar normalmente, volte ao início e siga a etapa de RCP infantil.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "pediatric"
    ],
    "emoji": "",
    "isCoreOffline": false,
    "audience": "Bebês menores de 1 ano e crianças até a puberdade",
    "keywords": [
      "infantil",
      "bebe",
      "crianca",
      "engasgou"
    ]
  },
  "emergencia-idoso": {
    "id": "emergencia-idoso",
    "title": "Suspeita de AVC",
    "summary": "Boca torta, fala alterada ou fraqueza súbita de um lado.",
    "urgencyLevel": "critica",
    "initialAlert": "AVC pode ocorrer em qualquer idade. Ligue 192, mesmo se melhorar.",
    "steps": [
      {
        "id": 1,
        "title": "Observe sinais súbitos",
        "mainInstruction": "Peça para sorrir, levantar os dois braços e repetir uma frase.",
        "detailedText": "Assimetria no rosto, um braço que cai ou fala diferente podem indicar AVC. Perda súbita de visão, equilíbrio ou dor de cabeça muito intensa também exigem atenção. Não é um teste que exclui AVC.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Anote o horário",
        "mainInstruction": "Informe quando foi vista bem pela última vez.",
        "detailedText": "Se acordou com sintomas, conte ao SAMU a última vez em que estava normal. Não espere os sintomas passarem nem deixe a pessoa dirigir.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Aguarde com segurança",
        "mainInstruction": "Deixe em posição confortável, com alguém ao lado.",
        "detailedText": "Não dê comida, bebida, aspirina ou remédios para baixar a pressão por conta própria. Observe resposta e respiração até a equipe chegar.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "firstaid",
      "samu"
    ],
    "emoji": "",
    "isCoreOffline": false,
    "keywords": [
      "idoso",
      "derrame",
      "avc",
      "boca torta",
      "fala enrolada"
    ]
  },
  "socorros-animal": {
    "id": "socorros-animal",
    "title": "Animal ferido",
    "summary": "Proteção e encaminhamento para atendimento veterinário.",
    "urgencyLevel": "alta",
    "initialAlert": "Contate um hospital veterinário. SAMU é atendimento humano.",
    "steps": [
      {
        "id": 1,
        "title": "Proteja-se",
        "mainInstruction": "Aproxime-se devagar e evite contato com a boca.",
        "detailedText": "Um animal com dor pode morder. Não improvise focinheira em animal com falta de ar, engasgo, vômitos ou inconsciência. Se não for seguro, peça ajuda especializada.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Evite tratamentos caseiros",
        "mainInstruction": "Não dê medicamentos humanos nem provoque vômito.",
        "detailedText": "Avise o veterinário sobre suspeita de intoxicação e guarde a embalagem sem se contaminar. Não force água ou alimento.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Combine o transporte",
        "mainInstruction": "Siga a orientação do hospital veterinário para transportar com o mínimo de movimento.",
        "detailedText": "Não coloque sua vida em risco no trânsito, em água ou perto de eletricidade. O guia não ensina reanimação veterinária.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [],
    "emoji": "",
    "isCoreOffline": false,
    "audience": "Encaminhamento veterinário; não é protocolo de atendimento humano",
    "keywords": [
      "cachorro",
      "gato",
      "pet"
    ]
  },
  "dor-no-peito": {
    "id": "dor-no-peito",
    "title": "Dor no peito",
    "summary": "Aperto, pressão, suor frio ou falta de ar.",
    "urgencyLevel": "critica",
    "initialAlert": "Dor no peito de início súbito: ligue 192. Não dirija.",
    "steps": [
      {
        "id": 1,
        "title": "Interrompa o esforço",
        "mainInstruction": "Ajude a pessoa a descansar na posição mais confortável.",
        "detailedText": "Dor pode irradiar para braços, mandíbula ou costas; também pode haver náusea, falta de ar ou fraqueza. Nem todo infarto provoca dor forte.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Chame ajuda sem demora",
        "mainInstruction": "Informe o início dos sintomas e siga o SAMU.",
        "detailedText": "Não espere melhorar sozinho. Não ofereça medicamentos por conta própria; informe alergias e remédios usados à central.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Observe resposta e respiração",
        "mainInstruction": "Se perder a resposta e não respirar normalmente, comece RCP.",
        "detailedText": "Peça um DEA, se houver. Mantenha a ligação em viva-voz para receber orientação.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      }
    ],
    "sources": [
      "firstaid",
      "samu"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "incendio": {
    "id": "incendio",
    "title": "Incêndio e fumaça",
    "summary": "Saia do perigo e acione os Bombeiros.",
    "urgencyLevel": "critica",
    "initialAlert": "Saia para um local seguro e ligue 193.",
    "steps": [
      {
        "id": 1,
        "title": "Saia sem se expor",
        "mainInstruction": "Use a rota de fuga segura e as escadas. Não use elevadores.",
        "detailedText": "Não volte para buscar objetos ou pessoas. Não abra portas quentes. Se a saída estiver bloqueada, afaste-se da fumaça, feche portas se possível e informe sua posição aos Bombeiros.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Roupas em chamas",
        "mainInstruction": "Pare, deite no chão e role para abafar as chamas.",
        "detailedText": "Proteja o rosto. Não corra. Depois, resfrie as queimaduras térmicas com água corrente e peça atendimento.",
        "illustrationType": "default",
        "relatedProtocol": "queimadura"
      },
      {
        "id": 3,
        "title": "Depois de sair",
        "mainInstruction": "Falta de ar, rouquidão, confusão ou queimadura no rosto exigem 192.",
        "detailedText": "Inalação de fumaça pode piorar depois da exposição. Não entre para resgatar sem equipemento e treinamento.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "samu"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "afogamento": {
    "id": "afogamento",
    "title": "Afogamento",
    "summary": "Ajude de fora da água e peça resgate.",
    "urgencyLevel": "critica",
    "initialAlert": "Ligue 193. Não entre na água sem treinamento e segurança.",
    "steps": [
      {
        "id": 1,
        "title": "Ajude sem entrar",
        "mainInstruction": "Lance um objeto flutuante e peça ajuda ao guarda-vidas.",
        "detailedText": "Não se torne outra vítima. Não tente resgate em correnteza, enchente ou local profundo.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Em terra firme e segura",
        "mainInstruction": "Confira resposta e respiração e ligue 192.",
        "detailedText": "Se não responde e não respira normalmente, comece RCP. Ventilações são importantes no afogamento: se treinado e disposto, associe ventilações às compressões. Se não conseguir ventilar, inicie compressões e siga o SAMU. Para crianças, siga o guia infantil.",
        "illustrationType": "default",
        "relatedProtocol": "parada-cardiaca",
        "warningNote": "Não tente “tirar a água” apertando o abdome ou pendurando a pessoa."
      },
      {
        "id": 3,
        "title": "Mesmo após melhorar",
        "mainInstruction": "Mantenha acompanhada e procure atendimento.",
        "detailedText": "Dificuldade para respirar, tosse persistente, sonolência ou necessidade de resgate/ressuscitação exigem avaliação urgente. Retire roupas molhadas se seguro e proteja do frio.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "samu",
      "special"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "intoxicacao": {
    "id": "intoxicacao",
    "title": "Intoxicação",
    "summary": "Contato com produtos, medicamentos ou substâncias tóxicas.",
    "urgencyLevel": "critica",
    "initialAlert": "Alteração de consciência ou respiração: ligue 192.",
    "steps": [
      {
        "id": 1,
        "title": "Interrompa a exposição com segurança",
        "mainInstruction": "Afaste-se da fonte. Não entre em local com gases ou produtos perigosos.",
        "detailedText": "Peça aos Bombeiros apoio em área contaminada. Não toque no produto sem proteção.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Não provoque vômito",
        "mainInstruction": "Não dê leite, comida, bebida ou remédios caseiros.",
        "detailedText": "Guarde o nome e a embalagem do produto, sem se contaminar. Informe substância, quantidade provável, horário e idade ao serviço de emergência.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Siga orientação especializada",
        "mainInstruction": "Mantenha a pessoa acompanhada e observe a respiração.",
        "detailedText": "Não espere sintomas graves para buscar orientação após possível envenenamento. Se perder a resposta e não respirar normalmente, siga o SAMU para RCP em local seguro.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      }
    ],
    "sources": [
      "samu",
      "firstaid"
    ],
    "emoji": "",
    "isCoreOffline": false
  }
}
