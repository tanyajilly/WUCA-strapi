import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentSlider extends Schema.Component {
  collectionName: 'components_content_sliders';
  info: {
    displayName: 'PhotoGallery';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    photo: Attribute.Component<'data.photo', true> & Attribute.Required;
    view: Attribute.Enumeration<['slider', 'tiles']> &
      Attribute.DefaultTo<'slider'>;
  };
}

export interface ContentTextSection extends Schema.Component {
  collectionName: 'components_content_text_sections';
  info: {
    displayName: 'TextSection';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    text: Attribute.Blocks & Attribute.Required;
    image: Attribute.Media;
    imagePosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
  };
}

export interface ContentVideo extends Schema.Component {
  collectionName: 'components_content_videos';
  info: {
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    Title: Attribute.String;
    Description: Attribute.Text;
    Video: Attribute.Media;
    YoutubeLink: Attribute.String;
  };
}

export interface DataArticle extends Schema.Component {
  collectionName: 'components_data_articles';
  info: {
    displayName: 'Article';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media;
    author: Attribute.Relation<
      'data.article',
      'oneToOne',
      'api::author.author'
    >;
    description: Attribute.Text;
  };
}

export interface DataPhoto extends Schema.Component {
  collectionName: 'components_data_photos';
  info: {
    displayName: 'Photo';
    icon: 'picture';
    description: '';
  };
  attributes: {
    description: Attribute.String;
    link: Attribute.String;
    image: Attribute.Media & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.slider': ContentSlider;
      'content.text-section': ContentTextSection;
      'content.video': ContentVideo;
      'data.article': DataArticle;
      'data.photo': DataPhoto;
    }
  }
}
