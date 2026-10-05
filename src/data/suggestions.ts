import type { Suggestion } from '../types/generator';

export const suggestions: Suggestion[] = [
{
  label: 'Landing page moderne',
  prompt:
  'Create a modern landing page for a productivity app with a hero section, a features grid and a contact form',
  kind: 'landing'
},
{
  label: 'Portfolio de designer',
  prompt:
  'Create a minimal portfolio for a product designer with an about section, selected work and contact details',
  kind: 'portfolio'
},
{
  label: 'Boutique de café',
  prompt:
  'Create a small online shop page for a specialty coffee roaster with a product grid and prices',
  kind: 'shop'
},
{
  label: "Page d'événement",
  prompt:
  'Create an event page for a one-day design conference with schedule, speakers and a ticket call to action',
  kind: 'event'
}];