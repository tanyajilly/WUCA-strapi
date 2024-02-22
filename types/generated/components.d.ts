import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentDonateButton extends Schema.Component {
  collectionName: 'components_content_donate_buttons';
  info: {
    displayName: 'DonateButton';
    icon: 'gift';
  };
  attributes: {
    buttonText: Attribute.String & Attribute.Required;
  };
}

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
    text: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
    image: Attribute.Media;
    imagePosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'left'>;
    Button: Attribute.Component<'data.button'>;
  };
}

export interface ContentVideo extends Schema.Component {
  collectionName: 'components_content_videos';
  info: {
    displayName: 'Video';
    icon: 'play';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    video: Attribute.Media;
    youTubeLink: Attribute.String;
  };
}

export interface DataButton extends Schema.Component {
  collectionName: 'components_data_buttons';
  info: {
    displayName: 'ButtonEl';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    buttonText: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    className: Attribute.String;
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
      'content.donate-button': ContentDonateButton;
      'content.slider': ContentSlider;
      'content.text-section': ContentTextSection;
      'content.video': ContentVideo;
      'data.button': DataButton;
      'data.photo': DataPhoto;
    }
  }
}
