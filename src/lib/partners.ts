export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  aliases: string[];
}

export const PARTNER_LOGOS: PartnerItem[] = [
  {
    id: 'fondazione-manodori',
    name: 'Fondazione Manodori',
    logo: '/logos/partners/fondazione-manodori_logo-768x587-1-300x229.png',
    aliases: ['fondazione manodori', 'manodori']
  },
  {
    id: 'fondazione-luigi-ghirri',
    name: 'Fondazione Luigi Ghirri',
    logo: '/logos/partners/FLG-Logo-RGB_Lockup A-Black.png',
    aliases: ['fondazione luigi ghirri', 'luigi ghirri', 'flg']
  },
  {
    id: 'salewa',
    name: 'Salewa',
    logo: '/logos/partners/Salewa-Logo.png',
    aliases: ['salewa']
  },
  {
    id: 'asineria-reggio-emilia',
    name: 'Asineria di Reggio Emilia',
    logo: '/logos/partners/asini di reggio emilia logo copia.png',
    aliases: ['asineria di reggio emilia', 'asini di reggio emilia', 'asineria', 'asini']
  },
  {
    id: 'giro-del-cielo',
    name: 'Giro del Cielo',
    logo: '/logos/partners/giro-del-cielo_logotipo.png',
    aliases: ['giro del cielo']
  },
  {
    id: 'comune-reggio-emilia',
    name: 'Comune di Reggio Emilia',
    logo: '/logos/partners/comunere__5e8f42b438d4f365312963-3.png',
    aliases: ['comune di reggio emilia', 'comune reggio emilia', 'comunere']
  },
  {
    id: 'comune-villa-minozzo',
    name: 'Comune di Villa Minozzo',
    logo: '/logos/partners/comune-villa-minozzo-logo-480x252.fw_-1.png',
    aliases: ['comune di villa minozzo', 'villa minozzo']
  },
  {
    id: 'politecnico-milano',
    name: 'Politecnico di Milano',
    logo: '/logos/partners/Logo_Politecnico_Milano.png',
    aliases: ['politecnico di milano', 'politecnico milano', 'polimi']
  },
  {
    id: 'chiostri-san-pietro',
    name: 'Chiostri di San Pietro',
    logo: '/logos/partners/LogoChiostri.png',
    aliases: ['chiostri di san pietro', 'chiostri san pietro', 'chiostri']
  },
  {
    id: 'laboratorio-aperto',
    name: 'Laboratorio Aperto dei Chiostri di San Pietro',
    logo: '/logos/partners/logo-lcm-nero.svg',
    aliases: ['laboratorio aperto', 'laboratorio aperto dei chiostri di san pietro', 'lcm']
  },
  {
    id: 'live-in-chiostri',
    name: 'Live in Chiostri',
    logo: '/logos/partners/Logo_LiveinChiostri2026.png',
    aliases: ['live in chiostri', 'live in chiostri 2026']
  },
  {
    id: 'spazio-gerra',
    name: 'Spazio Gerra',
    logo: '/logos/partners/logogerra.png',
    aliases: ['spazio gerra', 'gerra']
  },
  {
    id: 'fondazione-palazzo-magnani',
    name: 'Fondazione Palazzo Magnani',
    logo: '/logos/partners/logo_FPM_nero.png',
    aliases: ['fondazione palazzo magnani', 'palazzo magnani', 'fpm']
  },
  {
    id: 'fotografia-europea',
    name: 'Fotografia Europea',
    logo: '/logos/partners/logo-senza-data-con-spazio-intorno-per-sito.png',
    aliases: ['fotografia europea']
  },
  {
    id: 'scomodo',
    name: 'Scomodo',
    logo: '/logos/partners/logo-scomodo-black.png',
    aliases: ['scomodo']
  },
  {
    id: 'parco-appennino',
    name: "Parco Nazionale dell'Appennino Tosco-Emiliano",
    logo: '/logos/partners/headerLogo.png',
    aliases: ["parco nazionale dell'appennino tosco-emiliano", "parco nazionale appennino tosco-emiliano", 'appennino tosco-emiliano', 'parco appennino']
  },
  {
    id: 'luminaria-scandiano',
    name: 'Luminaria Scandiano',
    logo: '/logos/partners/LOGO NERO VERT.png',
    aliases: ['luminaria scandiano', "l'uminaria scandiano", 'luminaria', 'scandiano']
  },
  {
    id: 'placemaking-europe',
    name: 'Placemaking Week Europe',
    logo: '/logos/partners/Placemaking-Week-Europe.png',
    aliases: ['placemaking week europe', 'placemaking europe', 'placemaking']
  },
  {
    id: 'remida',
    name: 'Remida Reggio Emilia',
    logo: '/logos/partners/remida_small.jpg',
    aliases: ['remida', 'remida reggio emilia', 're mida']
  }
];

/**
 * Searches for a partner's logo given a partner name string.
 * Returns PartnerItem if found, or null if no logo matches.
 */
export function getPartnerLogo(partnerName: string): PartnerItem | null {
  if (!partnerName || typeof partnerName !== 'string') return null;
  const clean = partnerName.trim().toLowerCase();

  // 1. Direct name match
  for (const item of PARTNER_LOGOS) {
    if (item.name.toLowerCase() === clean) {
      return item;
    }
  }

  // 2. Alias match
  for (const item of PARTNER_LOGOS) {
    if (item.aliases.some((alias) => clean === alias || clean.includes(alias) || alias.includes(clean))) {
      return item;
    }
  }

  return null;
}
