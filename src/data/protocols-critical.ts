import type { Protocol } from '../types/protocol.ts'

export const CRITICAL_PROTOCOLS: Record<string, Protocol> = {
  "pessoa-nao-responde": {
    "id": "pessoa-nao-responde",
    "title": "Pessoa não responde",
    "summary": "Não reage à voz ou ao toque nos ombros.",
    "urgencyLevel": "critica",
    "initialAlert": "Ligue 192. Use o viva-voz e siga as instruções do SAMU.",
    "steps": [
      {
        "id": 1,
        "title": "Segurança e pedido de ajuda",
        "mainInstruction": "Verifique o local e ligue 192 no viva-voz.",
        "detailedText": "Não entre em área com trânsito, fogo ou eletricidade. Peça a alguém para buscar um DEA. Este guia de compressões é para adultos e adolescentes com sinais de puberdade. Para bebês e crianças, use o guia infantil.",
        "illustrationType": "default",
        "relatedProtocol": "emergencia-bebe"
      },
      {
        "id": 2,
        "title": "A pessoa responde?",
        "mainInstruction": "Chame em voz alta e toque nos ombros, sem sacudir.",
        "detailedText": "Se não reagir, avalie rapidamente a respiração. Leigos não precisam procurar pulso.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Não responde",
            "nextStepId": 3
          },
          {
            "text": "Responde",
            "nextStepId": 6
          }
        ]
      },
      {
        "id": 3,
        "title": "A respiração é normal?",
        "mainInstruction": "Observe o peito por no máximo 10 segundos.",
        "detailedText": "Suspiros espaçados, roncos ou respiração em suspiros irregulares não são respiração normal. Se não responde e não respira normalmente, trate como parada cardíaca.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Não respira normalmente ou tenho dúvida",
            "nextStepId": 4
          },
          {
            "text": "Respira normalmente",
            "nextStepId": 5
          }
        ]
      },
      {
        "id": 4,
        "title": "Comece as compressões",
        "mainInstruction": "Comprima o centro do peito, forte e rápido.",
        "detailedText": "Deite o adulto de costas em superfície firme. Coloque uma mão sobre a outra na metade inferior do osso no centro do peito, com braços esticados. Comprima de 5 a 6 cm, 100 a 120 vezes por minuto, deixando o peito voltar entre compressões. Se não souber ventilar, faça compressões contínuas. Se treinado e disposto, alterne 30 compressões e 2 ventilações.",
        "illustrationType": "default",
        "hasRhythmMetronome": true,
        "rhythmBpm": 110,
        "isFinal": true,
        "warningNote": "Peça um DEA. Ligue e siga seus comandos; ninguém deve tocar na pessoa durante análise ou choque. Retome imediatamente as compressões após a orientação do aparelho. Continue até a equipe assumir, a pessoa voltar a respirar normalmente, o local ficar inseguro ou você não conseguir mais."
      },
      {
        "id": 5,
        "title": "Acompanhe a respiração",
        "mainInstruction": "Se está inconsciente e respira normalmente, mantenha as passagem de ar livre.",
        "detailedText": "Sem suspeita de trauma, coloque de lado. Se houver queda, acidente ou suspeita de lesão na coluna, evite movimentar e siga o SAMU; a abertura das vias aéreas tem prioridade. Observe continuamente a respiração. Se parar ou ficar em suspiros irregulares, inicie RCP.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      },
      {
        "id": 6,
        "title": "Mantenha a pessoa acompanhada",
        "mainInstruction": "Deixe a pessoa na posição em que respira melhor.",
        "detailedText": "Informe os sintomas ao SAMU. Não ofereça alimentos, líquidos ou medicamentos. Se ela perder a resposta, reavalie imediatamente a respiração.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "bls",
      "firstaid"
    ],
    "emoji": "",
    "isCoreOffline": false,
    "audience": "Adultos e adolescentes com sinais de puberdade",
    "keywords": [
      "inconsciente",
      "desacordado"
    ]
  },
  "sem-respirar": {
    "id": "sem-respirar",
    "title": "Não respira normalmente",
    "summary": "Sem respirar ou apenas com suspiros irregulares.",
    "urgencyLevel": "critica",
    "initialAlert": "Sem resposta e sem respiração normal: ligue 192 e inicie RCP.",
    "steps": [
      {
        "id": 1,
        "title": "Segurança e pedido de ajuda",
        "mainInstruction": "Verifique o local e ligue 192 no viva-voz.",
        "detailedText": "Não entre em área com trânsito, fogo ou eletricidade. Peça a alguém para buscar um DEA. Este guia de compressões é para adultos e adolescentes com sinais de puberdade. Para bebês e crianças, use o guia infantil.",
        "illustrationType": "default",
        "relatedProtocol": "emergencia-bebe"
      },
      {
        "id": 2,
        "title": "A pessoa responde?",
        "mainInstruction": "Chame em voz alta e toque nos ombros, sem sacudir.",
        "detailedText": "Se não reagir, avalie rapidamente a respiração. Leigos não precisam procurar pulso.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Não responde",
            "nextStepId": 3
          },
          {
            "text": "Responde",
            "nextStepId": 6
          }
        ]
      },
      {
        "id": 3,
        "title": "A respiração é normal?",
        "mainInstruction": "Observe o peito por no máximo 10 segundos.",
        "detailedText": "Suspiros espaçados, roncos ou respiração em suspiros irregulares não são respiração normal. Se não responde e não respira normalmente, trate como parada cardíaca.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Não respira normalmente ou tenho dúvida",
            "nextStepId": 4
          },
          {
            "text": "Respira normalmente",
            "nextStepId": 5
          }
        ]
      },
      {
        "id": 4,
        "title": "Comece as compressões",
        "mainInstruction": "Comprima o centro do peito, forte e rápido.",
        "detailedText": "Deite o adulto de costas em superfície firme. Coloque uma mão sobre a outra na metade inferior do osso no centro do peito, com braços esticados. Comprima de 5 a 6 cm, 100 a 120 vezes por minuto, deixando o peito voltar entre compressões. Se não souber ventilar, faça compressões contínuas. Se treinado e disposto, alterne 30 compressões e 2 ventilações.",
        "illustrationType": "default",
        "hasRhythmMetronome": true,
        "rhythmBpm": 110,
        "isFinal": true,
        "warningNote": "Peça um DEA. Ligue e siga seus comandos; ninguém deve tocar na pessoa durante análise ou choque. Retome imediatamente as compressões após a orientação do aparelho. Continue até a equipe assumir, a pessoa voltar a respirar normalmente, o local ficar inseguro ou você não conseguir mais."
      },
      {
        "id": 5,
        "title": "Acompanhe a respiração",
        "mainInstruction": "Se está inconsciente e respira normalmente, mantenha as passagem de ar livre.",
        "detailedText": "Sem suspeita de trauma, coloque de lado. Se houver queda, acidente ou suspeita de lesão na coluna, evite movimentar e siga o SAMU; a abertura das vias aéreas tem prioridade. Observe continuamente a respiração. Se parar ou ficar em suspiros irregulares, inicie RCP.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      },
      {
        "id": 6,
        "title": "Mantenha a pessoa acompanhada",
        "mainInstruction": "Deixe a pessoa na posição em que respira melhor.",
        "detailedText": "Informe os sintomas ao SAMU. Não ofereça alimentos, líquidos ou medicamentos. Se ela perder a resposta, reavalie imediatamente a respiração.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "bls"
    ],
    "emoji": "",
    "isCoreOffline": false,
    "audience": "Adultos e adolescentes com sinais de puberdade",
    "keywords": [
      "respiracao",
      "sufocamento",
      "falta de ar"
    ]
  },
  "parada-cardiaca": {
    "id": "parada-cardiaca",
    "title": "Parada cardíaca · RCP",
    "summary": "Reconheça os sinais e comece as compressões.",
    "urgencyLevel": "critica",
    "initialAlert": "Peça ajuda, ligue 192 no viva-voz e peça um DEA.",
    "steps": [
      {
        "id": 1,
        "title": "Segurança e pedido de ajuda",
        "mainInstruction": "Verifique o local e ligue 192 no viva-voz.",
        "detailedText": "Não entre em área com trânsito, fogo ou eletricidade. Peça a alguém para buscar um DEA. Este guia de compressões é para adultos e adolescentes com sinais de puberdade. Para bebês e crianças, use o guia infantil.",
        "illustrationType": "default",
        "relatedProtocol": "emergencia-bebe"
      },
      {
        "id": 2,
        "title": "A pessoa responde?",
        "mainInstruction": "Chame em voz alta e toque nos ombros, sem sacudir.",
        "detailedText": "Se não reagir, avalie rapidamente a respiração. Leigos não precisam procurar pulso.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Não responde",
            "nextStepId": 3
          },
          {
            "text": "Responde",
            "nextStepId": 6
          }
        ]
      },
      {
        "id": 3,
        "title": "A respiração é normal?",
        "mainInstruction": "Observe o peito por no máximo 10 segundos.",
        "detailedText": "Suspiros espaçados, roncos ou respiração em suspiros irregulares não são respiração normal. Se não responde e não respira normalmente, trate como parada cardíaca.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Não respira normalmente ou tenho dúvida",
            "nextStepId": 4
          },
          {
            "text": "Respira normalmente",
            "nextStepId": 5
          }
        ]
      },
      {
        "id": 4,
        "title": "Comece as compressões",
        "mainInstruction": "Comprima o centro do peito, forte e rápido.",
        "detailedText": "Deite o adulto de costas em superfície firme. Coloque uma mão sobre a outra na metade inferior do osso no centro do peito, com braços esticados. Comprima de 5 a 6 cm, 100 a 120 vezes por minuto, deixando o peito voltar entre compressões. Se não souber ventilar, faça compressões contínuas. Se treinado e disposto, alterne 30 compressões e 2 ventilações.",
        "illustrationType": "default",
        "hasRhythmMetronome": true,
        "rhythmBpm": 110,
        "isFinal": true,
        "warningNote": "Peça um DEA. Ligue e siga seus comandos; ninguém deve tocar na pessoa durante análise ou choque. Retome imediatamente as compressões após a orientação do aparelho. Continue até a equipe assumir, a pessoa voltar a respirar normalmente, o local ficar inseguro ou você não conseguir mais."
      },
      {
        "id": 5,
        "title": "Acompanhe a respiração",
        "mainInstruction": "Se está inconsciente e respira normalmente, mantenha as passagem de ar livre.",
        "detailedText": "Sem suspeita de trauma, coloque de lado. Se houver queda, acidente ou suspeita de lesão na coluna, evite movimentar e siga o SAMU; a abertura das vias aéreas tem prioridade. Observe continuamente a respiração. Se parar ou ficar em suspiros irregulares, inicie RCP.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      },
      {
        "id": 6,
        "title": "Mantenha a pessoa acompanhada",
        "mainInstruction": "Deixe a pessoa na posição em que respira melhor.",
        "detailedText": "Informe os sintomas ao SAMU. Não ofereça alimentos, líquidos ou medicamentos. Se ela perder a resposta, reavalie imediatamente a respiração.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "bls"
    ],
    "emoji": "",
    "isCoreOffline": false,
    "audience": "Adultos e adolescentes com sinais de puberdade"
  },
  "engasgo": {
    "id": "engasgo",
    "title": "Engasgo",
    "summary": "Dificuldade súbita para falar, tossir ou respirar.",
    "urgencyLevel": "critica",
    "initialAlert": "Se não consegue tossir com força, falar ou respirar, peça para ligar 192.",
    "steps": [
      {
        "id": 1,
        "title": "A pessoa consegue tossir?",
        "mainInstruction": "Observe se a tosse é forte e se consegue falar.",
        "detailedText": "Este guia é para adultos e crianças a partir de 1 ano. Para menores de 1 ano, abra o guia infantil.",
        "illustrationType": "default",
        "relatedProtocol": "emergencia-bebe",
        "choices": [
          {
            "text": "Tosse forte e consegue falar",
            "nextStepId": 2
          },
          {
            "text": "Tosse fraca, não fala ou não respira",
            "nextStepId": 3
          }
        ]
      },
      {
        "id": 2,
        "title": "Deixe tossir",
        "mainInstruction": "Incentive a tosse e fique junto da pessoa.",
        "detailedText": "Não dê golpes enquanto a tosse for eficaz. Não ofereça água nem coloque dedos na boca. Se a tosse ficar fraca ou ela não conseguir falar, passe ao atendimento do engasgo grave.",
        "illustrationType": "default",
        "choices": [
          {
            "text": "Piorou: não consegue tossir ou falar",
            "nextStepId": 3
          },
          {
            "text": "Objeto saiu e respira bem",
            "nextStepId": 5
          }
        ]
      },
      {
        "id": 3,
        "title": "Alterne 5 golpes e 5 compressões",
        "mainInstruction": "Incline a pessoa para a frente e dê 5 golpes na parte alta das costas, entre as omoplatas.",
        "detailedText": "Use a base da mão. Depois, por trás, posicione um punho acima do umbigo e abaixo do osso do peito, segure com a outra mão e faça 5 compressões para dentro e para cima. Repita os ciclos enquanto estiver consciente e obstruída. Pare assim que o objeto sair.",
        "illustrationType": "default",
        "warningNote": "Na gestação avançada ou se não conseguir envolver o abdome, use 5 compressões no tórax em vez do abdome, alternadas com 5 golpes nas costas.",
        "choices": [
          {
            "text": "Perdeu a consciência",
            "nextStepId": 4
          },
          {
            "text": "Objeto saiu e respira bem",
            "nextStepId": 5
          }
        ]
      },
      {
        "id": 4,
        "title": "Se perder a consciência",
        "mainInstruction": "Apoie a pessoa no chão, peça um DEA e inicie RCP.",
        "detailedText": "Não continue manobras de engasgo em pé. Se treinado, antes das ventilações olhe a boca e retire somente objeto claramente visível. Não faça varredura às cegas. Para criança sem puberdade, siga o guia infantil.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "parada-cardiaca"
      },
      {
        "id": 5,
        "title": "Depois que o objeto sair",
        "mainInstruction": "Observe se a respiração voltou ao normal.",
        "detailedText": "Após compressões abdominais ou torácicas, procure avaliação médica. Dor, tosse persistente, dificuldade para engolir ou respirar exigem atendimento imediato.",
        "illustrationType": "default",
        "isFinal": true
      }
    ],
    "sources": [
      "bls",
      "pediatric"
    ],
    "emoji": "",
    "isCoreOffline": false,
    "audience": "Adultos e crianças a partir de 1 ano",
    "keywords": [
      "engasgado",
      "engasgou",
      "comida",
      "sufocado"
    ]
  },
  "sangramento": {
    "id": "sangramento",
    "title": "Sangramento intenso",
    "summary": "Muito sangue, jatos ou roupa rapidamente encharcada.",
    "urgencyLevel": "critica",
    "initialAlert": "Ligue 192. Pressione o ferimento sem esperar.",
    "steps": [
      {
        "id": 1,
        "title": "Faça pressão direta",
        "mainInstruction": "Use gaze ou pano limpo e pressione com firmeza.",
        "detailedText": "Proteja suas mãos com luvas, se disponíveis. Não retire objetos cravados: pressione ao redor deles. Não pressione diretamente sobre o olho.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Mantenha a pressão",
        "mainInstruction": "Não levante o primeiro pano para conferir a ferida.",
        "detailedText": "Se necessário, acrescente outro pano sem interromper a pressão. Não perca tempo elevando o membro. Sangramento que não cessa precisa de ajuda imediata.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Sangramento de membro que não para",
        "mainInstruction": "Se houver torniquete comercial e você souber usá-lo, aplique conforme o treinamento.",
        "detailedText": "Use em braço ou perna com hemorragia que ameaça a vida, acima da ferida e não sobre uma articulação. Aperte até cessar o sangramento, anote o horário e não afrouxe. Se não tiver treinamento, mantenha pressão e siga o SAMU.",
        "illustrationType": "default",
        "warningNote": "Não improvise com fios ou cordas finas. Não use torniquete no pescoço ou tronco."
      },
      {
        "id": 4,
        "title": "Aguarde com a pessoa",
        "mainInstruction": "Mantenha-a aquecida e observe a respiração.",
        "detailedText": "Deite se tolerado e sem piorar a respiração. Não dê comida ou bebida. Se perder a resposta e não respirar normalmente, comece RCP.",
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
  "queimadura": {
    "id": "queimadura",
    "title": "Queimadura",
    "summary": "Contato com calor, líquidos quentes ou superfícies.",
    "urgencyLevel": "alta",
    "initialAlert": "Afaste a fonte de calor com segurança. Queimadura grave: ligue 192.",
    "steps": [
      {
        "id": 1,
        "title": "Resfrie a área",
        "mainInstruction": "Use água corrente limpa, fresca, por 20 minutos.",
        "detailedText": "Resfrie a queimadura térmica, mantendo o restante do corpo aquecido, especialmente em crianças. Retire anéis e acessórios antes do inchaço, sem atrasar o resfriamento.",
        "illustrationType": "default",
        "warningNote": "Não use gelo, pasta de dente, manteiga, pomadas caseiras ou café. Não arranque roupa grudada."
      },
      {
        "id": 2,
        "title": "Proteja sem apertar",
        "mainInstruction": "Cubra com gaze ou pano limpo que não solte fibras.",
        "detailedText": "Não fure bolhas. Procure atendimento em queimaduras profundas, extensas, circulares, na face, mãos, genitais ou articulações, e em crianças pequenas.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Químicos, eletricidade ou fumaça",
        "mainInstruction": "Essas situações precisam de avaliação urgente.",
        "detailedText": "Não toque em fontes elétricas. Em produto químico, proteja-se, retire roupa contaminada sem espalhar o produto e siga o serviço de emergência e o rótulo; pó seco deve ser removido com cuidado antes da irrigação quando seguro. Falta de ar, rouquidão ou exposição à fumaça: ligue 192.",
        "illustrationType": "default",
        "isFinal": true,
        "relatedProtocol": "choque-eletrico"
      }
    ],
    "sources": [
      "firstaid",
      "samu"
    ],
    "emoji": "",
    "isCoreOffline": false
  },
  "choque-eletrico": {
    "id": "choque-eletrico",
    "title": "Choque elétrico",
    "summary": "Contato com tomada, equipemento ou fio energizado.",
    "urgencyLevel": "critica",
    "initialAlert": "Não toque na pessoa nem no fio. Ligue 193 e 192.",
    "steps": [
      {
        "id": 1,
        "title": "Interrompa a energia apenas se seguro",
        "mainInstruction": "Desligue o disjuntor sem entrar em água ou se aproximar da fonte.",
        "detailedText": "Se houver fio de rua caído, alta tensão, água ou dúvida, afaste-se e impeça a aproximação. Aguarde os Bombeiros e a concessionária.",
        "illustrationType": "default",
        "warningNote": "Não tente afastar fios com vassoura, madeira ou plástico. Podem conduzir eletricidade."
      },
      {
        "id": 2,
        "title": "Só se aproxime após liberação",
        "mainInstruction": "Com a energia confirmadamente desligada, verifique resposta e respiração.",
        "detailedText": "Se não responde e não respira normalmente, inicie RCP e peça um DEA. Não se aproxime de alta tensão até liberação da equipe.",
        "illustrationType": "default",
        "relatedProtocol": "parada-cardiaca"
      },
      {
        "id": 3,
        "title": "Busque avaliação",
        "mainInstruction": "Mantenha a pessoa acompanhada até o atendimento.",
        "detailedText": "Lesões internas e alterações do ritmo cardíaco podem ocorrer mesmo sem queimadura aparente. Não aplique produtos nas queimaduras.",
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
  "convulsao": {
    "id": "convulsao",
    "title": "Convulsão",
    "summary": "Movimentos involuntários e possível perda de consciência.",
    "urgencyLevel": "alta",
    "initialAlert": "Proteja a cabeça. Não segure a pessoa nem coloque nada na boca.",
    "steps": [
      {
        "id": 1,
        "title": "Proteja e marque o horário",
        "mainInstruction": "Afaste objetos perigosos e coloque algo macio sob a cabeça.",
        "detailedText": "Não contenha os movimentos. Não dê líquidos ou medicamentos pela boca. Afrouxe roupas apertadas no pescoço.",
        "illustrationType": "default"
      },
      {
        "id": 2,
        "title": "Saiba quando chamar o SAMU",
        "mainInstruction": "Ligue 192 se durar 5 minutos ou mais, repetir sem recuperação ou for a primeira crise.",
        "detailedText": "Também acione ajuda se houver dificuldade para respirar, ferimento, crise na água, gravidez, bebê menor de 6 meses ou se não recuperar o estado habitual após a crise. Na dúvida, ligue.",
        "illustrationType": "default"
      },
      {
        "id": 3,
        "title": "Depois dos movimentos",
        "mainInstruction": "Verifique a respiração e permaneça com a pessoa.",
        "detailedText": "Se inconsciente e respirando normalmente, coloque de lado se não houver suspeita de trauma. Sem respiração normal, inicie RCP. Explique com calma o que aconteceu quando ela despertar.",
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
  }
}
