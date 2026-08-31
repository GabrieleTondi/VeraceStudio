import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { SendCampaignAction } from './src/sanity/actions/SendCampaignAction';

export default defineConfig({
  name: 'default',
  title: 'VERACE Studio',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '83ude8vy',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti & Redazione VERACE')
          .items([
            S.listItem()
              .title('Slider Home & Animazione')
              .schemaType('heroSlider')
              .child(
                S.documentTypeList('heroSlider').title('Slider Home Page & Intro (Max 9 Foto)')
              ),
            S.divider(),
            S.listItem()
              .title('Articoli Magazine')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Tutti gli Articoli Magazine')),
            S.listItem()
              .title('Progetti & Iniziative')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Tutti i Progetti')),
            S.listItem()
              .title('Calendario & Eventi')
              .schemaType('event')
              .child(S.documentTypeList('event').title('Tutti gli Eventi')),
            S.listItem()
              .title('Team & Collaboratori')
              .schemaType('teamMember')
              .child(S.documentTypeList('teamMember').title('Membri del Team')),
            S.divider(),
            S.listItem()
              .title('Newsletter & Comunicazioni')
              .child(
                S.list()
                  .title('Gestione Newsletter')
                  .items([
                    S.listItem()
                      .title('Campagne Email & Template')
                      .schemaType('newsletterCampaign')
                      .child(S.documentTypeList('newsletterCampaign').title('Tutte le Campagne Email')),
                    S.listItem()
                      .title('Iscritti alla Newsletter')
                      .schemaType('newsletterSubscriber')
                      .child(S.documentTypeList('newsletterSubscriber').title('Elenco Iscritti Attivi')),
                  ])
              ),
          ]),
    }),
  ],

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'newsletterCampaign') {
        return [SendCampaignAction, ...prev];
      }
      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
});
