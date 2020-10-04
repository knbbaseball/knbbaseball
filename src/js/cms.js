import React from 'react';
import CMS from 'netlify-cms-app';
import { ja } from 'netlify-cms-locales';

// Import main site styles as a string to inject into the CMS preview pane
import styles from '!css-loader!postcss-loader!sass-loader!../css/main.scss';

import HomePreview from './cms/home-preview';
import BlogPreview from './cms/blog-preview';
import TeamPreview from './cms/team-preview';
import AboutPreview from './cms/about-preview';
import SimplePreview from './cms/simple-preview';

CMS.registerPreviewStyle(styles.toString(), { raw: true });
CMS.registerPreviewTemplate('home', HomePreview);
CMS.registerPreviewTemplate('blog', BlogPreview);
CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('about', AboutPreview);
CMS.registerPreviewTemplate('links', SimplePreview);

// https://www.netlifycms.org/docs/configuration-options/#locale
CMS.registerLocale('ja', ja);

CMS.init();
