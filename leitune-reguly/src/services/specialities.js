import {useMemo} from "react";
import {useTranslation} from "react-i18next";


export function useSpecialitiesList() {
  const { t } = useTranslation('carousel');
  const items = useMemo(() => [
    {
      image: '/images/hexagon/startup.png',
      title: t('startup.title'),
      featured: t('startup.featured'),
      items: t('startup.items', {
        returnObjects: true
      }),
    },
    {
      image: '/images/hexagon/empresarial.png',
      title: t('business.title'),
      featured: t('business.featured'),
      items: t('business.items', {
        returnObjects: true
      }),
    },
    {
      image: '/images/hexagon/tributario.png',
      title: t('tributary.title'),
      featured: t('tributary.featured'),
      items: t('tributary.items', {
        returnObjects: true
      }),
    },
    {
      image: '/images/hexagon/trabalhista.png',
      title: t('labor.title'),
      featured: t('labor.featured'),
      items: t('labor.items', {
        returnObjects: true
      }),
    },
    {
      image: '/images/hexagon/civil.png',
      title: t('civil.title'),
      featured: t('civil.featured'),
      items: t('civil.items', {
        returnObjects: true
      }),
    },
    {
      image: '/images/hexagon/consumidor.png',
      title: t('consumer.title'),
      featured: t('consumer.featured'),
      items: t('consumer.items', {
        returnObjects: true
      }),
    },
    {
      image: '/images/hexagon/penal.png',
      title: t('penal.title'),
      featured: t('penal.featured'),
      items: t('penal.items', {
        returnObjects: true
      }),
    }
  ], []);

  return {items};
}
